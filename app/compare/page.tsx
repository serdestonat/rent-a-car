"use client";

import React, { useEffect, useState } from "react";
import { NavbarDemo } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

type CarSpecs = {
  model: string;
  fuelType: string;
  fuelCapacity: string;
  trunkCapacity: string;
  engineDisplacement: string;
  transmission: string;
  image: string;
};

const carSpecs: Record<string, CarSpecs> = {
  Egea: {
    model: "Fiat Egea 1.4 Fire",
    fuelType: "Benzin",
    fuelCapacity: "50 L",
    trunkCapacity: "520 L",
    engineDisplacement: "1368 cc",
    transmission: "Manuel (6 İleri)",
    image: "/images/cars/egea.png",
  },
  i20: {
    model: "Hyundai i20 1.4 MPI",
    fuelType: "Benzin",
    fuelCapacity: "40 L",
    trunkCapacity: "352 L",
    engineDisplacement: "1368 cc",
    transmission: "Manuel / Otomatik",
    image: "/images/cars/i20.jpg",
  },
  Fluence: {
    model: "Renault Fluence 1.5 dCi",
    fuelType: "Dizel",
    fuelCapacity: "60 L",
    trunkCapacity: "530 L",
    engineDisplacement: "1461cc",
    transmission: "Manuel / Otomatik",
    image: "/images/cars/fluence.jpg",
  },
  "301": {
    model: "Peugeot 301 1.5 BlueHDi",
    fuelType: "Dizel",
    fuelCapacity: "50 L",
    trunkCapacity: "506 L",
    engineDisplacement: "1499 cc",
    transmission: "Manuel (6 İleri)",
    image: "/images/cars/301.png",
  },
  Focus: {
    model: "Ford Focus 1.5 EcoBlue",
    fuelType: "Dizel",
    fuelCapacity: "47 L",
    trunkCapacity: "511 L",
    engineDisplacement: "1499 cc",
    transmission: "Manuel (8 İleri)",
    image: "/images/cars/focus.png",
  },
  "Clio Sport Tourer": {
    model: "Renault Clio Sport Tourer",
    fuelType: "Benzin / Dizel",
    fuelCapacity: "45-50 L",
    trunkCapacity: "443 L",
    engineDisplacement: "999-1461 cc",
    transmission: "Manuel / Otomatik",
    image: "/images/cars/sportClio1.jpg",
  },
  Symbol: {
    model: "Renault Symbol 1.0 SCe",
    fuelType: "Benzin",
    fuelCapacity: "50 L",
    trunkCapacity: "510L",
    engineDisplacement: "999 cc",
    transmission: "Manuel (5 İleri)",
    image: "/images/cars/symbol.png",
  },
  Linea: {
    model: "Fiat Linea 1.3 Multijet",
    fuelType: "Dizel",
    fuelCapacity: "45 L",
    trunkCapacity: "500 L",
    engineDisplacement: "1248 cc",
    transmission: "Manuel (5 İleri)",
    image: "/images/cars/linea.jpg",
  },
};

export default function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [specs, setSpecs] = useState<CarSpecs[]>([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("selectedCars") || "[]");
    setSelectedCars(savedCars);
    setSpecs(
      savedCars.map((car: string) => carSpecs[car as keyof typeof carSpecs])
    );
  }, []);

  const removeCar = (carTitle: string) => {
    const updated = selectedCars.filter((c) => c !== carTitle);
    setSelectedCars(updated);
    localStorage.setItem("selectedCars", JSON.stringify(updated));
    setSpecs(updated.map((c) => carSpecs[c as keyof typeof carSpecs]));
  };

  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen py-20 px-4 md:px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-neutral-800 dark:text-white">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Araç Karşılaştırma
            </span>
          </h1>

          {specs.length === 0 ? (
            <div className="text-center max-w-2xl mx-auto mt-16">
              <div className="mb-8 mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                Karşılaştırma listeniz boş. Hemen araç eklemek için aşağıdaki
                butonu kullanın.
              </p>
              <Link
                href="/cars"
                className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 font-medium"
              >
                Araçları Görüntüle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((car, index) => (
                <div
                  key={index}
                  className="relative group bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-100 dark:border-neutral-700"
                >
                  <button
                    onClick={() => removeCar(selectedCars[index])}
                    className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md cursor-pointer"
                  >
                    ×
                  </button>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-neutral-800 dark:text-white truncate">
                        {selectedCars[index]}
                      </h2>
                    </div>

                    <div className="relative h-48 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-4">
                      <Image
                        src={car.image}
                        alt={car.model}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Model
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.model}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Yakıt Tipi
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.fuelType}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Yakıt Deposu
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.fuelCapacity}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Bagaj
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.trunkCapacity}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Motor Hacmi
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.engineDisplacement}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Şanzıman
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.transmission}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
