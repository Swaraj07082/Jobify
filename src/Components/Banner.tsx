import React, { SetStateAction, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function Banner() {

const[query , setquery] = useState("")

const onsetquery =(e:React.ChangeEvent<HTMLInputElement>)=>{

    setquery(e.target.value)
}

console.log(query)

  return (
    <div className={cn("    ml-48 mr-48 mt-20  text-left max-lg:ml-16 max-lg:mr-16")}>
      



<div className={cn("text-[54px] text-left")}>
    Find your new job today
</div>


<div className={cn(" text-left text-xl")}>
Thousands of jobs in computer , engineering and technology sectors are waiting for you.
</div>



<div className={cn("flex gap-x-1 mt-8 max-md:flex-col max-md:gap-y-3")}>

<Input className={cn(" w-[800px] max-md:w-auto")}  value={query} onChange={onsetquery} placeholder='What position are you looking for?' />
<Input className={cn("w-[600px] max-md:w-auto")} placeholder='Location'/>
<Button className={cn(" w-44 max-md:w-auto")} >Search</Button>
</div>






    </div>
  )
}
