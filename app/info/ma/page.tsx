"use client"

import { Table, Tabs, Grid } from 'antd';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {Image as AntdImage} from 'antd';
import { getJadwalPelajaran, getJumlahMuridData, getKalenderAkademik, getSpp, getUas, getUts } from '@/app/api/infoSekolah';

const TabContent = ({ children }: { children: React.ReactNode }) => (
  <div data-aos="fade-left" className="h-[60vh] flex items-center flex-col sm:p-6 p-2 bg-white/90 rounded-xl shadow-lg overflow-auto text-gray-1100">
    {children}
  </div>
);

export default function infoMa() {
    const [jumlahMurid, setJumlahMurid] = useState<any>()
    const [jadwalPelajaran, setJadwalPelajaran] = useState<any>()
    const [kalenderAkademik, setkalenderAkademik] = useState<any>()
    const [uts, setUts] = useState<any>()
    const [uas, setUas] = useState<any>()
    const [spp, setSpp] = useState<any>()

    const screens = Grid.useBreakpoint();

    async function handleGetJumlahMurid(){
        const data = await getJumlahMuridData()
        setJumlahMurid(data)
    }

    async function handleGetJadwalPelajaran(){
        const data = await getJadwalPelajaran()
        setJadwalPelajaran(data)
    }

    async function handleGetKalender(){
      const data = await getKalenderAkademik()
      setkalenderAkademik(data)
    }

    async function handleGetUts(){
      const data = await getUts()
      setUts(data)
    }

    async function handleGetUas(){
      const data = await getUas()
      setUas(data)
    }

    async function handleGetSpp(){
      const data = await getSpp()
      setSpp(data)
    }

    useEffect(() => {
      handleGetJumlahMurid()
      handleGetJadwalPelajaran()
      handleGetKalender()
      handleGetUts()
      handleGetUas()
      handleGetSpp()
    }, [])

    const muridColumns = [
      { title: (
          <span><b className="font-semibold">Kelas 10</b> <small className='text-gray-400 font-thin'>{jumlahMurid?.kelas_10?.tanggal ? `Angkatan ${jumlahMurid?.kelas_10?.tanggal}` : ""}</small></span>
        ), render: () => <span>{jumlahMurid?.kelas_10?.jumlah ? `${jumlahMurid?.kelas_10?.jumlah} murid` : "-"}</span>, key: 'kelas_10' },
      { title: (
          <span><b className="font-semibold">Kelas 11</b> <small className='text-gray-400 font-thin'>{jumlahMurid?.kelas_11?.tanggal ? `Angkatan ${jumlahMurid?.kelas_11?.tanggal}` : ""}</small></span>
        ), render: () => <span>{jumlahMurid?.kelas_11?.jumlah ? `${jumlahMurid?.kelas_11?.jumlah} murid` : "-"}</span>, key: 'kelas_11' },
      { title: (
          <span><b className="font-semibold">Kelas 12</b> <small className='text-gray-400 font-thin'>{jumlahMurid?.kelas_12?.tanggal ? `Angkatan ${jumlahMurid?.kelas_12?.tanggal}` : ""}</small></span>
        ), render: () => <span>{jumlahMurid?.kelas_12?.jumlah ? `${jumlahMurid?.kelas_12?.jumlah} murid` : "-"}</span>, key: 'kelas_12' }
    ]

    const jadwalPelajaranColumns = [
      { title: (
          <span><b className="font-semibold">Kelas 10</b> <small className='text-gray-400 font-thin'>{jadwalPelajaran?.kelas_10?.tanggal ? `tanggal: ${jadwalPelajaran?.kelas_10?.tanggal}` : ""}</small></span>
        ), 
        render: () => {return jadwalPelajaran?.kelas_10?.jadwal ? <AntdImage src={jadwalPelajaran?.kelas_10?.jadwal} height={110} alt='jadwal kelas 10'/> : "tidak ada jadwal"}, 
        key: 'kelas_10' 
      },{
       title: (
          <span><b className="font-semibold">Kelas 11</b> <small className='text-gray-400 font-thin'>{jadwalPelajaran?.kelas_11?.tanggal ? `tanggal: ${jadwalPelajaran?.kelas_11?.tanggal}` : ""}</small></span>
        ), 
        render: () =>  {return jadwalPelajaran?.kelas_11?.jadwal ? <AntdImage src={jadwalPelajaran?.kelas_11?.jadwal} height={110} alt='jadwal kelas 11'/> : "tidak ada jadwal"}, 
        key: 'kelas_11' 
      },
      { title: (
          <span><b className="font-semibold">Kelas 12</b> <small className='text-gray-400 font-thin'>{jadwalPelajaran?.kelas_12?.tanggal ? `tanggal: ${jadwalPelajaran?.kelas_12?.tanggal}` : ""}</small></span>
        ), 
        render: () =>  {return jadwalPelajaran?.kelas_12?.jadwal ? <AntdImage src={jadwalPelajaran?.kelas_12?.jadwal} height={110} alt='jadwal kelas 12'/> : "tidak ada jadwal"}, 
        key: 'kelas_12' 
      },
    ]

    const items = [
    {
        key: '1',
        label: <span className="text-black font-bold">Pendaftaran dan Spp</span>,
        children: 
        <TabContent>
            <h1 className='text-xl mb-3 font-bold text-center'>Pendaftaran dan Spp <span className='font-thin'>{spp?.ma?.tahun ? `Tahun ${spp?.ma?.tahun}` : ""}</span></h1>
            {spp?.ma?.image ? <AntdImage src={spp?.ma?.image} height={200} className='rounded'/> : "tidak ada jadwal"}
        </TabContent>,
    },
    {
        key: '2',
        label: <span className="text-black font-bold">Jadwal Pelajaran</span>,
        children: 
        <TabContent>
          <h1 className='text-xl mb-3 font-bold text-center'>Jadwal Pelajaran</h1>
          <Table pagination={false} columns={jadwalPelajaranColumns} dataSource={[{key: "1"}]} className="hide-table-scrollbar w-full" scroll={{ x: 'max-content' }}/>
        </TabContent>,
    },
    {
        key: '3',
        label: <span className="text-black font-bold">Kalender Akademik</span>,
        children: 
          <TabContent>
            <h1 className='text-xl mb-3 font-bold text-center'>Kalender Akademik <span className='font-thin'>{kalenderAkademik?.ma?.tahun ? `Tahun ${kalenderAkademik?.ma?.tahun}` : ""}</span></h1>
            {kalenderAkademik?.ma?.kalender ? <AntdImage src={kalenderAkademik?.ma?.kalender} height={200} className='rounded'/> : "tidak ada jadwal"}
          </TabContent>,
    },
    {
        key: '4',
        label: <span className="text-black font-bold">UTS</span>,
        children: 
        <TabContent>
          <h1 className='text-xl mb-3 font-bold text-center'>Jadwal UTS <span className='font-thin'>{uts?.ma?.tanggal ? `Tanggal: ${uts?.ma?.tanggal}` : ""}</span></h1>
          {uts?.ma?.image ? <AntdImage src={uts?.ma?.image} height={200} className='rounded'/> : "tidak ada jadwal"}
        </TabContent>,
    },
    {
        key: '5',
        label: <span className="text-black font-bold">UAS</span>,
        children: 
          <TabContent>
          <h1 className='text-xl mb-3 font-bold text-center'>Jadwal UAS <span className='font-thin'>{uas?.ma?.tanggal ? `Tanggal: ${uas?.ma?.tanggal}` : ""}</span></h1>
          {uas?.ma?.image ? <AntdImage src={uas?.ma?.image} height={200} className='rounded'/> : "tidak ada jadwal"}
          </TabContent>,
    },
    {
        key: '6',
        label: <span className="text-black font-bold">Jumlah Murid & Kelas</span>,
        children: 
        <TabContent>
          <h1 className='text-xl mb-3 font-bold text-center'>Jumlah Murid</h1>
          <Table pagination={false} columns={muridColumns} dataSource={[{ key: '1' }]} className="hide-table-scrollbar w-full" scroll={{ x: 'max-content' }}/>
        </TabContent>,
    },
    ];

    return (
    <div className="bg-[url('/img/gedung/gedung_4.jpg')] bg-cover bg-center flex justify-center w-full h-screen relative sm:px-5 px-0">
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-400/50" />
      <div className="absolute opacity-50 inset-0 bg-[url('/img/logo/logo.png')] bg-no-repeat bg-center" />

      {/* Container to constrain width (optional, looks better centered) */}
      <div className="relative z-10 w-full h-[70vh] mt-20 opacity-125">
        <div className='w-full flex justify-center'>
          <Image src="/img/tulisan-ma.png" alt="tulisan ma" className='rounded mb-4' width={200} height={50}/>
        </div>
        <Tabs
          defaultActiveKey="1"
          tabPosition={screens.md ? 'left' : 'top'}
          // 2. This creates the physical GAP between tabs and content
          tabBarStyle={{ 
            margin: "0px"
          }}
          items={items}
          className="h-full" 
          destroyInactiveTabPane={true}
        />
      </div>
    </div>
    )
}