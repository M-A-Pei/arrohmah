"use client"

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"
import { Tabs } from "antd";
import AdminMtsTab from "@/components/tabs/adminMtsTab";
import JumlahMuridTab from "@/components/tabs/jumlahMuridTab";
import JadwalPelajaranTab from "@/components/tabs/jadwalPelajaranTab";
import KalenderAkademikTab from "@/components/tabs/kalenderAkademikTab";
import UtsTab from "@/components/tabs/utsTab";
import UasTab from "@/components/tabs/uasTab";
import AdminMaTab from "@/components/tabs/adminMaTab";
import SppTab from "@/components/tabs/sppTab";

export default function Admin(){
    const router = useRouter()

    const login = Cookies.get("login");

    const muridBaruTabItems = [
      {
        key: '1',
        label: 'Mts',
        children: (
          <AdminMtsTab />
        ),
      },
      {
        key: '2',
        label: 'Ma',
        children: <AdminMaTab />
      },
    ];

    const infoSekolahTabItems = [
      ...(login === 'admin' ? [{
          key: '1',
          label: 'Jumlah Murid',
          children: (
            <JumlahMuridTab />
          ),
      }] : []),
      {
        key: '2',
        label: 'Jadwal Pelajaran',
        children: <JadwalPelajaranTab/>
      },
      {
        key: '3',
        label: 'Kalender Akademik',
        children: <KalenderAkademikTab/>,
      },
      {
        key: '4',
        label: 'UTS',
        children: <UtsTab/>
      },
      {
        key: '5',
        label: 'UAS',
        children: <UasTab/>
      },
      {
        key: '6',
        label: 'SPP',
        children: <SppTab/>
      },
    ];

    const parentTabItems = [
      ...(login === 'admin' ? [{
          key: '1',
          label: 'Murid Baru',
          children: <Tabs defaultActiveKey="1" items={muridBaruTabItems} />,
      }] : []),
      {
        key: '2',
        label: 'Info Sekolah',
        children: <Tabs defaultActiveKey="1" items={infoSekolahTabItems} />
      },
    ]
    
    useEffect(() => {
        if(!login){
            router.push("/login")
        }
    }, [])

    return(
        <div className="h-screen pt-20 sm:px-3 text-black bg-[url('/img/logo/logo.png')] bg-no-repeat bg-center">
            <Tabs tabPosition="left" defaultActiveKey="1" items={parentTabItems} destroyInactiveTabPane={true}/>
        </div>
    )
}