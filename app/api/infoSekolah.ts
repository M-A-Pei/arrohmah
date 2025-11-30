"use server";
import { supabase } from "@/app/api/_db/db";
import fs from "fs";
import path from "path";
import { saveBase64Image } from "../helpers/uploadFiles";

export const getJumlahMuridData = async () => {
  // 1. Fetch rows from Supabase
  const { data: rows, error } = await supabase
    .from("jumlah_murid")
    .select("id, kelas, jumlah, tanggal");

  if (error) {
    console.error("Supabase error:", error);
    return {};
  }

  // 2. Convert into your formatted object
  const formattedData = rows.reduce((acc: any, row: any) => {
    const year = row.tanggal
      ? new Date(row.tanggal).getFullYear()
      : null;

    acc[row.kelas] = {
      id: row.id,
      jumlah: row.jumlah,
      tanggal: year,
    };

    return acc;
  }, {});

  return formattedData;
};

export const editOrPostJumlahMuridData = async (kelas: string, jumlah: number) => {
  try {
    const { error } = await supabase
      .from("jumlah_murid")
      .upsert(
        [
          {
            kelas: kelas,
            jumlah: jumlah,
            tanggal: new Date(), // if your old DB stores date automatically, keep this
          }
        ],
        { onConflict: "kelas" } // same as MySQL ON DUPLICATE KEY
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return { status: false };
    }

    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false };
  }
};

