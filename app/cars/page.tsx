"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import { NavbarDemo } from "@/app/page";

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

const EgeaContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>
              <br />
              Fiat Egea 1.4 Fire
              <br />
              Yakıt Tipi: Benzin
              <br />
              Yakıt Deposu: 50 L
              <br />
              Bagaj Kapasitesi: 520 L
              <br />
              Silindir Hacmi: 1368 cc
              <br />
              Şanzıman Türü: Manuel (6 İleri)
            </p>
            <Image
              src="/images/cars/egea.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const I20Content = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Hyundai i20 1.4 MPI
              <br />
              Yakıt Tipi: Benzin
              <br />
              Yakıt Deposu: 40 L
              <br />
              Bagaj Kapasitesi: 352 L
              <br />
              Silindir Hacmi: 1368 cc
              <br />
              Şanzıman Türü: Manuel / Otomatik
            </p>
            <Image
              src="/images/cars/i20.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const FluenceContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Renault Fluence 1.5 dCi
              <br />
              Yakıt Tipi: Dizel
              <br />
              Yakıt Deposu: 60 L
              <br />
              Bagaj Kapasitesi: 530 L
              <br />
              Silindir Hacmi: 1461cc
              <br />
              Şanzıman Türü: Manuel / Otomatik
            </p>
            <Image
              src="/images/cars/fluence.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const Three01Content = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Peugeot 301 1.5 BlueHDi
              <br />
              Yakıt Tipi: Dizel
              <br />
              Yakıt Deposu: 50 L
              <br />
              Bagaj Kapasitesi: 506 L
              <br />
              Silindir Hacmi: 1499 cc
              <br />
              Şanzıman Türü: Manuel (6 İleri)
            </p>
            <Image
              src="/images/cars/301.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const FocusContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Ford Focus 1.5 EcoBlue
              <br />
              Yakıt Tipi: Dizel
              <br />
              Yakıt Deposu: 47 L
              <br />
              Bagaj Kapasitesi: 511 L
              <br />
              Silindir Hacmi: 1499 cc
              <br />
              Şanzıman Türü: Manuel (8 İleri)
            </p>
            <Image
              src="/images/cars/focus.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const ClioSportTourerContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200 text-right">
                Araç Özellikleri
              </span>{" "}
              <br />
              Renault Clio Sport Tourer
              <br />
              Yakıt Tipi: Benzin / Dizel
              <br />
              Yakıt Deposu: 45-50 L
              <br />
              Bagaj Kapasitesi: 443 L
              <br />
              Silindir Hacmi: 999-1461 cc
              <br />
              Şanzıman Türü: Manuel / Otomatik
            </p>
            <Image
              src="/images/cars/sportClio1.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const SymbolContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Renault Symbol 1.0 SCe
              <br />
              Yakıt Tipi: Benzin
              <br />
              Yakıt Deposu: 50 L
              <br />
              Bagaj Kapasitesi: 510L
              <br />
              Silindir Hacmi: 999 cc
              <br />
              Şanzıman Türü: Manuel (5 İleri)
            </p>
            <Image
              src="/images/cars/symbol.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

const LineaContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Araç Özellikleri
              </span>{" "}
              <br />
              Fiat Linea 1.3 Multijet
              <br />
              Yakıt Tipi: Dizel
              <br />
              Yakıt Deposu: 45 L
              <br />
              Bagaj Kapasitesi: 500 L
              <br />
              Silindir Hacmi: 1248 cc
              <br />
              Şanzıman Türü: Manuel (5 İleri)
            </p>
            <Image
              src="/images/cars/linea.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain pt-10"
            />
          </div>
        );
      })}
    </>
  );
};

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

export default function Cars() {
  return <AppleCardsCarouselDemo />;
}
