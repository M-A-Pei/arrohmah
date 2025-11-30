// import { getMuridMts, searchMuridMts, updateStatusMuridMts } from "@/app/api/muridMts";
import { Table, Image, Button, Input, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, FlagFilled, SearchOutlined } from "@ant-design/icons"
import { messageApi } from "@/app/ClientLayout";
import { editOrPostJumlahMuridData, getJumlahMuridData } from "@/app/api/infoSekolah";

export default function JumlahMuridTab(){
    const [kelas_7, setKelas_7] = useState<any>();
    const [kelas_8, setKelas_8] = useState<any>();
    const [kelas_9, setKelas_9] = useState<any>();
    const [kelas_10, setKelas_10] = useState<any>();
    const [kelas_11, setKelas_11] = useState<any>();
    const [kelas_12, setKelas_12] = useState<any>();

    async function handleGetJumlahMurid(){
       const data = await getJumlahMuridData()
       setKelas_7(data?.kelas_7?.jumlah)
       setKelas_8(data?.kelas_8?.jumlah)
       setKelas_9(data?.kelas_9?.jumlah)
       setKelas_10(data?.kelas_10?.jumlah)
       setKelas_11(data?.kelas_11?.jumlah)
       setKelas_12(data?.kelas_12?.jumlah)
    }

    function createHandler(kelasString: string){
        return async function handleEdit(kelas: number){
            const {status} = await editOrPostJumlahMuridData(kelasString, kelas)
            if(status){
                messageApi.success("berhasil update jumlah murid!")
            }else{
                messageApi.error("gagal update jumlah murid!")
            }
         }
    }

    useEffect(()=>{
        handleGetJumlahMurid()
    }, [])

    return(
        <div className="[&_.ant-table-cell]:text-xs" data-aos="fade-left">
            <h1 className="text-xl mb-4">Jumlah Murid</h1>
            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 7</label>
                <Input placeholder="Jumlah Kelas 7" value={kelas_7} onChange={(e) => setKelas_7(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_7")(kelas_7)}>Edit <EditOutlined /></Button>
            </Space.Compact>

            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 8</label>
                <Input placeholder="Jumlah Kelas 8" value={kelas_8} onChange={(e) => setKelas_8(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_8")(kelas_8)}>Edit <EditOutlined /></Button>
            </Space.Compact>

            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 9</label>
                <Input placeholder="Jumlah Kelas 9" value={kelas_9} onChange={(e) => setKelas_9(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_9")(kelas_9)}>Edit <EditOutlined /></Button>
            </Space.Compact>

            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 10</label>
                <Input placeholder="Jumlah Kelas 10" value={kelas_10} onChange={(e) => setKelas_10(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_10")(kelas_10)}>Edit <EditOutlined /></Button>
            </Space.Compact>

            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 11</label>
                <Input placeholder="Jumlah Kelas 11" value={kelas_11} onChange={(e) => setKelas_11(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_11")(kelas_11)}>Edit <EditOutlined /></Button>
            </Space.Compact>

            <Space.Compact className="w-full flex items-center mb-3">
                <label className="w-20">Kelas 12</label>
                <Input placeholder="Jumlah Kelas 12" value={kelas_12} onChange={(e) => setKelas_12(e.target.value)}/>
                <Button type="primary" className="flex items-center" onClick={() => createHandler("kelas_12")(kelas_12)}>Edit <EditOutlined /></Button>
            </Space.Compact>
        </div>
    )
}