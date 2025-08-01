"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Cars",
      link: "/cars",
    },
    {
      name: "Comparison List",
      link: "/compare",
    },
    {
      name: "Contact Us",
      link: "/about",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="mt-10">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* <NavbarButton variant="secondary">Yönetici Paneli</NavbarButton> */}
            <NavbarButton variant="primary" href="/admin/login">
              Admin Dashboard
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/admin/login"
              >
                Admin Dashboard
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}

export function WobbleCardDemo() {
  return (
    <>
      <NavbarDemo />
      <h1 className="text-5xl md:text-6xl font-bold text-center pt-8 pb-8 md:pt-12">
        Appa Rent A Car
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mb-10">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className="cursor-pointer"
          href="/cars"
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Cars
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Explore our rental car options. See features, prices and more.
            </p>
          </div>

          <Image
            src="/images/araba.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[10%] grayscale filter bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 min-h-[300px]"
          href="/compare"
        >
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Comparison List
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            To see the differences between the vehicles you are undecided about,
            side by side.
          </p>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
          href="/about"
        >
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Contact Us
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Click to call us, send us a message or to find out our location to
              visit us.
            </p>
          </div>
          <Image
            src="/images/contactUs.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute right-35 bottom-15 w-[200px] md:w-[200px] object-contain"
          />
        </WobbleCard>
      </div>
    </>
  );
}

export default WobbleCardDemo;
