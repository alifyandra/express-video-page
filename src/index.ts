import express, { Express, Request, Response } from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase.config.js";
import { getStorage, ref, uploadString } from "firebase/storage";
import handleUpload from "./services/handleUpload.js";
import multer from "multer";
import sequelize from "./models/index.js";

const app: Express = express();
const port = 8080;
const upload = multer({ dest: "uploads/" });

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

app.use(cors());
app.use(express.json());

const db = sequelize;
db.sync()
  .then(() => console.log("Synced DB"))
  .catch((err) => console.error("Failed to sync with DB", err));

// db.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // console.log(req.file);
    console.log(req.body);
    const username = req.body["username"];

    res.send(await handleUpload(req.file, storage, username));
  }
);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
