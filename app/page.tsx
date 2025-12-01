"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Grid } from "antd";

export default function Home() {
    const images = [
    "/img/guru/img_1.jpg",
    "/img/guru/img_2.jpg",
    "/img/guru/img_3.jpg",
    "/img/guru/img_4.jpg",
    "/img/guru/img_5.jpg",
    "/img/guru/img_6.jpg",
    "/img/guru/img_7.jpg",
  ];

const guruImageRef = useRef<HTMLImageElement>(null)
const imageAnimRef = useRef<gsap.core.Tween | null>(null);

useEffect(() => {
  // Create the animation
  imageAnimRef.current = gsap.to(".scroll-track", {
    xPercent: -50, // move halfway left
    ease: "none",
    duration: 10,
    repeat: -1,
  });

  const img = guruImageRef.current;
  if (!img) return;

  const anim = imageAnimRef.current;

  // Add listeners
  const images = document.querySelectorAll(".scroll-image");

  images.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        img.classList.add("scale-130", "transition-transform", "duration-300", "shadow-xl");
        anim.pause();
      });

      img.addEventListener("mouseleave", () => {
        img.classList.remove("scale-130", "shadow-xl");
        anim.resume();
      });
    });

    // Cleanup
    return () => {
    };
  }, []);

  const screens = Grid.useBreakpoint();


  return (
    <div>
      {/* header */}
      <div className="bg-[url('/img/gedung/gedung_4.jpg')] bg-cover bg-center h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-green-400/50 h-screen" />
        <div className="flex flex-col z-40 items-center gap-4">
          <Image src={"/img/logo/logo.png"} alt="logo smk" className="rounded-full" width={100} height={100}/>
          <div className="flex flex-col items-center">
            <h1 className="relative text-white text-4xl z-40 font-light font-serif text-center">Arrohmah Boarding school</h1>
            <small className="text-gray-100">MTS/MA membangung generasi masa depan</small>
          </div>
          
          <div className="flex gap-3">
            <Link href="/pendaftaran/mts" className="bg-gray-800 text-white rounded px-3 py-2">Daftar MTS</Link>
            <Link href="/pendaftaran/ma" className="bg-gray-800 text-white rounded px-3 py-2">Daftar MA</Link>
          </div>
        </div>
      </div>

      
      <h1 data-aos="fade-up" className="w-full text-4xl z-40 font-light font-serif text-center mb-5 mt-10">Tentang Kami</h1>

      {/* gedung section */}
      <div className="my-4">
        <div className="flex flex-col gap-4">
          <div data-aos="fade-right" className={`flex ${screens.md ? "flex-row" : "flex-col mb-4"} items-center gap-5 w-full px-5`}>
              <Image src="/img/gedung/gedung_1.jpg" className="rounded-lg" alt="gedung_1" width={400} height={200}/>
              <div className="flex flex-col gap-1">
                <p>Tempat Parkir</p>
                <p className="text-gray-700 text-xs">Sekolah memiliki fasilitas tempat parkir yang luas dan tertata dengan baik, sehingga mampu menampung kendaraan siswa, guru, maupun tamu yang berkunjung. Area parkir ini dilengkapi dengan jalur masuk dan keluar yang jelas serta sistem penataan kendaraan yang rapi, guna meminimalisir penumpukan dan memastikan kenyamanan pengguna. Selain itu, keberadaan petugas keamanan turut memberikan rasa aman bagi seluruh warga sekolah dalam memarkirkan kendaraannya.</p>
              </div>
          </div>

          <div data-aos="fade-left" data-aos-offset="-100" className={`flex ${screens.md ? "flex-row" : "flex-col mb-4"} items-center gap-5 w-full px-5`}>
            {
              screens.md ? (
              <>
                <div className="flex flex-col gap-1 items-end">
                  <p>Ruang Kelas</p>
                  <p className="text-gray-700 text-xs text-right">Ruang kelas di sekolah dirancang untuk menciptakan suasana belajar yang nyaman dan kondusif. Setiap ruangan dilengkapi dengan ventilasi yang baik, pencahayaan yang memadai, serta peralatan belajar yang mendukung, seperti meja dan kursi ergonomis, papan tulis, serta perangkat tambahan lainnya. Tata ruang yang rapi dan bersih membantu siswa lebih fokus dalam menerima materi pembelajaran, sementara lingkungan yang nyaman turut memperkuat efektivitas proses belajar mengajar.</p>
                </div>                
                <Image src="/img/gedung/gedung_2.jpg" className="rounded-lg" alt="gedung_1" width={400} height={200}/>
              </>
              ): (
              <>
                <Image src="/img/gedung/gedung_2.jpg" className="rounded-lg" alt="gedung_1" width={400} height={200}/>
                <div className="flex flex-col gap-1">
                  <p>Ruang Kelas</p>
                  <p className="text-gray-700 text-xs">Ruang kelas di sekolah dirancang untuk menciptakan suasana belajar yang nyaman dan kondusif. Setiap ruangan dilengkapi dengan ventilasi yang baik, pencahayaan yang memadai, serta peralatan belajar yang mendukung, seperti meja dan kursi ergonomis, papan tulis, serta perangkat tambahan lainnya. Tata ruang yang rapi dan bersih membantu siswa lebih fokus dalam menerima materi pembelajaran, sementara lingkungan yang nyaman turut memperkuat efektivitas proses belajar mengajar.</p>
                </div>
              </>
              )

            }
          </div>

          <div data-aos="fade-right" data-aos-offset="-100" className={`flex ${screens.md ? "flex-row" : "flex-col mb-4"} items-center gap-5 w-full px-5`}>
              <Image src="/img/gedung/gedung_3.jpg" className="rounded-lg" alt="gedung_1" width={400} height={200}/>
              <div className="flex flex-col gap-1">
                <p>Proses Belajar Mengajar</p>
                <p className="text-gray-700 text-xs">Proses belajar mengajar di sekolah dilaksanakan secara terstruktur dengan mengutamakan pendekatan yang interaktif dan partisipatif. Guru berperan sebagai fasilitator yang tidak hanya menyampaikan materi, tetapi juga mendorong siswa untuk berpikir kritis, bertanya, dan berdiskusi. Metode pembelajaran yang digunakan bervariasi sesuai kebutuhan materi, mulai dari ceramah, diskusi, demonstrasi, hingga penggunaan teknologi pembelajaran. Hal ini bertujuan untuk menciptakan suasana kelas yang dinamis serta memastikan setiap siswa dapat memahami dan menerapkan materi dengan baik</p>
              </div>
          </div>

          <div data-aos="fade-left" data-aos-offset="-100" className={`flex ${screens.md ? "flex-row" : "flex-col mb-4"} items-center gap-5 w-full px-5`}>
            {
              screens.md ? (
              <>
                <div className="flex flex-col gap-1 items-end">
                  <p>Kegiatan Belajar Berkelompok</p>
                  <p className="text-gray-700 text-xs text-right">Kegiatan belajar berkelompok menjadi salah satu bagian penting dalam pembelajaran di sekolah. Kegiatan ini dirancang untuk melatih kemampuan siswa dalam bekerja sama, menghargai pendapat orang lain, serta menyelesaikan masalah secara kolektif. Dalam kelompok, siswa diajak untuk berdiskusi, berbagi ide, serta mempresentasikan hasil pemikiran bersama. Selain mengasah keterampilan sosial, kegiatan ini juga membantu siswa mengembangkan kemampuan komunikasi, kepemimpinan, dan pemecahan masalah yang sangat dibutuhkan dalam kehidupan sehari-hari.</p>
                </div>
                <Image src="/img/gedung/gedung_5.jpg" className="rounded-lg" alt="gedung_5" width={400} height={200}/>
              </>
              ): (
              <>
                <Image src="/img/gedung/gedung_5.jpg" className="rounded-lg" alt="gedung_5" width={400} height={200}/>
                <div className="flex flex-col gap-1">
                  <p>Kegiatan Belajar Berkelompok</p>
                  <p className="text-gray-700 text-xs">Kegiatan belajar berkelompok menjadi salah satu bagian penting dalam pembelajaran di sekolah. Kegiatan ini dirancang untuk melatih kemampuan siswa dalam bekerja sama, menghargai pendapat orang lain, serta menyelesaikan masalah secara kolektif. Dalam kelompok, siswa diajak untuk berdiskusi, berbagi ide, serta mempresentasikan hasil pemikiran bersama. Selain mengasah keterampilan sosial, kegiatan ini juga membantu siswa mengembangkan kemampuan komunikasi, kepemimpinan, dan pemecahan masalah yang sangat dibutuhkan dalam kehidupan sehari-hari.</p>
                </div>
              </>
              )

            }
          </div>
        </div>
      </div>
      
      <h1 data-aos="fade-up" className="w-full text-4xl z-40 font-light font-serif text-center mb-5 mt-10" data-aos-offset="-200">Guru Guru Kami</h1>

      {/* guru section */}
      <div
        data-aos="fade-up"
        data-aos-offset="-200"
        className="overflow-hidden whitespace-nowrap py-10"
      >
        <div className="flex scroll-track gap-8">
          {images.concat(images).map((src, i) => (
            <img
              key={i}
              src={src}
              ref={guruImageRef}
              className="scroll-image sm:h-32 h-19 w-auto rounded-lg object-cover"
            />
          ))}
          {images.concat(images).map((src, i) => (
            <img
              key={`${i}2`}
              src={src}
              ref={guruImageRef}
              className="scroll-image sm:h-32 h-19 w-auto rounded-lg object-cover"
            />
            
          ))}
        </div>
      </div>
    </div>
  );
}
