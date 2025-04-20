import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";

import {
  IconBrandGithub,
  IconBrandX,
  IconPlus,
  IconHome,
  IconNewSection,
  IconBuildingFactory
} from "@tabler/icons-react";

export default function Dock() {
 
  
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Create Todo",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/add_task",
    },
    {
      title: "Organization",
      icon: (
        <IconBuildingFactory className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/add_org",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/add_task",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/adarshnaik1",
    },
  ];
  return (
    <div className=" sticky bottom-0 mb-5 flex items-center justify-center p-10 w-full">
      <FloatingDock
       
        items={links} />
    </div>
  );
}
