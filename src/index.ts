import express, { Express, Request, Response } from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase.config.js";
import { getStorage, ref, uploadString } from "firebase/storage";
import handleUpload from "./services/handleUpload.js";
import multer from "multer";

const app: Express = express();
const port = 8080;
const upload = multer({ dest: "uploads/" });

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

app.use(cors());

app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // console.log(req.file);

    res.send(await handleUpload(req.file, storage));
  }
);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
