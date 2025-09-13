import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import RepositoriesTable from "../components/RepositoriesTable";
const API = import.meta.env.VITE_API_URL;

function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isYCOnly, setIsYCOnly] = useState(true);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  const fetchProjects = async (search = '', language = '', yc = true) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (language) params.append('language', language);
      if (yc) params.append('yc', 'true');
      
            const response = await axios.get(`${API}/api/projects?${params.toString()}`);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects('', '', isYCOnly);
  }, []);

  const handleSearch = (searchTerm, language) => {
    setCurrentSearch(searchTerm);
    setCurrentLanguage(language);
    fetchProjects(searchTerm, language, isYCOnly);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    fetchProjects(currentSearch, language, isYCOnly);
  };

  const handleToggleYC = (ycEnabled) => {
    setIsYCOnly(ycEnabled);
    fetchProjects(currentSearch, currentLanguage, ycEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Scout Top Rated OSS 
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {isYCOnly 
              ? "Discover top open-source tools from Y Combinator-backed companies" 
              : "Search and discover open-source development tools across GitHub"
            }
          </p>
        </div>
        
        <SearchFilter 
          onSearch={handleSearch}
          onLanguageChange={handleLanguageChange}
          onToggleYC={handleToggleYC}
          isYCOnly={isYCOnly}
          isLoading={isLoading}
        />
        
        <RepositoriesTable projects={projects} />
      </div>
    </div>
  );
}

export default Home;
