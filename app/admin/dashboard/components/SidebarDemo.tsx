"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  onClick?: () => void;
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
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });

      if (response.ok) {
        // Başarılı logout sonrası yönlendirme
        router.push("/admin/login"); // veya ana sayfaya yönlendirin
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-4 md:hidden dark:border-neutral-700 dark:bg-neutral-900">
        <Logo />
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-neutral-200 bg-white transition-transform duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-800 md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={false}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="hidden border-b border-neutral-200 p-4 md:block dark:border-neutral-700">
                <Logo />
              </div>
              <div className="mt-8 flex flex-col gap-2 px-4">
                {links.map((link) => (
                  <SidebarLink
                    key={link.id}
                    link={link}
                    onClick={() => {
                      if (link.id === "logout") {
                        handleLogout();
                      } else {
                        onLinkClick(link.id);
                      }

                      setOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
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
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto rounded-tl-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
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
        Appa Rent A Car
      </motion.span>
    </a>
  );
};
