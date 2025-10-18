import { Storage } from '@google-cloud/storage';
import { nanoid } from 'nanoid';
import { MissingFile, FailToUploadFile, ExtensionFileNotValid } from '../utils/error/index.js';
import 'dotenv/config.js';

//google storage
const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket(process.env.BUCKET_NAME);
const fileConsentiti = ["jpg", "png", "gif", "jpeg"];

export let upLoad = (required = true) => (req, res, next) => {
    try {


        if (!req.files || Object.keys(req.files).length === 0) {
            return required ? next(new MissingFile()) : next();
        }

        const file = req.files['image'][0]

        if (!fileConsentiti.find((val) => file.mimetype === `image/${val}`)) {
            return next(new ExtensionFileNotValid())
        }

        const blob = bucket.file(nanoid());


        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: { contentType: file.mimetype }
        });

        blobStream.on('error', err => {
            console.log(err);
            return next(new FailToUploadFile());
        });

        blobStream.on('finish', () => {
            req.picUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            next();
        });

        // scrivi il buffer nel bucket
        blobStream.end(file.buffer);



    } catch (err) {
        console.error('Internal error:', err);
        return next(new FailToUploadFile());
    }

}

