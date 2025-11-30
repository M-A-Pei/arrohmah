"use server";
import { supabase } from "@/app/api/_db/db";
import { saveBase64Image } from "../helpers/uploadFiles";
import deleteFile from "../helpers/deleteFile";

export async function getMuridMts() {
    // MySQL: SELECT * FROM murid_mts ORDER BY tanggal_daftar DESC
    const { data, error } = await supabase
        .from("murid_mts")
        .select("*")
        .order("tanggal_daftar", { ascending: false });

    if (error) {
        console.error("Error fetching students:", error);
        return [];
    }
    
    return data;
}

export async function updateStatusMuridMts(id: string, status: boolean) {
    try {
        // MySQL: UPDATE murid_mts SET terdaftar = ? WHERE id = ?
        // We use .select() to retrieve the updated row to confirm the ID existed
        const { data, error } = await supabase
            .from("murid_mts")
            .update({ terdaftar: status })
            .eq("id", id)
            .select();

        if (error) throw error;

        // If data is null or empty array, no row was found/updated
        if (!data || data.length === 0) {
            console.warn(`No student found with ID: ${id}`);
            return { status: false, message: "ID not found" };
        }

        return { status: true };

    } catch (error: any) {
        console.error("Database Error:", error);
        return { status: false, error: error.message };
    }
}

export async function postMuridMts(data: {
    nama: string;
    kelas: string;
    nisn: string;
    nomorHp: string;
    buktiPembayaran: string;
    fotoMurid: string;
}) {
    try {
        const [publicPathBukti, publicPathFoto] = await Promise.all([
            saveBase64Image(data.buktiPembayaran, "buktiPembayaran"),
            saveBase64Image(data.fotoMurid, "fotoMurid")
        ]);

        if (!publicPathBukti) throw new Error("Bukti Pembayaran is missing");
        if (!publicPathFoto) throw new Error("Foto Murid is missing");

        // MySQL: INSERT INTO ... VALUES ...
        const { error } = await supabase
            .from("murid_mts")
            .insert([{
                nama: data.nama,
                kelas: data.kelas,
                nisn: data.nisn,
                nomor_hp: data.nomorHp, // Maps to 'nomor_hp' column
                foto_murid: publicPathFoto, // Maps to 'foto_murid' column
                bukti_pembayaran: publicPathBukti // Maps to 'bukti_pembayaran' column
                // 'terdaftar' defaults to FALSE automatically
                // 'tanggal_daftar' defaults to NOW() automatically
            }]);

        if (error) throw error;

        return { success: true, message: "Successfully inserted data" };
    } catch (error: any) {
        console.error("Database insert failed:", error);
        return { success: false, error: "Failed to insert data" };
    }
}

export async function searchMuridMts(search: string) {
    // MySQL: ... WHERE nama LIKE ... OR nisn LIKE ...
    // Postgres: .or() with ilike (Case Insensitive)
    const { data, error } = await supabase
        .from("murid_mts")
        .select("*")
        .or(`nama.ilike.%${search}%,nisn.ilike.%${search}%`);

    if (error) {
        console.error("Search failed:", error);
        return [];
    }

    return data;
}

// --- DELETE FUNCTION FOR MTS ---
export async function deleteMuridMts(id: string) {
    try {
        // 1. Delete the row and SELECT the deleted data
        const { data, error } = await supabase
            .from("murid_mts")
            .delete()
            .eq("id", id)
            .select();

        if (error) throw error;

        // 2. Check if a row was actually deleted
        if (!data || data.length === 0) {
            console.warn(`Delete failed: No student found with ID ${id}`);
            return { success: false, message: "ID not found" };
        }

        // 3. Clean up files from the server
        const deletedStudent = data[0];
        deleteFile(deletedStudent.foto_murid);
        deleteFile(deletedStudent.bukti_pembayaran);

        return { success: true, message: "Student and files deleted successfully" };

    } catch (error: any) {
        console.error("Database Delete Error:", error);
        return { success: false, error: error.message };
    }
}
