import { editOrPostKalenderAkademik, getKalenderAkademik } from "@/app/api/infoSekolah";
import { messageApi } from "@/app/ClientLayout";
import { Space, Spin, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function kalenderAkademikTab(){

    const [kalenderMts, setKalenderMts] = useState<any>();
    const [kalenderMa, setKalenderMa] = useState<any>();
    const [loadingMts, setLoadingMts] = useState<boolean>(false);
    const [loadingMa, setLoadingMa] = useState<boolean>(false);

    const handleFileChangeMts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMts(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setKalenderMts(reader.result as string);
            const {status} = await editOrPostKalenderAkademik("mts", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMts(false);
        };
        reader.readAsDataURL(file);
        } else {
            setKalenderMts(null);
        }
    };

    const handleFileChangeMa = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMa(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setKalenderMa(reader.result as string);
            const {status} = await editOrPostKalenderAkademik("ma", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMa(false);
        };
        reader.readAsDataURL(file);
        } else {
            setKalenderMa(null);
        }
    };

    async function handleGetKalender(){
        const data = await getKalenderAkademik()
        setKalenderMts(data?.mts?.kalender)
        setKalenderMa(data?.ma?.kalender)
    }

    useEffect(() => {
        handleGetKalender()
    }, [])
    return(
        <div>
            <h1 className="text-lg">Kalender Akademik</h1>
            <div className="h-[60vh] flex gap-7 p-4 overflow-x-auto">
                <div className="flex flex-col gap-5">
                    <Spin spinning={loadingMts} tip="Mengupload Jadwal..." className="font-bold">
                        <div className="flex flex-col gap-4">
                            <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">MTS</label>
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`kalender-input-mts`}>Upload Kalender Akademik<FaUpload /></label>
                            <input         
                                id={`kalender-input-mts`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMts}
                            />
                            {kalenderMts && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={kalenderMts}
                                        alt="kalender"
                                        width={250}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </Spin>
                </div>

                <div className="flex flex-col gap-5">
                    <Spin spinning={loadingMa} tip="Mengupload Jadwal..." className="font-bold">
                        <div className="flex flex-col gap-4">
                            <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">MA</label>
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`kalender-input-ma`}>Upload Kalender Akademik<FaUpload /></label>
                            <input         
                                id={`kalender-input-ma`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMa}
                            />
                            {kalenderMa && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={kalenderMa}
                                        alt="kalender"
                                        width={250}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </Spin>
                </div>
            </div>
        </div> 
    )
}