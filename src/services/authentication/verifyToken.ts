import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env["JWT_KEY"]!);
    req.params["userId"] = (<any>decoded).userId;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export default verifyToken;
