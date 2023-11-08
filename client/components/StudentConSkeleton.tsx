"use client";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function StudentConSkeleton() {
  return (
    <div className="w-[80%] mx-auto mt-20 p-10 bg-stone-100 rounded">
        <Skeleton height={80} borderRadius={5}/>
        <Skeleton height={35} borderRadius={5} className="mt-10"/>
        <Skeleton height={25} borderRadius={5} className="mt-5"/>
    </div>
  )
}
