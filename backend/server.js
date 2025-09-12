const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const YC_ORGS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'yc_orgs.json'), 'utf-8')
);

// Simple in-memory cache for YC repos (cache for 5 minutes)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(params) {
  return JSON.stringify(params);
}

function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/projects', async (req, res) => {
    const yc = req.query.yc === 'true';
    const language = req.query.language;
    const search = req.query.search;
    const sort = req.query.sort || 'stars';

    try {
        let results = [];
        
        if (search) {
            // General GitHub search - search across all repositories
            const baseFilters = [];
            if (language) baseFilters.push(`language:${language}`);
            if (yc) {
                // If YC is enabled, search within YC orgs
                const orgQueries = YC_ORGS.map(org => `org:${org}`).join(' OR ');
                baseFilters.push(`(${orgQueries})`);
            }
            
            // Build the search query
            let query = search;
            if (baseFilters.length > 0) {
                query = `${search} ${baseFilters.join(' ')}`;
            }
            
            // Add minimum stars filter for better results
            query += ' stars:>50';
            
            console.log(`General search: ${query}`); // Debug log
            
            const { data } = await axios.get('https://api.github.com/search/repositories', {
                params: { 
                    q: query, 
                    sort, 
                    order: 'desc', 
                    per_page: 50 
                },
                headers: process.env.GITHUB_TOKEN ? { 
                    Authorization: `token ${process.env.GITHUB_TOKEN}` 
                } : {}
            });
            
            results = data.items || [];
            
        } else if (yc) {
            // YC-backed repos: Use parallel requests + caching for much faster results
            const cacheKey = getCacheKey({ yc: true, language, sort });
            const cachedResults = getCachedData(cacheKey);
            
            if (cachedResults) {
                console.log('Using cached YC results');
                results = cachedResults;
            } else {
                console.log('Fetching fresh YC results...');
                const baseFilters = [];
                if (language) baseFilters.push(`language:${language}`);
                baseFilters.push('stars:>50');
                
                // Create parallel requests for all YC orgs
                const searchPromises = YC_ORGS.map(async (org) => {
                    try {
                        const orgQuery = `org:${org} ${baseFilters.join(' ')}`;
                        const { data } = await axios.get('https://api.github.com/search/repositories', {
                            params: { 
                                q: orgQuery, 
                                sort, 
                                order: 'desc', 
                                per_page: 15 // Reduced per org since we're doing parallel
                            },
                            headers: process.env.GITHUB_TOKEN ? { 
                                Authorization: `token ${process.env.GITHUB_TOKEN}` 
                            } : {},
                            timeout: 5000 // 5 second timeout per request
                        });
                        return data.items || [];
                    } catch (orgError) {
                        console.error(`Error searching org ${org}:`, orgError.message);
                        return []; // Return empty array on error
                    }
                });
                
                // Wait for all requests to complete in parallel
                const allResults = await Promise.all(searchPromises);
                
                // Flatten and deduplicate results
                const flatResults = allResults.flat();
                const byId = new Map();
                for (const r of flatResults) {
                    byId.set(r.id, r);
                }
                
                results = Array.from(byId.values())
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 50);
                
                // Cache the results
                setCachedData(cacheKey, results);
            }
                
        } else {
            // Default: general development tools
            let query = 'stars:>500';
            
            if (language) {
                query = `language:${language} stars:>200`;
            } else {
                query = '(development tool OR open source tool OR developer utility OR cli tool OR library OR framework) stars:>500';
            }

            const { data } = await axios.get('https://api.github.com/search/repositories', {
                params: { 
                    q: query, 
                    sort, 
                    order: 'desc', 
                    per_page: 30 
                },
                headers: process.env.GITHUB_TOKEN ? { 
                    Authorization: `token ${process.env.GITHUB_TOKEN}` 
                } : {}
            });
            
            results = data.items || [];
        }

        res.json(results);
        
    } catch (err) {
        console.error('API Error:', err.response?.data || err.message);
        res.status(500).json({ 
            error: 'GitHub API fetch failed', 
            details: err.response?.data?.message || err.message 
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
