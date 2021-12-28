import { randomBytes } from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callbakc) => {
                    const fileHash = randomBytes(16).toString("hex");
                    const filename = `${fileHash}-${file.originalname}`;
                    return callbakc(null, filename);
                },
            }),
        };
    },
};
