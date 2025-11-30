import { deleteMuridMts, getMuridMts, searchMuridMts, updateStatusMuridMts } from "@/app/api/muridMts";
import { Table, Image, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, FlagFilled, SearchOutlined } from "@ant-design/icons"
import { messageApi } from "@/app/ClientLayout";

export default function AdminMtsTab(){
    const [muridMts, setMuridMts] = useState<any>([]);

    useEffect(() => {
        handleGetMuridMts()
    }, [])

    async function handleGetMuridMts(){
        const data = await getMuridMts()
        setMuridMts(data)
    }

    async function handleSearchMurid(search: string){
        const data = await searchMuridMts(search)
        setMuridMts(data)
    }

    async function handleKonfirmasi(id: string, status: boolean){
        messageApi.success(`berhasil ${status ? "mengkonfirmasi" : "membatalkan"} pembayaran murid!`)
        updateStatusMuridMts(id, status)
        handleGetMuridMts()
    }

    async function handleDelete(id: string){
        const {success} = await deleteMuridMts(id)
        if(success){
            messageApi.success(`berhasil menghapus murid!`)
        }else{
            messageApi.error(`gagal menghapus murid!`)
        }
        handleGetMuridMts()
    }

    const columns = [
        { title: 'Status', dataIndex: 'terdaftar', key: 'status', render: (terdaftar: any) => {
            return (
                <div className="w-full flex justify-center p-0 m-0">
                    <span className={`flex items-center justify-between text-gray-600 ${terdaftar ? "text-green-600" : "text-red-600"}`} style={{width: "80px"}}>{terdaftar ? "terdaftar" : "tidak terdaftar"} <FlagFilled style={{ color: terdaftar ? '#1ede64ff' : '#f53434ff', fontSize: "20px" }}/></span>
                </div>
            )
        }},
        { title: 'NISN', dataIndex: 'nisn', key: 'nisn' },
        { title: 'Nama', dataIndex: 'nama', key: 'nama' },
        { title: 'Kelas', dataIndex: 'kelas', key: 'kelas' },
        { title: 'Handphone', dataIndex: 'nomor_hp', key: 'nomor_hp' },
        { title: 'Daftar', dataIndex: 'tanggal_daftar', key: 'daftar', render: (tanggal: any) => {
            const dateObj = new Date(tanggal);
            const result = dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return result
        }},
        { title: 'Foto', dataIndex: 'foto_murid', key: 'foto', render: (foto: any) => {
            return <Image className="rounded-lg" src={foto} width={50} height={50} alt="foto murid"/>
        }},
        { title: 'Bukti Pembayaran', dataIndex: 'bukti_pembayaran', key: 'bukti', render: (bukti: any) => {
            return <Image className="rounded-lg" src={bukti} width={50} height={50} alt="bukti pembayaran"/>
        }},
        { title: 'Action', key: 'action', render: (_: any, row: any) => {
            return (
                <div className="w-full flex justify-center gap-1">
                    <Button 
                        className={`
                            ${!row.terdaftar 
                                ? "!bg-green-400 hover:!bg-green-600" // Success Color + Darker Hover
                                : "!bg-red-400 hover:!bg-red-600 !px-7"     // Danger Color + Darker Hover
                            } 
                            !text-white border-none
                        `}
                        onClick={() => handleKonfirmasi(row.id, !row.terdaftar)}
                    >
                        {!row.terdaftar ? 
                            <div className="flex align-center gap-2">Konfirmasi <CheckOutlined /></div>
                            :
                            <div className="flex align-center gap-2">Batal <CloseOutlined /></div>
                        }
                    </Button>

                    <Button className="!bg-gray-400 hover:!bg-gray-600 !text-white" onClick={() => handleDelete(row.id)}>
                        Hapus
                    </Button>
                </div>
            )
        }},
    ];

    return(
        <>
            <Input.Search
                placeholder="Nama Atau NISN"
                allowClear
                enterButton={(<SearchOutlined />)}
                size="large"
                onSearch={(value) => handleSearchMurid(value)}
                className="mb-3"
            />
            <div className="[&_.ant-table-cell]:text-xs overflow-y-auto h-[60vh]" data-aos="fade-left">
                <Table size="small" dataSource={muridMts} columns={columns} scroll={{ x: 'max-content' }} style={{fontSize: "8px"}} pagination={{
                    pageSize: 10, // Number of items per page
                }}/>
            </div>
        </>
    )
}