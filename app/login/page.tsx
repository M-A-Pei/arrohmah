"use client"

import React, { useEffect, useState } from "react";
import { login } from "../api/auth";
import Cookies from "js-cookie";
import { messageApi } from "@/app/ClientLayout";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { Input } from "antd";

export default function Login(){
    const [password, setPassword] = useState("");

    const router = useRouter()

    async function handleLogin(){
        const {status} = await login(password)
        console.log(status)
        if(status){
            messageApi.success("berhasil login")
            router.push("/admin")
        }else{
            messageApi.error("password salah!")
        }
    }

    useEffect(() => {
        if(Cookies.get("login")){
            router.push("/admin")
        }
    }, [])

    return(
        <div className="bg-[url('/img/gedung/gedung_4.jpg')] bg-cover bg-center flex justify-center items-center w-full h-screen">
            <div className="absolute inset-0 bg-green-400/50 h-screen" />
            <div className="bg-black/80 rounded-xl flex flex-col gap-3 p-6 z-40 outline-2">
                <h2 className="text-3xl text-white text-center w-full">Admin Login</h2>
                <div className="flex gap-2">
                    <Input.Password placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="rounded bg-white text-gray-500 p-2"/>
                    <button onClick={handleLogin} className="outline-1 outline-green-900 p-2 rounded-lg bg-green-200 hover:bg-green-50"><CiLogin/></button>
                </div>
            </div>
        </div>
    )
}