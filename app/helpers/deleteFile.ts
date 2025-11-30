import fs from 'fs';
import path from 'path';

export default function deleteFile(filePath: string){
    if (!filePath) return;
    try {
        // Construct absolute path (adjust 'public' based on your folder structure)
        const absolutePath = path.join(process.cwd(), "public", filePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
    } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
    }
};