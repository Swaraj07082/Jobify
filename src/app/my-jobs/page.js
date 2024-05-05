import { LoginForm } from '@/Components/LoginForm'
import React from 'react'
import {Input} from '../../Components/ui/input'
import {Card} from '../../Components/ui/card'
import { MyJobTable } from '@/Components/MyJobTable'

export default function page() {
  return (
<>

 <div className=' flex flex-col justify-center items-center'>

<Input className=' py-10'/>

<Card className=' w-fit' >
<MyJobTable/>
</Card>


</div>
</>
  )
}