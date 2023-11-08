/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import StudentConSkeleton from "@/components/StudentConSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import {useSearchParams} from 'next/navigation'


type res = {
    data:{
        data:StData[]
    }
}

export default function page() {

    const [StudentData, setStudentData] = useState<StData | null>(null);
    const [Load, setLoad] = useState(false);

    const searchParams = useSearchParams()
 
    const name = searchParams.get('name')


    useEffect(() => {
        async function GetStudent(name:any) {
            await new Promise(async (resolve) => setTimeout(() => {resolve("")}, 1000));
            const {data:{data}}:res = await axios.get(`api/name/${name}`);
            setLoad(false);
            setStudentData(data[0]);
            
        }
        setLoad(true);
        GetStudent(name);
    }, [name])
    
  return (
    <main className="w-full">
    {Load && <StudentConSkeleton/>}
    {StudentData && !Load && 
        <div>
            <div className="w-[80%] mx-auto mt-20 sm:p-10 sm:bg-stone-100 rounded">
                <h1 className=" text-2xl sm:text-5xl tracking-wider text-stone-800 leading-snug font-semibold underline underline-offset-8 capitalize">{StudentData.name.toLowerCase()}.</h1>

                <h2 className="mt-10 text-xl font-semibold text-stone-700 capitalize sm:px-5">University : {StudentData.university.toLowerCase()}</h2>
                <h3 className="mt-3 text-md text-stone-700 sm:px-5">{StudentData.course}</h3>
            </div>
        </div>}
    </main>
  )
}
