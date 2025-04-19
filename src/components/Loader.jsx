import React from 'react'

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 mb-4"></div>
          <p className="text-lg font-medium text-gray-600">
            Loading, please wait...
          </p>
        </div>
      );
    }


export default Loader
