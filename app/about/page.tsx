import React from "react";

export default function About() {
  return (
    <div className="flex h-screen">
      {/* Sol taraf içeriği - boş bırakıldı, istediğiniz içeriği ekleyebilirsiniz */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Hakkımızda</h1>
        <p className="text-lg">Telefon Numaramız: +90 533 333 33 33</p>
        <p className="text-lg">E-posta Adresimiz: gaye.rentacar@gmail.com</p>
      </div>

      {/* Sağ taraf - sabit harita */}
      <div className="w-1/2 sticky mt-10 mr-10 mb-10 h-screen/2">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.1543650828344!2d30.703271574899997!3d36.88665526282282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3918a8b5831dd%3A0x6204bbed646c77a9!2sGaye%20rent%20a%20car!5e0!3m2!1str!2str!4v1745957092974!5m2!1str!2str"
          width="600"
          height="450"
          style={{ borderRadius: "20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
