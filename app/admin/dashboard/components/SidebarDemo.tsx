"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCar,
  IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ActiveComponent } from "../page";

interface SidebarLinkProps {
  id: ActiveComponent;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  href: string;
}

interface SidebarDemoProps {
  activeComponent: ActiveComponent;
  onLinkClick: (component: ActiveComponent) => void;
  children: React.ReactNode;
}

export default function SidebarDemo({
  activeComponent,
  onLinkClick,
  children,
}: SidebarDemoProps) {
  const [open, setOpen] = useState(false);

  const links: SidebarLinkProps[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: activeComponent === "dashboard",
      href: "#",
    },
    {
      id: "vehicles",
      label: "Vehicles",
      icon: (
        <IconCar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: activeComponent === "vehicles",
      href: "#vehicles",
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: activeComponent === "settings",
      href: "#settings",
    },
    {
      id: "logout",
      label: "Log Out",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#logout",
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen my-2 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={link}
                  onClick={() => onLinkClick(link.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
                href: "#profile",
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Gaye Rent A Car
      </motion.span>
    </a>
  );
};
