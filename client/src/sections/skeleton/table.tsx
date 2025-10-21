import React from 'react'

const Table = () => {
    return (
        <div className='w-full flex flex-col border rounded-lg'>
            <div className='flex flex-col gap-3 p-10'>
                {[...Array(5).fill(0)].map((_, i) => (
                    <div 
                    key={i}
                    className='bg-gray-100 h-4 rounded w-full' 
                    style={{
                    width: `${100 - (5 * i)}%`
                    }} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Table