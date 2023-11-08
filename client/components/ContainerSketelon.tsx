import React , {useState , useEffect} from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function ContainerSketelon() {
  return (
    <SkeletonTheme borderRadius={2}>
        <div className='w-[90%] mt-20 bg-stone-50 border border-stone-200 sm:w-[80%] xl:w-[60%] mx-auto p-5 rounded'>
            <Skeleton height={55}/>
            <Skeleton className='mt-8' width={55} height={25} borderRadius={0}/>
            <Skeleton className='mt-5'  height={35}/>
            <Skeleton width={35} className='mt-2' height={25}/>
            <Skeleton className='mt-2' height={35}/>
            <Skeleton width={100} className='mt-5' height={25} borderRadius={0}/>
            <Skeleton  className='mt-5' height={35}/>
        </div>
    </SkeletonTheme>
  )
}
