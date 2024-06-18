import {
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import fs from "fs";
import Upload from "../../models/upload.js";

export default (
  file: Express.Multer.File | undefined,
  storage: FirebaseStorage,
  username: string,
  userId: string
) => {
  return new Promise<string>(async (resolve, reject) => {
    if (!file) {
      return reject("No image file");
    }
    const newFileName = `${username}/${file!.originalname}`;

    if (
      await Upload.findOne({
        where: { ownerId: userId, title: file.originalname },
      })
    ) {
      return reject(400);
    }

    fs.readFile(file?.path!, (err, data) => {
      if (err) {
        console.error(err);
        return reject();
      }

      const storageRef = ref(storage, `uploads/${newFileName}`);

      uploadBytes(storageRef, data, { contentType: file?.mimetype })
        .then(async (snap) => {
          try {
            const downloadUrl: string = await getDownloadURL(snap.ref);
            // console.log(downloadUrl);
            if (!downloadUrl) {
              reject();
            }
            await Upload.create({
              title: file.originalname,
              url: downloadUrl,
              owner: username,
              ownerId: userId,
              size: file.size,
            });

            resolve(downloadUrl);
          } catch (err) {
            reject(err);
          }
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
