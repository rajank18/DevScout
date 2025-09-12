import React from 'react';

const RepositoriesTable = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No repositories found</p>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-400  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Repository
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Language
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Stars
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Forks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {projects.map((repo) => (
              <tr key={repo.id} className="hover:bg-gray-900/50 transition-colors duration-150">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {repo.owner?.avatar_url ? (
                        <img
                          src={repo.owner.avatar_url}
                          alt={`${repo.owner.login} avatar`}
                          className="h-8 w-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
                        style={{ display: repo.owner?.avatar_url ? 'none' : 'flex' }}
                      >
                        <span className="text-black font-semibold text-sm">
                          {repo.full_name?.charAt(0)?.toUpperCase() || 'R'}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-300 transition-colors duration-150"
                        >
                          {repo.full_name}
                        </a>
                      </div>
                      <div className="text-sm text-gray-400">
                        {repo.owner?.login || 'Unknown'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-300 max-w-md">
                    <p className="line-clamp-2" title={repo.description}>
                      {repo.description || 'No description available'}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                    {repo.language || 'Unknown'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stargazers_count?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {repo.forks_count?.toLocaleString() || 0}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepositoriesTable;
