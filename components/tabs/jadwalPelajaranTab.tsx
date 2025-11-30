// import { getMuridMts, searchMuridMts, updateStatusMuridMts } from "@/app/api/muridMts";
import { Table, Image, Button, Input, message, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, FlagFilled, SearchOutlined } from "@ant-design/icons"
import { messageApi } from "@/app/ClientLayout";
import { editOrPostJadwalPelajaran, getJadwalPelajaran } from "@/app/api/infoSekolah";
import { FaUpload } from "react-icons/fa";

function JadwalFileInput({kelasString, loading, setLoading, setKelas, kelas, createUploadHandler}: any){
    return(
        <Spin spinning={loading} tip="Mengupload Jadwal..." className="font-bold">
                <div className="flex flex-col gap-4">
                    <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">{kelasString.replace('_', ' ')}</label>
                    <Space.Compact className="w-auto flex flex-col items-center mb-3">
                        <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`jadwal-input${kelasString}`}>Upload Jadwal Pelajaran <FaUpload /></label>
                        <input         
                            id={`jadwal-input${kelasString}`}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={createUploadHandler(setKelas, setLoading ,kelasString)}
                        />
                        {kelas && (
                            <div className="relative w-48 h-48 border rounded overflow-hidden">
                                <Image
                                    src={kelas}
                                    alt={kelasString}
                                    width={250}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </Space.Compact>
                </div>
            </Spin>
    )
}
export default function JadwalPelajaranTab(){
    const [kelas_7, setKelas_7] = useState<any>();
    const [kelas_8, setKelas_8] = useState<any>();
    const [kelas_9, setKelas_9] = useState<any>();
    const [kelas_10, setKelas_10] = useState<any>();
    const [kelas_11, setKelas_11] = useState<any>();
    const [kelas_12, setKelas_12] = useState<any>();

    const [loading_7, setLoading_7] = useState<boolean>(false);
    const [loading_8, setLoading_8] = useState<boolean>(false);
    const [loading_9, setLoading_9] = useState<boolean>(false);
    const [loading_10, setLoading_10] = useState<boolean>(false);
    const [loading_11, setLoading_11] = useState<boolean>(false);
    const [loading_12, setLoading_12] = useState<boolean>(false);

    const createUploadHandler = (setFileState: (val: string | null) => void, setLoading: any ,kelas: string) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true)
            const file = e.target.files?.[0];
            
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async() => {
                    // 2. Call the dynamic setter passed in arguments
                    setFileState(reader.result as string);
                    const {status} = await editOrPostJadwalPelajaran(kelas, reader.result as string)
                    if(status){
                        messageApi.success("berhasil mengedit jadwal pelajaran!")
                    }else{
                        messageApi.error("gagal mengedit jadwal pelajaran!")
                    }
                    setLoading(false);
                };
                reader.readAsDataURL(file);
            } else {
                setFileState(null);
            }
        };
    };

    async function handleGetJadwal(){
        const data = await getJadwalPelajaran()
        setKelas_7(data?.kelas_7?.jadwal)
        setKelas_8(data?.kelas_8?.jadwal)
        setKelas_9(data?.kelas_9?.jadwal)
        setKelas_10(data?.kelas_10?.jadwal)
        setKelas_11(data?.kelas_11?.jadwal)
        setKelas_12(data?.kelas_12?.jadwal)
    }

    useEffect(() => {
        handleGetJadwal()
    }, [])

    return(
        <>
        <h1 className="text-xl mb-4">Jadwal Pelajaran</h1>
        <div className="h-[60vh] flex gap-5 overflow-x-auto p-4" data-aos="fade-left">
            <JadwalFileInput 
                kelas={kelas_7} 
                setKelas={setKelas_7}
                kelasString="kelas_7" 
                loading={loading_7} 
                setLoading={setLoading_7} 
                createUploadHandler={createUploadHandler}
            />

            <JadwalFileInput 
                kelas={kelas_8} 
                setKelas={setKelas_8}
                kelasString="kelas_8" 
                loading={loading_8} 
                setLoading={setLoading_8} 
                createUploadHandler={createUploadHandler}
            />

            <JadwalFileInput 
                kelas={kelas_9} 
                setKelas={setKelas_9}
                kelasString="kelas_9" 
                loading={loading_9} 
                setLoading={setLoading_9} 
                createUploadHandler={createUploadHandler}
            />

            <JadwalFileInput 
                kelas={kelas_10} 
                setKelas={setKelas_10}
                kelasString="kelas_10" 
                loading={loading_10} 
                setLoading={setLoading_10} 
                createUploadHandler={createUploadHandler}
            />

            <JadwalFileInput 
                kelas={kelas_11} 
                setKelas={setKelas_11}
                kelasString="kelas_11" 
                loading={loading_11} 
                setLoading={setLoading_11} 
                createUploadHandler={createUploadHandler}
            />

            <JadwalFileInput 
                kelas={kelas_12} 
                setKelas={setKelas_12}
                kelasString="kelas_12" 
                loading={loading_12} 
                setLoading={setLoading_12} 
                createUploadHandler={createUploadHandler}
            />
        </div>
        </>
    )
}