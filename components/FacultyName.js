import Image from 'next/image'
import React from 'react'

const FacultyName = ({user,getdata,deletedata}) => {
  return (
    <div className=' w-11/12 shadow-sm  rounded-md  shadow-gray-300 bg-white'>
      <div className='flex w-full h-14 items-center font-medium p-2 '>
        <Image src='/faculty.jpg' alt='#' width={40} height={40} className='rounded-full '></Image>
        <h1 className='ml-2 flex-grow text-lg'>{user.name}</h1>
        <button type='submit' onClick={()=>{
          deletedata(user.id)
        }} className=' bg-red-400 rounded-md w-16 text-sm h-8 mx-2'>delete</button>
        <button type='submit' onClick={()=>{
          getdata(user.id)
        }} className=' bg-green-400 rounded-md w-16 h-8 text-sm'>View</button>
      </div>
    </div>
  )
}

export default FacultyName