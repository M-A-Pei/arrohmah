import { editOrPostSpp, getSpp } from "@/app/api/infoSekolah";
import { messageApi } from "@/app/ClientLayout";
import { Space, Spin, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function SppTab(){

    const [sppMts, setSppMts] = useState<any>();
    const [sppMa, setSppMa] = useState<any>();
    const [loadingMts, setLoadingMts] = useState<boolean>(false);
    const [loadingMa, setLoadingMa] = useState<boolean>(false);

    const handleFileChangeMts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMts(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setSppMts(reader.result as string);
            const {status} = await editOrPostSpp("mts", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit harga spp!")
            }else{
                messageApi.error("gagal mengedit harga spp!")
            }
            setLoadingMts(false);
        };
        reader.readAsDataURL(file);
        } else {
            setSppMts(null);
        }
    };

    const handleFileChangeMa = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMa(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setSppMa(reader.result as string);
            const {status} = await editOrPostSpp("ma", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMa(false);
        };
        reader.readAsDataURL(file);
        } else {
            setSppMa(null);
        }
    };

    async function handleGetSpp(){
        const data = await getSpp()
        setSppMts(data?.mts?.image)
        setSppMa(data?.ma?.image)
    }

    useEffect(() => {
        handleGetSpp()
    }, [])
    return(
        <div>
            <h1 className="text-lg">Harga SPP</h1>
            <div className="h-[60vh] flex gap-7 p-4 overflow-x-auto">
                <div className="flex flex-col gap-5">
                    <Spin spinning={loadingMts} tip="Mengupload Harga Spp..." className="font-bold">
                        <div className="flex flex-col gap-4">
                            <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">MTS</label>
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`spp-input-mts`}>Upload Harga Spp<FaUpload /></label>
                            <input         
                                id={`spp-input-mts`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMts}
                            />
                            {sppMts && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={sppMts}
                                        alt="spp"
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
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`spp-input-ma`}>Upload Harga Spp<FaUpload /></label>
                            <input         
                                id={`spp-input-ma`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMa}
                            />
                            {sppMa && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={sppMa}
                                        alt="spp"
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