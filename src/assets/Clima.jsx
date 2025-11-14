import React from 'react'

export default function Clima({weather}) {
  return (
    <div className='mt-3 bg-blue-200 p-6
    rounded-lg shadow-md text-center
    '>
      <h1 className='text-3xl font-bold
      text-blue-950
      '>{weather.name}</h1>
      <h3 className='text-4xl font-bold
      text-blue-950
      '>{weather.temperature}</h3>
      <p className='text-3xl font-bold
      text-blue-950
      '>{weather.description}</p>
      <img
      className='mx-auto'
      width={50}
      height={50}
      src={weather.icon}/>
    </div>
  )
}
