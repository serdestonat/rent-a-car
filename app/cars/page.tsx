"use client";

import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import { NavbarDemo } from "@/app/page";
import { WarningModal } from "@/components/WarningModal";
import { useVehicleStore } from "@/store/vehicleStore";

// Common compare handler
const handleCompare = (carTitle: string) => {
  const selected = JSON.parse(localStorage.getItem("selectedCars") || "[]");

  if (!selected.includes(carTitle)) {
    if (selected.length >= 3) {
      return {
        message: "You can only compare 3 cars at a time!",
        type: "warning" as const,
      };
    }

    localStorage.setItem(
      "selectedCars",
      JSON.stringify([...selected, carTitle])
    );
    return {
      message: `${carTitle} added to the comparison list!`,
      type: "success" as const,
    };
  }

  return {
    message: "This car is already in the comparison list!",
    type: "warning" as const,
  };
};

// Common CarContent component
const CarContent = ({
  title,
  model,
  fuelType,
  fuelCapacity,
  trunkCapacity,
  engineDisplacement,
  transmission,
  image,
}: {
  title: string;
  model: string;
  fuelType: string;
  fuelCapacity: string;
  trunkCapacity: string;
  engineDisplacement: string;
  transmission: string;
  image: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    message: string;
    type: "success" | "warning";
  }>({ message: "", type: "warning" });

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <div className="border-b pb-4 border-neutral-300/50">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {model}
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {title}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Fuel Type
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {fuelType}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Fuel Capacity
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {fuelCapacity}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Transmission
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {transmission}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Trunk Capacity
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {trunkCapacity}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Engine Displacement
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {engineDisplacement}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const result = handleCompare(title);
              setModalData(result);
              setIsModalOpen(true);
            }}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl 
                      hover:from-blue-600 hover:to-blue-700 cursor-pointer transition-all duration-300 font-semibold
                      shadow-md hover:shadow-lg"
          >
            Add To The Comparison List
          </button>

          <WarningModal
            isOpen={isModalOpen}
            message={modalData.message}
            type={modalData.type}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={image}
            alt={model}
            width={600}
            height={400}
            className="object-contain h-64 w-full md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </div>
    </div>
  );
};

// Main components
export function AppleCardsCarouselDemo() {
  const { vehicles } = useVehicleStore();

  const data = vehicles.map((vehicle) => ({
    category: vehicle.category,
    title: vehicle.title,
    src: vehicle.image,
    content: (
      <CarContent
        title={vehicle.title}
        model={vehicle.model}
        fuelType={vehicle.fuelType}
        fuelCapacity={vehicle.fuelCapacity}
        trunkCapacity={vehicle.trunkCapacity}
        engineDisplacement={vehicle.engineDisplacement}
        transmission={vehicle.transmission}
        image={vehicle.image}
      />
    ),
  }));

  const cards = data.map((card, index) => (
    <Card key={`${card.title}-${index}`} card={card} index={index} />
  ));

  return (
    <>
      <NavbarDemo />
      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Check Out Our Cars
        </h2>
        <Carousel items={cards} />
      </div>
    </>
  );
}

export default function Cars() {
  return <AppleCardsCarouselDemo />;
}
