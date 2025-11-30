"use server";
import { supabase } from "@/app/api/_db/db";
import { saveBase64Image } from "../helpers/uploadFiles";
import deleteFile from "../helpers/deleteFile";

export async function getMuridMa() {
    // MySQL: SELECT * FROM murid_ma ORDER BY tanggal_daftar DESC
    const { data, error } = await supabase
        .from("murid_ma")
        .select("*")
        .order("tanggal_daftar", { ascending: false });

    if (error) {
        console.error("Error fetching students:", error);
        return [];
    }
    
    return data;
}

export async function updateStatusMuridMa(id: string, status: boolean) {
    try {
        // MySQL: UPDATE murid_ma SET terdaftar = ? WHERE id = ?
        // Postgres: We chain .select() to see if a row was actually found and updated
        const { data, error } = await supabase
            .from("murid_ma")
            .update({ terdaftar: status })
            .eq("id", id)
            .select(); // <--- Important: Returns the updated row so we can check if it existed

        if (error) throw error;

        // If data is empty, it means no ID matched
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

export async function postMuridMa(data: {
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
        // Postgres: .insert([{ key: value }])
        const { error } = await supabase
            .from("murid_ma")
            .insert([{
                nama: data.nama,
                kelas: data.kelas,
                nisn: data.nisn,
                nomor_hp: data.nomorHp, // Mapped to snake_case column
                foto_murid: publicPathFoto, // Mapped to snake_case column
                bukti_pembayaran: publicPathBukti // Mapped to snake_case column
                // 'terdaftar' defaults to FALSE via DB definition
                // 'tanggal_daftar' defaults to NOW() via DB definition
            }]);

        if (error) throw error;

        return { success: true, message: "Successfully inserted data" };
    } catch (error: any) {
        console.error("Database insert failed:", error);
        return { success: false, error: "Failed to insert data" };
    }
}

export async function searchMuridMa(search: string) {
    // MySQL: ... WHERE nama LIKE %?% OR nisn LIKE %?%
    // Postgres: .or() syntax with ilike (Case Insensitive Like)
    
    // Note: The syntax inside .or() is specific to Supabase: "column.operator.value, column.operator.value"
    const { data, error } = await supabase
        .from("murid_ma")
        .select("*")
        .or(`nama.ilike.%${search}%,nisn.ilike.%${search}%`);

    if (error) {
        console.error("Search failed:", error);
        return [];
    }

    return data;
}


// --- DELETE FUNCTION FOR MA ---
export async function deleteMuridMa(id: string) {
    try {
        // 1. Delete the row and SELECT the deleted data in one step
        const { data, error } = await supabase
            .from("murid_ma")
            .delete()
            .eq("id", id)
            .select(); // <--- Crucial: returns the deleted row(s)

        if (error) throw error;

        // 2. Check if a row was actually deleted
        if (!data || data.length === 0) {
            console.warn(`Delete failed: No student found with ID ${id}`);
            return { success: false, message: "ID not found" };
        }

        // 3. Clean up files from the server
        const deletedStudent = data[0]; // We know there is only 1 result due to ID
        deleteFile(deletedStudent.foto_murid);
        deleteFile(deletedStudent.bukti_pembayaran);

        return { success: true, message: "Student and files deleted successfully" };

    } catch (error: any) {
        console.error("Database Delete Error:", error);
        return { success: false, error: error.message };
    }
}