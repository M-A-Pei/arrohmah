import { FaWhatsapp } from "react-icons/fa";
import { CiMail, CiFlag1 } from "react-icons/ci";
import { FaHouseFlag } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Logo Section */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-3">Ar-Rohmah</h2>
          <p className="text-sm leading-relaxed">
            Membangun generasi masa depan dengan ilmu, iman, dan akhlak.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Tautan Cepat</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
            <li><Link href="/pendaftaran/mts" className="hover:text-white transition">Pendaftaran MTS</Link></li>
            <li><Link href="/pendaftaran/ma" className="hover:text-white transition">Pendaftaran MA</Link></li>
            <li><Link href="/info/mts" className="hover:text-white transition">Info MTS</Link></li>
            <li><Link href="/info/ma" className="hover:text-white transition">Info MA</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Hubungi Kami</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3"><FaWhatsapp className="text-green-500 text-lg inline"/> (+62) 896-9749-4550</li>
            <li className="flex items-center gap-3"><CiMail className="text-orange-500 text-lg inline"/> jazilibabon@gmail.com</li>
            <li className="flex items-center gap-3">Jl. Masjid Agung Arrohmah Kp. Kapudang, RT.001/RW.005, Sukatani, Kec. Cisoka, Kabupaten Tangerang, Banten 15730</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ar-Rohmah Boarding School. All rights reserved.
      </div>
    </footer>
  );
}
