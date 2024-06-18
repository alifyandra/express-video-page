import {
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import fs from "fs";

export default (
  file: Express.Multer.File | undefined,
  storage: FirebaseStorage,
  username: string
) => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      return reject("No image file");
    }
    const newFileName = `${username}/${file!.originalname}`;

    fs.readFile(file?.path!, (err, data) => {
      if (err) {
        console.error(err);
        return reject();
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
