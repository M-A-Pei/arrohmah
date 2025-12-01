import { supabase } from "../api/_db/db";

// MUST match the bucket name you used in the upload function
const BUCKET_NAME = 'app-storage'; 

export default async function deleteFile(filePath: string) {
    if (!filePath) return;

    try {
        let cleanPath = filePath;

        // logic to handle different path formats stored in your DB:

        // Case A: It's a full Supabase URL (New uploads)
        // Format: https://[ref].supabase.co/storage/v1/object/public/uploads/folder/image.jpg
        if (filePath.startsWith('http')) {
            const urlObj = new URL(filePath);
            // We need to extract everything AFTER the bucket name
            // split gives us [".../public/", "folder/image.jpg"]
            const parts = urlObj.pathname.split(`/${BUCKET_NAME}/`);
            if (parts.length === 2) {
                cleanPath = parts[1]; // This is "folder/image.jpg"
            }
            
            // Note: If you have weird custom domains, URL parsing might need adjustment,
            // but this covers 99% of Supabase setups.
        }

        // Case B: It's an old local path (Old uploads)
        // Format: /buktiPembayaran/image.jpg
        // Supabase storage paths should NOT start with a slash.
        else if (filePath.startsWith('/')) {
            cleanPath = filePath.substring(1); // Remove the leading slash
        }

        // Now cleanPath should be exactly: "folder/filename.jpg"

        // Perform the delete
        // Note: .remove() expects an array of file paths
        const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .remove([cleanPath]);

        if (error) {
            console.error('Supabase Delete Error:', error);
            // We throw here so the calling function knows it failed
            throw error;
        }

        console.log(`Successfully deleted: ${cleanPath}`);

    } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
    }
};