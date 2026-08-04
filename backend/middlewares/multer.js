import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend/public/temp (relative to this file, not the process working directory)
const TEMP_DIR = path.resolve(__dirname, "..", "public", "temp");

// Make sure upload directory exists (missing folder causes 500 / ERR_CONNECTION_REFUSED-like behavior on upload)
fs.mkdirSync(TEMP_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
    },
    filename: (req, file, cb) => {
        // Avoid collisions and unsafe characters in filenames
        const safeOriginal = (file.originalname || "file")
            .replace(/[^a-zA-Z0-9._-]/g, "_");
        cb(null, `${Date.now()}-${safeOriginal}`);
    }
})

const upload = multer({ storage });
export default upload;
