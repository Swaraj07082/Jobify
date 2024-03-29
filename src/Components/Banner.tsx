import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function Banner() {
  return (
    <div className={cn("    ml-48 mr-48 mt-20  text-left")}>
      



<div className={cn("text-[54px] text-left")}>
    Find your new job today
</div>


<div className={cn(" text-left text-xl")}>
Thousands of jobs in computer , engineering and technology sectors are waiting for you.
</div>



<div className={cn("flex gap-x-1 mt-8")}>

<Input className={cn(" w-[800px]")}  placeholder='What position are you looking for?' />
<Input className={cn("w-[600px]")} placeholder='Location'/>
<Button className={cn(" w-44")} >Search</Button>
</div>






    </div>
  )
}
