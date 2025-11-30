import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { error } from 'console';

/**
 * Decodes a base64 string and saves it to the public folder.
 * Returns the public URL path (e.g., "/folder/image.jpg").
 */
export const saveBase64Image = async (base64String: string, folderName: string) => {
    try{
        // Safety check: if no string provided, return null (or throw error depending on logic)
        if (!base64String || typeof base64String !== 'string') {
            return null;
        }
    
        // 1. Validate and parse regex
        // Matches: data:image/png;base64,iVBOR...
        const match = base64String.match(/^data:(.+);base64,(.*)$/);
        
        if (!match) {
            throw new Error(`Invalid image format provided for ${folderName}`);
        }
    
        const mimeType = match[1];      // e.g. "image/png"
        const base64Data = match[2];    // The actual binary data string
    
        // 2. Ensure the directory exists
        const uploadDir = path.join(process.cwd(), "public", folderName);
        await fs.promises.mkdir(uploadDir, { recursive: true });
    
        // 3. Generate Filename
        // Simple trick: split by '/' to get 'png', 'jpeg', etc.
        let extension = mimeType.split("/")[1] || "png";
        
        // Optional: standardize jpeg to jpg if you prefer
        if (extension === 'jpeg') extension = 'jpg';
    
        const fileName = `${randomUUID()}.${extension}`;
        const filePath = path.join(uploadDir, fileName);
    
        // 4. Write the file
        const buffer = Buffer.from(base64Data, "base64");
        await fs.promises.writeFile(filePath, buffer);
    
        // 5. Return the relative path for the DB
        return `/${folderName}/${fileName}`;
    }catch(e: any){
        throw e
    }
};