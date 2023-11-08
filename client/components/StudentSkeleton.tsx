import React , {useState , useEffect} from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function StudentSkeleton() {

  const [Skeletons, setSkeletons] = useState<number[]>();

  useEffect(() => {
    setSkeletons(Array(10).fill(0));
  },[])
  
  return (
    <SkeletonTheme borderRadius={2}>
      {Skeletons?.map((_:number , i:number) => {
        return (
          <div key={i} className='w-full p-5'>
            <Skeleton height={40}/>
            <Skeleton height={20} className='mt-2'/>
            <Skeleton height={25} className='mt-3'/>
          </div>
        )
      })}
    </SkeletonTheme>
  )
}
