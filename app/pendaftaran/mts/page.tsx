"use client"
import { postMuridMts } from "@/app/api/muridMts"
import { useState, useEffect } from "react"
import { Modal, Steps, Button } from "antd";
import { FaUpload } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { messageApi } from "@/app/ClientLayout";
import Image from "next/image";
import { getSpp } from "@/app/api/infoSekolah";
import {Image as AntdImage} from 'antd';

export default function pendaftaranMts() {
    const [nama, setNama] = useState("")
    const [noHp, setNoHp] = useState("")
    const [nisn, setNisn] = useState("")
    const [kelas, setKelas] = useState("")
    const [buktiPembayaran, setBuktiPembayaran] = useState<string | null>(null);
    const [fotoMurid, setFotoMurid] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [spp, setSpp] = useState<any>()

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setBuktiPembayaran(reader.result as string);
        };
        reader.readAsDataURL(file);
        } else {
        setBuktiPembayaran(null);
        }
    };

    const handleFileChangeFotoMurid = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoMurid(reader.result as string);
        };
        reader.readAsDataURL(file);
        } else {
        setFotoMurid(null);
        }
    };

    async function handleGetSpp(){
        const data = await getSpp()
        setSpp(data)
    }

    async function handleSubmit(){
        if(!nama){
            messageApi.error("jangan lupa isi nama!");
            return;
        }else if(!nisn){
            messageApi.error("jangan lupa isi nisn!");
            return;
        }else if(!kelas){
            messageApi.error("jangan lupa pilih kelas!");
            return;
        }else if(!fotoMurid){
            messageApi.error("jangan lupa foto murid!");
            return;
        }else if(!noHp){
            messageApi.error("jangan lupa isi no handphone!");
            return;
        }else if(!buktiPembayaran){
            messageApi.error("jangan lupa kirim bukti pembayaran!");
            return;
        }
        const result = await postMuridMts({
            nama, kelas, nisn,
            nomorHp : noHp,
            fotoMurid: fotoMurid || "" ,
            buktiPembayaran: buktiPembayaran || ""})
        if(result.success){
            messageApi.success("anda telah berhasil mendaftarkan diri!");
            setNama("")
            setNoHp("")
            setKelas("")
            setNisn("")
            setFotoMurid(null)
            setBuktiPembayaran(null)
            setOpenModal(false)
            setOpenSuccessModal(true)
        }else{
            messageApi.error("gagal menginput data, mohon coba lagi!");
        }
    }

    function handleOpenModal(){
        if(!nama){
            messageApi.error("jangan lupa isi nama!");
        }else if(!nisn){
            messageApi.error("jangan lupa isi nisn!");
        }else if(!kelas){
            messageApi.error("jangan lupa pilih kelas!");
        }else if(!fotoMurid){
            messageApi.error("jangan lupa foto murid!");
        }else if(!noHp){
            messageApi.error("jangan lupa isi no handphone!");
        }else{
            setOpenModal(true)
        }
    }

    const steps = [
    {
      title: "Cek Ulang",
      content: <div className="p-4 bg-blue-50 rounded-lg outline-2">
                    <div className="flex gap-3">
                        <div className="w-[100px] h-[100px] rounded-xl overflow-hidden">
                            <img
                                src={fotoMurid || ""}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2">
                                <b className="w-20">Nama</b><span className="font-normal">: {nama}</span>
                            </div>
                            <div className="flex gap-2">
                                <b className="w-20">Telephone</b><span className="font-normal">: {noHp}</span>
                            </div>
                            <div className="flex gap-2">
                                <b className="w-20">NISN</b><span className="font-normal">: {nisn}</span>
                            </div>
                            <b>Kelas {kelas}</b>
                        </div>
                    </div>
               </div>,
    },
    {
      title: "Informasi",
      content: <div className="p-4 bg-blue-100 rounded flex flex-col gap-5">
                    <p>Setelah memastikan data, silahkan pilih gelombang sesuai dengan tanggal pendaftaran dibawah:</p>
                    {spp?.mts?.image ? <AntdImage src={spp?.mts?.image} height={200} className='rounded'/> : "belum ada gelombang"}

                    <p>untuk informasi lebih lanjut, silahkan menghubungi <FaWhatsapp className="text-green-500 text-lg inline"/> 089697494550 atau langsung datang ke tempat:</p>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d562.6412627453974!2d106.42087771932037!3d-6.2656864395388485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e420536c0268ceb%3A0x4718029ff685646!2sMA%20ARROHMAH%20CISOKA!5e1!3m2!1sid!2sid!4v1764041757373!5m2!1sid!2sid" width="100%" style={{"border" : 0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
               </div>
    },
    {
      title: "Pembayaran",
      content:  <div className="flex flex-col gap-4">
                    {/* <div className="flex gap-2 items-center bg-blue-100 p-2 rounded-lg h-10">
                        <Image src="/img/logo/bca.png" width={50} height={50} alt="bca logo"/>
                        <b>283193819123129</b>
                    </div> */}
                    {/* <div className="flex gap-2 items-center bg-blue-100 p-2 rounded-lg h-10">
                        <Image src="/img/logo/bni.png" width={50} height={50} alt="bni logo"/>
                        <b>212312311238129</b>
                    </div> */}
                    <div className="bg-blue-100 p-2 rounded-lg h-10">
                        <a href="/documents/caraPembayaranDana.pdf" target="_blank" className="flex gap-2 items-center">
                            <Image src="/img/logo/dana.png" width={50} height={50} alt="dana logo"/>
                            <span className="text-black">089697494550 (Roman jazil)</span>
                        </a>
                    </div>

                    <label className="rounded-lg p-1 px-3 border border-blue-300 w-fit flex gap-2 items-center" htmlFor="bukti-pembayaran">Upload Bukti Pembayaran <FaUpload/></label>
                    <input         
                        id="bukti-pembayaran"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                    {buktiPembayaran && (
                        <div className="relative w-48 h-48 border rounded overflow-hidden">
                            <img
                                src={buktiPembayaran}
                                alt="buktiPembayaran"
                                className="object-cover w-full h-full"
                            />
                            <button
                                onClick={() => setBuktiPembayaran(null)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs hover:bg-red-600"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>,
    },
  ];

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        handleGetSpp()
    }, []);
    if (!mounted) return null;

    return (
        <div className="bg-[url('/img/gedung/gedung_4.jpg')] bg-cover bg-center flex w-full h-screen justify-center items-center">
            <div className="absolute inset-0 bg-green-400/50 h-screen" />

            <Modal
                title="pendaftaran berhasil!"
                open={openSuccessModal}
                onCancel={() => setOpenSuccessModal(false)}
                maskClosable={false}
                footer={null}
            >
                <div className="flex justify-center items-center flex-col gap-3">
                    <IoIosCheckmarkCircleOutline className="text-green-400 text-[80px]"/>
                    <h2 className="text-xl">Selamat Datang Ke Ar-rahmah!</h2>
                    <p className="text-gray-500 text-sm w-full">untuk jadwal masuk dan mata pelajaran akan segera di kirim ke WA anda</p>
                    <p className="text-gray-500 text-sm block">jika setelah 1 minggu tetap belum ada pesan dari kami, silahkan hubungi <span className="whitespace-nowrap"><FaWhatsapp className="text-green-500 text-lg inline"/> 085710405170</span> atau langsung datang ke tempat kami</p>
                    <p className="text-gray-500 text-sm">Jl. Pendidikan No. 123, Malang</p>

                    <p className="text-sm">kami menantikan dengan anda di sekolah!</p>
                </div>
            </Modal>
            <Modal
                title="Proses Pendaftaran"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
            >
                <Steps current={currentSlide} items={steps.map(s => ({ title: s.title }))} />

                <div className="mt-8">{steps[currentSlide].content}</div>

                <div className="flex justify-between mt-10">
                    {/* Back button */}
                    {currentSlide > 0 ? (
                    <Button onClick={() => setCurrentSlide(currentSlide - 1)}>Back</Button>
                    ) : (
                    <div />
                    )}

                    {/* Next / Finish */}
                    {currentSlide < steps.length - 1 ? (
                    <Button type="primary" onClick={() => setCurrentSlide(currentSlide + 1)}>
                        Next
                    </Button>
                    ) : (
                    <Button type="primary" onClick={handleSubmit}>
                        Finish
                    </Button>
                    )}
                </div>
            </Modal>
            <div className="bg-black/80 w-100 h-120 mt-20 rounded-xl flex flex-col gap-3 p-4 z-40 outline-2 bg-[url('/img/logo/logo.png')] bg-no-repeat bg-center">
                <h2 className="text-4xl text-white text-center w-full">Pendaftaran MTS</h2>
                <input type="text" value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama" className="rounded bg-white text-gray-500 px-2 opacity-75"/>
                <input type="text" value={noHp} onChange={e => setNoHp(e.target.value)} placeholder="Nomor Handphone" className="rounded bg-white text-gray-500 px-2 opacity-75"/>
                <input type="text" value={nisn} onChange={e => setNisn(e.target.value)} placeholder="NISN" className="rounded bg-white text-gray-500 px-2 opacity-75"/>
                <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="rounded bg-white text-gray-500 px-2 opacity-75 py-1"
                    >
                    <option value="" disabled>Pilih Kelas</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                </select>
                <label className="rounded-lg p-1 px-3 bg-white text-gray-500 w-fit flex gap-2 items-center opacity-75" htmlFor="foto-murid">Photo Murid<FaUpload/></label>
                <input         
                    id="foto-murid"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChangeFotoMurid}
                />
                {fotoMurid && (
                    <div className="relative w-48 h-48 border rounded overflow-hidden">
                        <img
                            src={fotoMurid}
                            alt="foto Murid"
                            className="object-cover w-full h-full"
                        />
                        <button
                            onClick={() => setFotoMurid(null)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full opacity-75 text-xs hover:bg-red-600"
                        >
                            ✕
                        </button>
                    </div>
                )}
                <button className="rounded p-2 bg-white text-gray-400 mt-auto" onClick={handleOpenModal}>Kirim Data</button>
            </div>
        </div>
    )
}