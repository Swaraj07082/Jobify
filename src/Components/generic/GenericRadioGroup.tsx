import GenericRadioGroupProps from "../types/GenericRadioGroupProps"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"




import React from 'react'

export default function GenericRadioGroup({options , length}:GenericRadioGroupProps) {
  return (
    

    
<RadioGroup defaultValue="option-one">

    {
        options.map((item)=>
        <div key={item} className="flex items-center space-x-2">
        <RadioGroupItem value={`${item}`} id={`${item}`} />
        <Label htmlFor={`${item}`}>{item}</Label>
      </div>)
    }



</RadioGroup>

  )
}

