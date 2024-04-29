import { LoginForm } from '@/Components/LoginForm'
import React from 'react'
import {Input} from '../../Components/ui/input'
import {Card} from '../../Components/ui/card'

export default function page() {
  return (
<>

<div className='flex flex-col items-center'>

<div className=' mt-24 '>
<Input/>
</div>

<div className=' mt-16 '>
  <Card>
    My Jobs Section
  </Card>
</div>

</div>

</>
  )
}