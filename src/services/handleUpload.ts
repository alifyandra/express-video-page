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

      const storageRef = ref(storage, `uploads/${newFileName}`);

      uploadBytes(storageRef, data, { contentType: file?.mimetype })
        .then(async (snap) => {
          const downloadUrl: string = await getDownloadURL(snap.ref);
          // console.log(downloadUrl);
          resolve(downloadUrl);
        })
        .catch((err) => {
          console.log(err);
          reject();
        })
        .finally(() => {
          console.log("Removing " + file?.path);
          fs.unlink(file?.path!, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
    });
  });
};
