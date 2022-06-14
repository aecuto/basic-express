import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    console.log("in middleware", decoded);
    next();
  } catch (err) {
    res.status(401).send({ msg: "unauth" });
  }
};
