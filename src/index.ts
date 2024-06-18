import express, { Express, Request, Response } from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase.config.js";
import { getStorage, ref, uploadString } from "firebase/storage";
import handleUpload from "./services/uploads/handleUpload.js";
import multer from "multer";
import sequelize from "./models/index.js";
import createUser from "./services/authentication/createUser.js";
import jwt from "jsonwebtoken";
import loginUser from "./services/authentication/loginUser.js";
import verifyToken from "./services/authentication/verifyToken.js";
import getAllUploads from "./services/uploads/getUploads.js";

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
  verifyToken,
  upload.single("file"),
  (req: Request, res: Response) => {
    console.log(req.params);
    const { username } = req.body;
    const { userId } = req.params;

    handleUpload(req.file, storage, username, userId)
      .then((url) => res.status(200).send(url))
      .catch((err) => {
        if (err === 400) {
          res.status(400).send("Duplicate file title");
        } else {
          res.status(500).send("Internal error");
        }
      });
  }
);

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  loginUser(username, password)
    .then((user) => {
      const token = jwt.sign(
        { userId: user.id.toString() },
        process.env["JWT_KEY"]!,
        {
          expiresIn: "30m",
        }
      );

      res.status(200).json({
        success: true,
        token: token,
      });
    })
    .catch((err) => {
      if (err === 401) {
        res.status(401).send("Authentication failed");
      } else {
        res.status(500).send("Internal error");
      }
    });
});

app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;
  createUser(username, password)
    .then((user) => {
      const token = jwt.sign(
        { userId: user.id.toString() },
        process.env["JWT_KEY"]!,
        {
          expiresIn: "30m",
        }
      );
      res.status(200).json({
        success: true,
        token: token,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Username taken");
    });
});

app.get("/uploads", verifyToken, (req, res) => {
  const { all } = req.query;
  if (all) {
    getAllUploads()
      .then((uploads) => {
        res.status(200).json(uploads);
      })
      .catch((err) => res.status(500).send("Internal error"));
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
