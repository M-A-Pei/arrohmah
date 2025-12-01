import { supabase } from '../api/_db/db';
import { randomUUID } from 'crypto';

// CHANGE THIS to match whatever you named your bucket in the Supabase Dashboard
const BUCKET_NAME = 'app-storage'; 

/**
 * Decodes a base64 string and uploads it to Supabase Storage.
 * Returns the full Public URL (e.g., "https://xyz.supabase.co/.../folder/image.jpg").
 */
export const saveBase64Image = async (base64String: string, folderName: string) => {
    try {
        // Safety check
        if (!base64String || typeof base64String !== 'string') {
            return null;
        }

        // 1. Validate and parse regex
        const match = base64String.match(/^data:(.+);base64,(.*)$/);

        if (!match) {
            throw new Error(`Invalid image format provided for ${folderName}`);
        }

        const mimeType = match[1];      // e.g. "image/png"
        const base64Data = match[2];    // The actual binary data string

        // 2. Generate Filename & Path
        // We do NOT need to run mkdir. Supabase handles virtual folders automatically.
        let extension = mimeType.split("/")[1] || "png";
        if (extension === 'jpeg') extension = 'jpg';

        const fileName = `${randomUUID()}.${extension}`;
        
        // This creates the "folder" structure inside the bucket
        const filePath = `${folderName}/${fileName}`; 

        // 3. Convert to Buffer
        const buffer = Buffer.from(base64Data, "base64");

        // 4. Upload to Supabase
        const { error: uploadError } = await supabase
            .storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: mimeType,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        // 5. Get Public URL
        const { data } = supabase
            .storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        // Returns: https://[project-id].supabase.co/storage/v1/object/public/uploads/folderName/uuid.jpg
        return data.publicUrl;

    } catch (e: any) {
        console.error("Upload failed:", e.message);
        throw e;
    }
};