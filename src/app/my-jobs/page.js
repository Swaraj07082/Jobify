import {Card} from "../../Components/ui/card"
import { Input } from "../../Components/ui/input";
import {Button} from "../../Components/ui/button"
import {TableDemo} from "../../Components/Table"
import React from 'react'
import { cn } from "@/lib/utils";

export default function MyJob() {
  return (
    <>

<div className={cn(" flex flex-col gap-x-9 gap-y-10")}>

<div className={cn("flex")}>
<Input></Input>
<Button>Search</Button>

</div>    

<div>

<Card>
    <TableDemo/>
</Card>
</div>
</div>
    
    
    
    
    
    </>
  )
}
