import { Client } from "minio"
import { MINIO_KEY, MINIO_SECRET } from "./config";

export const minio = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: MINIO_KEY,
    secretKey: MINIO_SECRET
});
