"use client"

import React, { useEffect, useState } from "react";
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
import { useSwipeable } from 'react-swipeable';

export default function Admin(){
    const router = useRouter()
    const login = Cookies.get("login");

    const [openSidebar, setOpenSidebar] = useState(true)
    
    const handlers = useSwipeable({
      onSwipedLeft: () => setOpenSidebar(false),
      onSwipedRight: () => {console.log("OPEN"); setOpenSidebar(true)},
      trackMouse: true // allows you to test swipe with mouse on desktop
    });

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
        <div {...handlers} className="h-screen pt-20 sm:px-3 text-black bg-[url('/img/logo/logo.png')] bg-no-repeat bg-center">
            <Tabs tabPosition="left" defaultActiveKey="1" items={parentTabItems} destroyInactiveTabPane={true} tabBarStyle={{ display: openSidebar? undefined : "none" }}/>
        </div>
    )
}