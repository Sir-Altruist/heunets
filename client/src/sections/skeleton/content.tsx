import React from 'react'


const Content = () => {
  return (
        <div className="w-full justify-between p-3 flex items-center space-x-3">
          <div className='flex flex-col gap-2'>
              <div className='h-5 rounded w-[300px] bg-gray-100'></div>
              <div className='h-5 rounded w-[700px] bg-gray-100'></div>
          </div>
          <div className='flex space-x-3'>
            <div className='h-5 rounded w-[200px] bg-gray-100'></div>
          </div>
      </div>
  )
}

export default Content