import React from 'react'

const DropdownIndicator = () => {
  return (
    <div className="flex items-center justify-center w-5 h-5">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

export default DropdownIndicator