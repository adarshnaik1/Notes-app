import React from "react";
import { FlipWords } from "./ui/flip-words";
import Button from "./Button";
export default function Flip_Words(){
    const words = ["collaborative", "productive", "transparent", "efficient", "organized"];
 
    return (
      <div className="h- flex justify-center items-center  ">
        <div className=" text-7xl   font-normal text-neutral-400 dark:text-neutral-200">
          Work in a
          <FlipWords words={words} /> <br />
          environment with NoteFluid

          
        </div>
      </div>
    );
}