export const getJadwalPelajaran = async () => {
  // 1. Fetch rows from Supabase
  const { data: rows, error } = await supabase
    .from("jadwal_pelajaran")
    .select("id, kelas, image, tanggal");

  if (error) {
    console.error("Supabase error:", error);
    return {};
  }

  // 2. Convert into your desired object structure
  const formattedData = rows.reduce((acc: any, row: any) => {
    const tanggal = row.tanggal
      ? new Date(row.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null;

    acc[row.kelas] = {
      id: row.id,
      jadwal: row.image,
      tanggal,
    };

    return acc;
  }, {});

  return formattedData;
};

export const editOrPostJadwalPelajaran = async (kelas: string, image: string) => {
  try {
    // 1. Check if the row exists (Postgres style)
    const { data: existingRows, error: selectError } = await supabase
      .from("jadwal_pelajaran")
      .select("image")
      .eq("kelas", kelas)
      .maybeSingle();

    if (selectError) throw selectError;

    const oldImagePath = existingRows?.image ?? null;

    // 2. Save new image locally
    const publicPath = await saveBase64Image(image, `jadwalPelajaran${kelas}`);

    // 3. Upsert into Supabase
    const { error: upsertError } = await supabase
      .from("jadwal_pelajaran")
      .upsert([{
        kelas,
        image: publicPath,
        tanggal: new Date(),
      }], { onConflict: "kelas" });

    if (upsertError) throw upsertError;

    // 4. Delete old image if exists and different
    if (oldImagePath && oldImagePath !== publicPath) {
      const systemPathToDelete = path.join(process.cwd(), "public", oldImagePath);

      try {
        if (fs.existsSync(systemPathToDelete)) {
          fs.unlinkSync(systemPathToDelete);
          console.log("Deleted old image:", systemPathToDelete);
        }
      } catch (err) {
        console.error("Failed to delete old image:", err);
      }
    }

    return { status: true };
  } catch (e) {
    console.error(e);
    return { status: false };
  }
};

export const getKalenderAkademik = async () => {
    const { data, error } = await supabase
        .from("kalender_akademik")
        .select("id, image, tahun, tingkat");

    if (error) return {};

    const formattedData = data.reduce((acc: any, row: any) => {
        const tahun = new Date(row.tahun).getFullYear();

        acc[row.tingkat] = {
            id: row.id,
            kalender: row.image,
            tahun,
        };

        return acc;
    }, {});

    return formattedData;
};

export const editOrPostKalenderAkademik = async (tingkat: string, image: string) => {
    try {
        const { data: existingRows } = await supabase
            .from("kalender_akademik")
            .select("image")
            .eq("tingkat", tingkat)
            .single();

        const oldImageParams = existingRows?.image ?? null;

        const publicPath = await saveBase64Image(image, `kalenderAkademik${tingkat}`);

        const { error } = await supabase
            .from("kalender_akademik")
            .upsert([{
                tingkat,
                image: publicPath,
                tahun: new Date().toISOString(),
            }], { onConflict: "tingkat" });

        if (error) return { status: false };

        if (oldImageParams && oldImageParams !== publicPath) {
            const systemPathToDelete = path.join(process.cwd(), "public", oldImageParams);

            try {
                if (fs.existsSync(systemPathToDelete)) {
                    fs.unlinkSync(systemPathToDelete);
                }
            } catch (err) {
                console.error("Error deleting old image:", err);
            }
        }

        return { status: true };
    } catch (err) {
        console.error(err);
        return { status: false };
    }
};

export const getUts = async () => {
    const { data, error } = await supabase
        .from("uts")
        .select("id, image, tanggal, tingkat");

    if (error) return {};

    const formattedData = data.reduce((acc: any, row: any) => {
        const tanggal = new Date(row.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        acc[row.tingkat] = {
            id: row.id,
            image: row.image,
            tanggal: tanggal,
        };

        return acc;
    }, {});

    return formattedData;
};

export const editOrPostUts = async (tingkat: string, image: string) => {
    try {
        // 1. Check if row already exists
        const { data: existingRows } = await supabase
            .from("uts")
            .select("image")
            .eq("tingkat", tingkat)
            .single();

        const oldImageParams = existingRows?.image ?? null;

        // 2. Save new image file
        const publicPath = await saveBase64Image(image, `uts${tingkat}`);

        // 3. UPSERT (Postgres equivalent of ON DUPLICATE KEY)
        const { error } = await supabase
            .from("uts")
            .upsert([{
                tingkat,
                image: publicPath,
                tanggal: new Date().toISOString(),
            }], { onConflict: "tingkat" });

        if (error) return { status: false };

        // 4. Delete old file
        if (oldImageParams && oldImageParams !== publicPath) {
            const systemPathToDelete = path.join(process.cwd(), "public", oldImageParams);

            try {
                if (fs.existsSync(systemPathToDelete)) {
                    fs.unlinkSync(systemPathToDelete);
                }
            } catch (err) {
                console.error("Failed to delete old image:", err);
            }
        }

        return { status: true };
    } catch {
        return { status: false };
    }
};

export const getUas = async () => {
    const { data, error } = await supabase
        .from("uas")
        .select("id, image, tanggal, tingkat");

    if (error) return {};

    const formattedData = data.reduce((acc: any, row: any) => {
        const tanggal = new Date(row.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        acc[row.tingkat] = {
            id: row.id,
            image: row.image,
            tanggal,
        };

        return acc;
    }, {});

    return formattedData;
};

export const editOrPostUas = async (tingkat: string, image: string) => {
    try {
        const { data: existingRows } = await supabase
            .from("uas")
            .select("image")
            .eq("tingkat", tingkat)
            .single();

        const oldImageParams = existingRows?.image ?? null;

        const publicPath = await saveBase64Image(image, `uas${tingkat}`);

        const { error } = await supabase
            .from("uas")
            .upsert([{
                tingkat,
                image: publicPath,
                tanggal: new Date().toISOString(),
            }], { onConflict: "tingkat" });

        if (error) return { status: false };

        if (oldImageParams && oldImageParams !== publicPath) {
            const systemPathToDelete = path.join(process.cwd(), "public", oldImageParams);

            try {
                if (fs.existsSync(systemPathToDelete)) {
                    fs.unlinkSync(systemPathToDelete);
                }
            } catch (err) {
                console.error("Failed to delete old image:", err);
            }
        }

        return { status: true };
    } catch {
        return { status: false };
    }
};

export const getSpp = async () => {
    const { data, error } = await supabase
        .from("spp")
        .select("id, image, tahun, tingkat");

    if (error) return {};

    const formattedData = data.reduce((acc: any, row: any) => {
        const tahun = new Date(row.tahun).getFullYear();

        acc[row.tingkat] = {
            id: row.id,
            image: row.image,
            tahun,
        };

        return acc;
    }, {});

    return formattedData;
};

export const editOrPostSpp = async (tingkat: string, image: string) => {
    try {
        const { data: existingRows } = await supabase
            .from("spp")
            .select("image")
            .eq("tingkat", tingkat)
            .single();

        const oldImageParams = existingRows?.image ?? null;

        const publicPath = await saveBase64Image(image, `spp${tingkat}`);

        const { error } = await supabase
            .from("spp")
            .upsert([{
                tingkat,
                image: publicPath,
                tahun: new Date().toISOString(),
            }], { onConflict: "tingkat" });

        if (error) return { status: false };

        if (oldImageParams && oldImageParams !== publicPath) {
            const systemPathToDelete = path.join(process.cwd(), "public", oldImageParams);

            try {
                if (fs.existsSync(systemPathToDelete)) {
                    fs.unlinkSync(systemPathToDelete);
                }
            } catch (err) {
                console.error("Failed to delete old image:", err);
            }
        }

        return { status: true };
    } catch {
        return { status: false };
    }
};