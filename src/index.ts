import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = 8080;

app.use(cors());

app.post("/upload", (req: Request, res: Response) => {
  res.send("Received");
  console.log("Received");
});

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
