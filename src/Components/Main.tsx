import { cn } from '@/lib/utils'
import React from 'react'
import { Select } from './ui/select'
import GenericSelect from './generic/GenericSelect'
import Location from '../../public/location.json'
import { GenericComboBox } from './generic/GenericComboBox'
import GenericRadioGroup from './generic/GenericRadioGroup'

export default function Main() {
  // console.log(Location)

  return (
    <div className={cn("flex ml-48 mr-48 mt-20 ")}>
      <div className={cn(" flex-[1] ")}>

        <div className={cn("flex flex-col gap-y-7")}>
          {/* <GenericSelect placeholder='Location' data={Location}/> */}
          <GenericComboBox data={Location} title='Location'/>
          <GenericSelect placeholder='Duration' data= {["Hourly","Monthly","Yearly"]}/>
          <div>
Salary
          <GenericRadioGroup  length={5} options={["Any" , "< 30000k" ,"< 50000k" ,"< 80000k" ,"< 100000k" ]}/>
          </div>
          <GenericRadioGroup length={4} options={["All time" , "Last 24 hours" , "Last 7 days" , "Last Month"]}/>
          <GenericRadioGroup length={3} options={["Any experience","Internship","Work remotely"]}/>
          <GenericRadioGroup length={4} options={["Any" , "Full time","Temporary","Part time"]}/>
        </div>


      </div>


      <div  className={cn(" flex-[3]")}>




      </div>



    </div>
  )
}
