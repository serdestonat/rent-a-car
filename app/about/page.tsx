import React from "react";
import { NavbarDemo } from "@/app/page";

export default function About() {
  return (
    <>
      <NavbarDemo />
      <div className="flex flex-col md:flex-row min-h-screen w-full p-4 md:p-8">
        {/* Sol taraf içeriği */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-base md:text-lg mb-2">
            Telefon Numaramız: +90 533 333 33 33
          </p>
          <p className="text-base md:text-lg">
            E-posta Adresimiz: gaye.rentacar@gmail.com
          </p>
        </div>

        {/* Sağ taraf - harita */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[600px] mt-4 md:mt-0">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.1543650828344!2d30.703271574899997!3d36.88665526282282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3918a8b5831dd%3A0x6204bbed646c77a9!2sGaye%20rent%20a%20car!5e0!3m2!1str!2str!4v1745957092974!5m2!1str!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
