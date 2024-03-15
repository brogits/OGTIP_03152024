import { listAll } from "firebase/storage";
import { addDoc, busboy, collection, db, fs, getDocs, orderBy, os, path, query, ref, storage, uploadBytes, UUID } from "./base.service";
import { IFileInfo, IVideo, IApiResult } from "./video.model";
import * as dotenv from 'dotenv';

const express = require('express');
const ffmpeg = require('fluent-ffmpeg');

dotenv.config();

export const videoRouter = express.Router();

videoRouter.post("/post-video", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'multipart/form-data; boundary=something')

    const bb = busboy({ headers: req.headers });
    const model = {
        file: {} as IFileInfo,
        data: {} as IVideo,
    }

    bb.on('file', (name, file, info) => {
        const { filename, mimeType } = info;
        const filePath = path.join(os.tmpdir(), filename);
        file.pipe(fs.createWriteStream(filePath));
        model.file = { filePath, mimeType, filename, file };
    });

    bb.on('field', (name, value, info) => {
        model.data[name] = value;
    });

    bb.on('finish', async () => {
        const storageImagePath = `/video-gram/${model.file.filename}`
        const storageRef = ref(storage, storageImagePath);
        const file = await readImage(model.file.filePath);
        const uid = UUID();
        await uploadBytes(storageRef, file, {
            contentType: model.file.mimeType,
            md5Hash: uid,
        }).then(async (snapshot) => {
            debugger
            const rs = snapshot.metadata;
            model.data.videoUrl = `${process.env.FBFS_STORAGE_URL}/${rs.bucket}/o${encodeURIComponent(storageImagePath)}?alt=media&token=${uid}`;

            const result = await addDoc(collection(db, '/Video-Gram/'), model.data);
            res.send({ success: true, message: 'ok', value: model.data });

        }).catch((error) => {
            res.send({ success: false, message: error.message, value: error })
        });
    });

    req.pipe(bb);
});

videoRouter.get("/videos", async (req, res) => {
    let posts = [];
    
    const qrysnap = (await getDocs(collection(db, '/Video-Gram/')));

    const result = qrysnap.docs.flatMap((d) => { return d.data() })
    
    if (result.length > 0) {
        posts = posts.concat(result);
    }

    res.send({
        success: true,
        value: posts
    })
})



const readImage = (filePath: string): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(toArrayBuffer(data));
            }
        });
    });
}

const toArrayBuffer = (buffer: Buffer): ArrayBuffer => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
}
