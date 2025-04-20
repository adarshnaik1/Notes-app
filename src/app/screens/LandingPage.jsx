"use client";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import React from "react";
import Flip_Words from "@/components/FlipWords";
import Link from "next/link";

export function LandingPage() {
     
  return (
    <div
      className="relative flex h-[100vh] w-full items-center justify-center bg-black dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(gray_1px,transparent_1px)]",
          
        )} />
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black"></div>
        <div className="flex flex-col gap-5">
            <Flip_Words />
            <Link href='/login' className="px-8 py-4 bg-white text-black border-black z-10 w-md rounded-md hover:bg-black hover:text-white hover:border-white hover:border-2 text-center"> Get started</Link>
           
            
            
      
        </div>
      
    </div>
  );
}
