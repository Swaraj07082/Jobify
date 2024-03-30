import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"

  import SelectProps from '../types/SelectProps'
  

export default function GenericSelect({placeholder , data} : SelectProps) {
    // console.log(data)
  return (
    <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    {data.map( item=>
    <SelectItem key={item} value={`${item}`}>{item}</SelectItem>
    // <SelectItem value="dark">Dark</SelectItem>
    // <SelectItem value="system">System</SelectItem>
    )
}
  </SelectContent>
</Select>

  )
}
