"use client";
import ContainerSketelon from '@/components/ContainerSketelon';
import Student from '@/components/Student';
import StudentSkeleton from '@/components/StudentSkeleton';
import axios from 'axios';
import Fuse from 'fuse.js';
import React , {useState , useEffect, SelectHTMLAttributes, ChangeEvent} from 'react'
import Select from 'react-select'
import { BeatLoader } from 'react-spinners';

type res = {
  data:{
    data:StData[]
  }
}

type UniRes = {
  data:{
    universities:UniData[]
  }
}

type CourseRes = {
  data:{
    courses:CourseData[]
  }
}

export default function page() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [SearchingByName, setSearchingByName] = useState(false);

  const [AllStudents, setAllStudents] = useState<StData[] | null>(null);
  const [AllUnies, setAllUnies] = useState<UniData[] | null>(null);
  const [AllCourses, setAllCourses] = useState<CourseData[] | null>(null);
  const [StudentsForRender, setStudentsForRender] = useState<StData[] | null>(null);
  const [CurrentUni, setCurrentUni] = useState<string | undefined>(undefined);
  const [CurrentCourse, setCurrentCourse] = useState<string | undefined>(undefined);
  
  const [ControlerLoad, setControlerLoad] = useState(true);
  const [Load, setLoad] = useState(true);
  const [clean, setclean] = useState(false);

  const HandleUniversity = async (choice:any) => {
    setLoad(true);
    setCurrentUni(choice?.value);

    if(choice?.value && CurrentCourse){
      setStudentsForRender(AllStudents?.filter(obj => obj.university === choice.value && obj.course === CurrentCourse) as StData[]);
    }else if(choice?.value){
     setStudentsForRender(AllStudents?.filter(obj => obj.university === choice.value) as StData[]); 
    }
    else if(CurrentCourse){
      setStudentsForRender(AllStudents?.filter(obj => obj.course === CurrentCourse) as StData[]);
    }
    else{
      setStudentsForRender(AllStudents);
    }
    await new Promise((resolve) => setTimeout(() => { setLoad(false); resolve("")}, 1000))

  }

  const HandleCourse = async (choice:any) => {
    setLoad(true);
    setCurrentCourse(choice?.value);
    if(choice?.value && CurrentUni){
      setStudentsForRender(AllStudents?.filter(obj => obj.course === choice.value && obj.university === CurrentUni) as StData[]);
    }else if(choice?.value){
     setStudentsForRender(AllStudents?.filter(obj => obj.course === choice.value) as StData[]); 
    }
    else if(CurrentUni){
      setStudentsForRender(AllStudents?.filter(obj => obj.university === CurrentUni) as StData[]);
    }
    else{
      setStudentsForRender(AllStudents);
    }
    
    await new Promise((resolve) => setTimeout(() => { setLoad(false); resolve("")}, 1000))

  }
  const HandleSearch = async (event:ChangeEvent<HTMLInputElement>) => {
    setLoad(true);
    if(event.target.value.length > 0){
      if(CurrentCourse || CurrentUni){
        const fuse = new Fuse<StData>(StudentsForRender as StData[], {keys:['name']});
        setStudentsForRender(fuse.search(event.target.value).map(obj => obj.item))
      }else{
        const fuse = new Fuse<StData>(AllStudents as StData[], {keys:['name']});
        setStudentsForRender(fuse.search(event.target.value).map(obj => obj.item))
      }
    }
    else
    {
      HandleUniversity(undefined);
      HandleCourse(undefined);
    }
    await new Promise((resolve) => setTimeout(() => { setLoad(false); resolve("")}, 1000))
    
  }

  useEffect(() => {

    setLoad(true);
    setControlerLoad(true);
    async function getAllStudents(){

      await new Promise( async (resolve) => setTimeout(() => {resolve("")}, 1000))
      const {data:{universities}}:UniRes =  await axios.get('http://localhost:3453/api/universities');
      setAllUnies(universities);
      const {data:{courses}}:CourseRes =  await axios.get('http://localhost:3453/api/courses');
      setAllCourses(courses);
      
      const {data:{data}}:res = await axios.get('http://localhost:3453/api/data');
      setAllStudents(data);
      // setStudentsForRender(data);
      setControlerLoad(false);
      setLoad(false);
    }
    getAllStudents();

  }, [])
  



  return (
    <main className="w-full mx-auto">
      {ControlerLoad ? <ContainerSketelon/> :<div className='w-[90%] sm:w-[80%] xl:w-[60%] mt-20 mx-auto p-5 rounded border bg-stone-50 text-stone-800'>
        <h1 className='text-3xl leading-[40px] font-semibold '>Mahinda Rajapaksha College Government University Degree Holders Chart.</h1>

        <div className="mt-10 w-full">
          <h2 className="text-slate-500 font-semibold underline">Sort By</h2>
          
          <div className='w-full flex items-center mt-5'>
            <Select className='flex-1' placeholder={'University Name'} id={'uni-select'} options={AllUnies?.map(arr => ({value:arr.university , label:arr.university}))} isClearable={true} onChange={HandleUniversity}/>
          </div>

          <p className='text-slate-500 font-semibold'>or</p>

          <div className='w-full flex items-center'>
            <Select className='flex-1' placeholder={'University Degree Program'} id={'course-select'} options={AllCourses?.map(arr => ({value:arr.course , label:arr.course}))} isClearable={true} onChange={HandleCourse}/>
          </div>

          <p className='text-slate-500 font-semibold mt-2'>or using ur name</p>
          
          <div className='relative'>
            <input autoComplete='off' onChange={HandleSearch} type="text" placeholder='Your Name' className='w-full pr-14 p-2 border mt-3 border-stone-300 rounded placeholder:text-stone-500 focus-within:outline-blue-500 transition duration-300' />
            {SearchingByName && <BeatLoader color="#78716C" size={5} className='absolute translate-y-1/3 right-0 pr-3 top-[25%]'/>}
          </div>
        </div>
      </div>}
      <div className='w-[90%] sm:w-[80%] xl:w-[60%] mx-auto mt-20'>
        {Load && <StudentSkeleton/>}
        {StudentsForRender?.map((student:StData , i:number) => {
           return(
            <Student key={i} Student={student}/>
          )
        })}

        {StudentsForRender === null && !Load && <p className='text-center tracking-wider text-stone-500 font-light text-sm'>Search Students</p>}

        {StudentsForRender?.length === 0 && <p className='text-center underline text-stone-500 font-light text-sm'>0 results found</p>}

      </div>
      {!Load && StudentsForRender && StudentsForRender?.length > 5 &&  <footer className='w-full p-5  bg-stone-800 flex items-center justify-center'>
        <p className='font-semibold text-stone-200 tracking-wider'>Nipuna Nishan | Thiwanka Sandajalum</p>
      </footer>}
    </main>
  )
}
