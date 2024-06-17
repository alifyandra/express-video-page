import {
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import fs from "fs";

export default (
  file: Express.Multer.File | undefined,
  storage: FirebaseStorage
) => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    const newFileName = `${file!.originalname}`;

    fs.readFile(file?.path!, (err, data) => {
      if (err) {
        console.error(err);
        reject();
      }

      console.log(data);

      const storageRef = ref(storage, `uploads/${newFileName}`);
      console.log("created ref");

      uploadBytes(storageRef, data, { contentType: file?.mimetype })
        .then(async (snap) => {
          const downloadUrl: string = await getDownloadURL(snap.ref);
          // console.log(downloadUrl);
          resolve(downloadUrl);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  });
};
