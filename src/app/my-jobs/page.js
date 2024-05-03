import { LoginForm } from '@/Components/LoginForm'
import React from 'react'
import {Input} from '../../Components/ui/input'
import {Card} from '../../Components/ui/card'
import { MyJobTable } from '@/Components/MyJobTable'

export default function page() {
  return (
<>

<Card className=' w-[500px]'>


<MyJobTable/>
</Card>

</>
  )
}