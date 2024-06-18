import Upload from "../../models/upload.js";

const getAllUploads = () => {
  return new Promise<Upload[]>((resolve, reject) => {
    try {
      Upload.findAll({ attributes: ["title", "url", "owner"] }).then(
        (uploads) => resolve(uploads)
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export default getAllUploads;
