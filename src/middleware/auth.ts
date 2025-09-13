import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import { verifyToken } from "../services/jwt";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = verifyToken(token) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ status: "error", message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
}
