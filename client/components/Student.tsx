import Link from 'next/link'
import React from 'react'


type Props = {
    Student:StData
}

export default function Student({Student:{course , name , university}}:Props) {
  return (
    <Link href={'#'} className=''>
        <div className='hover:bg-stone-800 p-5 my-5  rounded hover:text-stone-50 transition-all duration-300'>
            <h1 className=' text-md sm:text-xl font-semibold tracking-widest capitalize'>{name}</h1>
            <h2 className=' text-sm sm:text-md  capitalize font-semibold tracking-widest'>{university}</h2>
            <p className=' text-xs sm:text-sm mt-2'>{course}</p>
        </div>
    </Link>
  )
}
