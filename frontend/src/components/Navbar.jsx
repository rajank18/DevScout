import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand */}
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-white'>
              DevScout
            </h1>
          </div>

          {/* Navigation Items */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {/* <a href='#' className='text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200'>
                Home
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200'>
                About
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200'>
                Tools
              </a> */}
            </div>
          </div>

          {/* Auth Buttons */}
          {/* <div className='flex items-center space-x-4'>
            <button className='text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200'>
              Login
            </button>
            <button className='bg-white text-black px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100'>
              Sign Up
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
