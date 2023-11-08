"use client";

import StudentConSkeleton from "@/components/StudentConSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
    searchParams:{
        name:any
    }
}

type res = {
    data:{
        data:StData[]
    }
}
export default function page({searchParams:{name}}:Props) {

    const [StudentData, setStudentData] = useState<StData | null>(null);
    const [Load, setLoad] = useState(false);

    useEffect(() => {
        async function GetStudent(name:any) {
            await new Promise(async (resolve) => setTimeout(() => {resolve("")}, 1000));
            const {data:{data}}:res = await axios.get(`http://localhost:3453/api/name/${name}`);
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
            <div className="w-[80%] mx-auto mt-20 p-10 bg-stone-100 rounded">
                <h1 className=" text-5xl tracking-wider text-stone-800 leading-snug font-semibold underline underline-offset-8 capitalize">{StudentData.name.toLowerCase()}.</h1>

                <h2 className="mt-10 text-3xl font-semibold text-stone-700 capitalize px-5">University : {StudentData.university.toLowerCase()}</h2>
                <h3 className="mt-3 text-xl text-stone-700 px-5">{StudentData.course}</h3>
            </div>
        </div>}
    </main>
  )
}
