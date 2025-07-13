import React from 'react'

interface ErrorMessageCardProps {
  message: string
}

const ErrorMessageCard: React.FC<ErrorMessageCardProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-main">
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessageCard