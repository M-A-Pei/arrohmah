import { editOrPostUts, getUts } from "@/app/api/infoSekolah";
import { messageApi } from "@/app/ClientLayout";
import { Space, Spin, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function UtsTab(){

    const [utsMts, setUtsMts] = useState<any>();
    const [utsMa, setUtsMa] = useState<any>();
    const [loadingMts, setLoadingMts] = useState<boolean>(false);
    const [loadingMa, setLoadingMa] = useState<boolean>(false);

    const handleFileChangeMts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMts(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setUtsMts(reader.result as string);
            const {status} = await editOrPostUts("mts", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMts(false);
        };
        reader.readAsDataURL(file);
        } else {
            setUtsMts(null);
        }
    };

    const handleFileChangeMa = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMa(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setUtsMa(reader.result as string);
            const {status} = await editOrPostUts("ma", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMa(false);
        };
        reader.readAsDataURL(file);
        } else {
            setUtsMa(null);
        }
    };

    async function handleGetUts(){
        const data = await getUts()
        setUtsMts(data?.mts?.image)
        setUtsMa(data?.ma?.image)
    }

    useEffect(() => {
        handleGetUts()
    }, [])
    return(
        <div>
            <h1 className="text-lg">Jadwal UTS</h1>
            <div className="h-[60vh] flex gap-7 p-4 overflow-x-auto">
                <div className="flex flex-col gap-5">
                    <Spin spinning={loadingMts} tip="Mengupload Jadwal UTS..." className="font-bold">
                        <div className="flex flex-col gap-4">
                            <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">MTS</label>
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`uts-input-mts`}>Upload Jadwal UTS<FaUpload /></label>
                            <input         
                                id={`uts-input-mts`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMts}
                            />
                            {utsMts && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={utsMts}
                                        alt="Uts"
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
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`Uts-input-ma`}>Upload Uts Akademik<FaUpload /></label>
                            <input         
                                id={`Uts-input-ma`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMa}
                            />
                            {utsMa && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={utsMa}
                                        alt="Uts"
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