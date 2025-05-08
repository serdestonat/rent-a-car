"use client";

import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import { NavbarDemo } from "@/app/page";
import { WarningModal } from "@/components/WarningModal";

// Common compare handler
const handleCompare = (carTitle: string) => {
  const selected = JSON.parse(localStorage.getItem("selectedCars") || "[]");

  if (!selected.includes(carTitle)) {
    if (selected.length >= 3) {
      return {
        message: "Maksimum 3 araç karşılaştırabilirsiniz!",
        type: "warning" as const,
      };
    }

    localStorage.setItem(
      "selectedCars",
      JSON.stringify([...selected, carTitle])
    );
    return {
      message: `${carTitle} karşılaştırma listesine eklendi!`,
      type: "success" as const,
    };
  }

  return {
    message: "Bu araç zaten karşılaştırma listesinde!",
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
                Yakıt Tipi
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {fuelType}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Yakıt Deposu
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {fuelCapacity}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Şanzıman
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {transmission}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Bagaj Hacmi
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {trunkCapacity}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-neutral-700 dark:text-neutral-200">
                Motor Hacmi
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
                      hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold
                      shadow-md hover:shadow-lg"
          >
            Karşılaştır
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

// Car content components
const EgeaContent = () => (
  <CarContent
    title="Egea"
    model="Fiat Egea 1.4 Fire"
    fuelType="Benzin"
    fuelCapacity="50 L"
    trunkCapacity="520 L"
    engineDisplacement="1368 cc"
    transmission="Manuel (6 İleri)"
    image="/images/cars/egea.png"
  />
);

const I20Content = () => (
  <CarContent
    title="i20"
    model="Hyundai i20 1.4 MPI"
    fuelType="Benzin"
    fuelCapacity="40 L"
    trunkCapacity="352 L"
    engineDisplacement="1368 cc"
    transmission="Manuel / Otomatik"
    image="/images/cars/i20.jpg"
  />
);

const FluenceContent = () => (
  <CarContent
    title="Fluence"
    model="Renault Fluence 1.5 dCi"
    fuelType="Dizel"
    fuelCapacity="60 L"
    trunkCapacity="530 L"
    engineDisplacement="1461cc"
    transmission="Manuel / Otomatik"
    image="/images/cars/fluence.jpg"
  />
);

const Three01Content = () => (
  <CarContent
    title="301"
    model="Peugeot 301 1.5 BlueHDi"
    fuelType="Dizel"
    fuelCapacity="50 L"
    trunkCapacity="506 L"
    engineDisplacement="1499 cc"
    transmission="Manuel (6 İleri)"
    image="/images/cars/301.png"
  />
);

const FocusContent = () => (
  <CarContent
    title="Focus"
    model="Ford Focus 1.5 EcoBlue"
    fuelType="Dizel"
    fuelCapacity="47 L"
    trunkCapacity="511 L"
    engineDisplacement="1499 cc"
    transmission="Manuel (8 İleri)"
    image="/images/cars/focus.png"
  />
);

const ClioSportTourerContent = () => (
  <CarContent
    title="Clio Sport Tourer"
    model="Renault Clio Sport Tourer"
    fuelType="Benzin / Dizel"
    fuelCapacity="45-50 L"
    trunkCapacity="443 L"
    engineDisplacement="999-1461 cc"
    transmission="Manuel / Otomatik"
    image="/images/cars/sportClio1.jpg"
  />
);

const SymbolContent = () => (
  <CarContent
    title="Symbol"
    model="Renault Symbol 1.0 SCe"
    fuelType="Benzin"
    fuelCapacity="50 L"
    trunkCapacity="510L"
    engineDisplacement="999 cc"
    transmission="Manuel (5 İleri)"
    image="/images/cars/symbol.png"
  />
);

const LineaContent = () => (
  <CarContent
    title="Linea"
    model="Fiat Linea 1.3 Multijet"
    fuelType="Dizel"
    fuelCapacity="45 L"
    trunkCapacity="500 L"
    engineDisplacement="1248 cc"
    transmission="Manuel (5 İleri)"
    image="/images/cars/linea.jpg"
  />
);

// Data array
const data = [
  {
    category: "Fiat",
    title: "Egea",
    src: "/images/cars/egea.png",
    content: <EgeaContent />,
  },
  {
    category: "Hyundai",
    title: "i20",
    src: "/images/cars/i20.jpg",
    content: <I20Content />,
  },
  {
    category: "Renault",
    title: "Fluence",
    src: "/images/cars/fluence.jpg",
    content: <FluenceContent />,
  },
  {
    category: "Peugeot",
    title: "301",
    src: "/images/cars/301.png",
    content: <Three01Content />,
  },
  {
    category: "Ford",
    title: "Focus",
    src: "/images/cars/focus.png",
    content: <FocusContent />,
  },
  {
    category: "Renault",
    title: "Clio Sport Tourer",
    src: "/images/cars/sportClio1.jpg",
    content: <ClioSportTourerContent />,
  },
  {
    category: "Renault",
    title: "Symbol",
    src: "/images/cars/symbol.png",
    content: <SymbolContent />,
  },
  {
    category: "Fiat",
    title: "Linea",
    src: "/images/cars/linea.jpg",
    content: <LineaContent />,
  },
];

// Main components
export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <>
      <NavbarDemo />
      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Arabalarımıza Göz Atın
        </h2>
        <Carousel items={cards} />
      </div>
    </>
  );
}

export default function Cars() {
  return <AppleCardsCarouselDemo />;
}
