import React from 'react'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-gray-50 w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
    </div>
  )
}
