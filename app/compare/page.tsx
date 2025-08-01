"use client";

import React, { useEffect, useState } from "react";
import { NavbarDemo } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { useVehicleStore } from "@/store/vehicleStore"; // Import useVehicleStore

// We'll use the Vehicle type directly from the store
import type Vehicle from "@/store/vehicleStore";

export default function ComparePage() {
  const { vehicles } = useVehicleStore(); // Get all vehicles from the store
  const [selectedCarTitles, setSelectedCarTitles] = useState<string[]>([]);
  const [comparisonVehicles, setComparisonVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Load selected car titles from localStorage
    const savedTitles = JSON.parse(
      localStorage.getItem("selectedCars") || "[]"
    );
    setSelectedCarTitles(savedTitles);

    // Filter vehicles from the store based on the saved titles
    // Ensure that 'title' is unique enough to identify a car for comparison
    const currentComparisonVehicles = vehicles.filter((vehicle) =>
      savedTitles.includes(vehicle.title)
    );
    setComparisonVehicles(currentComparisonVehicles);
  }, [vehicles]); // Re-run effect if the vehicles in the store change

  const removeCar = (carTitleToRemove: string) => {
    // Remove the car from the selected titles in localStorage
    const updatedSelectedTitles = selectedCarTitles.filter(
      (title) => title !== carTitleToRemove
    );
    setSelectedCarTitles(updatedSelectedTitles);
    localStorage.setItem("selectedCars", JSON.stringify(updatedSelectedTitles));

    // Update the displayed comparison vehicles immediately
    const updatedComparisonVehicles = vehicles.filter((vehicle) =>
      updatedSelectedTitles.includes(vehicle.title)
    );
    setComparisonVehicles(updatedComparisonVehicles);
  };

  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen py-20 px-4 md:px-8 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-neutral-800 dark:text-white">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Car Comparison
            </span>
          </h1>

          {comparisonVehicles.length === 0 ? (
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
                Your comparison list is empty. Use the button below to add a
                vehicle now.
              </p>
              <Link
                href="/cars"
                className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 font-medium"
              >
                View Cars
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonVehicles.map((car, index) => (
                <div
                  key={car.id || index} // Use car.id for a more robust key
                  className="relative group bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-100 dark:border-neutral-700"
                >
                  <button
                    onClick={() => removeCar(car.title)} // Pass the actual title from the car object
                    className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md cursor-pointer"
                  >
                    ×
                  </button>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-neutral-800 dark:text-white truncate">
                        {car.title} {/* Display the car's title */}
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
                            Fuel Type
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.fuelType}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Fuel Capacity
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.fuelCapacity}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Trunk Capacity
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.trunkCapacity}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Engine Displacement
                          </p>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {car.engineDisplacement}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                            Transmission
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
