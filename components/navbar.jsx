"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { messageApi } from "@/app/ClientLayout";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownPendaftaran, setDropdownPendaftaran] = useState(false);
  const [dropdownInfo, setDropdownInfo] = useState(false);

  const pathname = usePathname();

  function handleCloseDropdowns(){
    setDropdownInfo(false)
    setDropdownPendaftaran(false)
    setOpen(false)
  }

  useEffect(() => {
    handleCloseDropdowns()
  }, [pathname])

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <nav className="w-full absolute bg-black text-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <div className="flex gap-3">
        <h1 className="text-xl font-semibold font-serif">Ar-Rohmah</h1>
        <Image src={"/img/logo/logo.png"} alt="logo smk" width={30} height={30}/>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex items-center gap-6">
        <li className="cursor-pointer"><Link href="/">Home</Link></li>

        <li
          className="relative cursor-pointer"
          onClick={() => setDropdownPendaftaran(!dropdownPendaftaran)}
        >
          Pendaftaran ▾
          {dropdownPendaftaran && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg py-2 z-50 min-w-max whitespace-nowrap text-black">
              <Link href="/pendaftaran/ma" className="block px-4 py-2 hover:bg-gray-100">MA</Link>
              <Link href="/pendaftaran/mts" className="block px-4 py-2 hover:bg-gray-100">MTS</Link>
            </div>
          )}
        </li>

        <li
        className="relative cursor-pointer"
        onClick={() => setDropdownInfo(!dropdownInfo)}
        >
        Info ▾
        {dropdownInfo && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg py-2 z-50 min-w-max whitespace-nowrap text-black">
              <Link href="/info/ma" className="block px-4 py-2 hover:bg-gray-100">MA</Link>
              <Link href="/info/mts" className="block px-4 py-2 hover:bg-gray-100">MTS</Link>
            </div>
        )}
        </li>

        {
          Cookies.get("login") ?
          <li className="cursor-pointer"><Link href="/admin">Admin Panel</Link></li>
          :""
        }

        {
          Cookies.get("login") ?
          <button onClick={() => {Cookies.remove("login"); messageApi.success("Berhasil Logout!"); window.location.reload()}} className="text-center p-1 px-2 outline-1 outline-green-600 hover:bg-green-400 rounded-lg">Logout</button>
          :
          <Link href="/login" className="text-center p-1 px-2 outline-1 outline-green-600 hover:bg-green-400 rounded-lg">Login</Link>
        }

      </ul>

      {/* Mobile hamburger */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile menu */}
      {open && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-2 my-0 py-6 md:hidden text-black">
          <li className="cursor-pointer w-full text-center py-2 hover:bg-gray-100"><Link href="/">Home</Link></li>

          <li className="cursor-pointer w-full text-center py-2 hover:bg-gray-100" onClick={() => setDropdownPendaftaran(!dropdownPendaftaran)}>
            Pendaftaran ▾
            {dropdownPendaftaran && (
              <div className="mt-2 w-full text-center text-black">
                <Link href="/pendaftaran/ma" className="block px-4 py-2 hover:bg-gray-200">MA</Link>
                <Link href="/pendaftaran/mts" className="block px-4 py-2 hover:bg-gray-200">MTS</Link>
              </div>
            )}
          </li>

          <li className="cursor-pointer w-full text-center py-2 hover:bg-gray-100" onClick={() => setDropdownInfo(!dropdownInfo)}>
            Info ▾
            {dropdownInfo && (
              <div className="mt-2 w-full text-center text-black">
                <Link href="/info/ma" className="block px-4 py-2 hover:bg-gray-200">MA</Link>
                <Link href="/info/mts" className="block px-4 py-2 hover:bg-gray-200">MTS</Link>
              </div>
            )}
          </li>

          {
            Cookies.get("login") ?
            <button onClick={() => {Cookies.remove("login"); messageApi.success("Berhasil Logout!"); window.location.reload()}} className="w-50 text-center p-1 outline-1 outline-green-600 hover:bg-green-400 rounded-lg">Logout</button>
            :
            <Link href="/login" className="w-50 text-center p-1 outline-1 outline-green-600 hover:bg-green-400 rounded-lg">Login</Link>
          }
        </ul>
      )}
    </nav>
  );
}
