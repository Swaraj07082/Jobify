import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../Components/ui/menubar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";

import Image from "next/image";

import jobify from '../../public/Jobify.jpg'

export default function Navbar() {
  return (
    <>
      <Menubar className={cn("h-20 flex justify-around")}>
        <div className={cn("flex gap-x-6")}>
          <MenubarMenu>
            {/* <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent> */}
            <Image src={jobify} width={100} height={100} alt=""/>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Jobs</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Companies</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Services</MenubarTrigger>
          </MenubarMenu>
        </div>

        <div className={cn("flex gap-x-6")}>
          <Button>Login</Button>
          <Button>Register</Button>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Menubar>
    </>
  );
}
