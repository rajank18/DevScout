import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const SearchFilter = ({ onSearch, onLanguageChange, onToggleYC, isYCOnly, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedLanguage);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedLanguage('');
    onSearch('', '');
  };

  return (
    <div className="bg-black border border-gray-400 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-2">
            Search GitHub
          </label>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for tools, libraries, frameworks..."
              className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-md focus:ring-1 focus:ring-white focus:border-white outline-none text-white placeholder-gray-500 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-white text-black rounded-md font-medium transition-all duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>

        {/* Language Filter */}
        <div className="lg:w-48">
          <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-2">
            Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md focus:ring-1 focus:ring-white focus:border-white outline-none text-white transition-all duration-200"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value} className="bg-black">
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* YC Toggle */}
        <div className="flex items-end mb-3">
          <div className="flex items-center space-x-3">
            <Switch
              checked={isYCOnly}
              onChange={onToggleYC}
              className={`${
                isYCOnly ? 'bg-white' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 cursor-pointer focus:ring-white focus:ring-offset-2 focus:ring-offset-black`}
            >
              <span
                className={`${
                  isYCOnly ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-black transition-transform`}
              />
            </Switch>
            <span className="text-sm font-medium text-gray-400">
              YC-backed only
            </span>
          </div>
        </div>

        {/* Clear Button */}
        {(searchTerm || selectedLanguage) && (
          <button
            onClick={clearSearch}
            className="px-4 py-3 text-gray-400 hover:text-white border border-gray-700 hover:border-white rounded-md transition-all duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Tips */}
      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-800">
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">Search tips:</span> Try "react", "database", "cli tool", "testing framework", "auth library"
        </p>
      </div>
    </div>
  );
};

export default SearchFilter;
