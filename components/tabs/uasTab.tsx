import { editOrPostUas, getUas } from "@/app/api/infoSekolah";
import { messageApi } from "@/app/ClientLayout";
import { Space, Spin, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function UasTab(){

    const [UasMts, setUasMts] = useState<any>();
    const [UasMa, setUasMa] = useState<any>();
    const [loadingMts, setLoadingMts] = useState<boolean>(false);
    const [loadingMa, setLoadingMa] = useState<boolean>(false);

    const handleFileChangeMts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMts(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setUasMts(reader.result as string);
            const {status} = await editOrPostUas("mts", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMts(false);
        };
        reader.readAsDataURL(file);
        } else {
            setUasMts(null);
        }
    };

    const handleFileChangeMa = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingMa(true)
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            setUasMa(reader.result as string);
            const {status} = await editOrPostUas("ma", reader.result as string);
            if(status){
                messageApi.success("berhasil mengedit jadwal pelajaran!")
            }else{
                messageApi.error("gagal mengedit jadwal pelajaran!")
            }
            setLoadingMa(false);
        };
        reader.readAsDataURL(file);
        } else {
            setUasMa(null);
        }
    };

    async function handleGetUas(){
        const data = await getUas()
        setUasMts(data?.mts?.image)
        setUasMa(data?.ma?.image)
    }

    useEffect(() => {
        handleGetUas()
    }, [])
    return(
        <div>
            <h1 className="text-lg">Jadwal UAS</h1>
            <div className="h-[60vh] flex gap-7 p-4 overflow-x-auto">
                <div className="flex flex-col gap-5">
                    <Spin spinning={loadingMts} tip="Mengupload Jadwal Uas..." className="font-bold">
                        <div className="flex flex-col gap-4">
                            <label className="w-20 mr-3 border-b border-black text-center capitalize font-bold">MTS</label>
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`Uas-input-mts`}>Upload Jadwal UAS<FaUpload /></label>
                            <input         
                                id={`Uas-input-mts`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMts}
                            />
                            {UasMts && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={UasMts}
                                        alt="Uas"
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
                            <label className="rounded-lg p-1 px-2 bg-yellow-300 w-60 mb-2 flex gap-2 border border-yellow-900 items-center justify-center" htmlFor={`Uas-input-ma`}>Upload Uas Akademik<FaUpload /></label>
                            <input         
                                id={`Uas-input-ma`}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChangeMa}
                            />
                            {UasMa && (
                                <div className="relative w-48 h-48 border rounded overflow-hidden">
                                    <Image
                                        src={UasMa}
                                        alt="Uas"
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