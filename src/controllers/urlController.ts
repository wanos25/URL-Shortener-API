import { Request, Response } from "express";
import prisma from"../services/prisma";
import { successResponse, errorResponse } from "../utils/response";
import { validateShorten } from "../validators/url";

function generateShortCode(len = 7) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function shortenUrl(req: Request, res: Response) {
  try {
    const validationError = validateShorten(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    const user = req.user;
    if (!user) return errorResponse(res, "User not authenticated", 401);

    const { originalUrl } = req.body;

    let shortCode = generateShortCode();
    let tries = 0;
    while (tries < 5) {
      const existing = await prisma.url.findUnique({ where: { shortCode } });
      if (!existing) break;
      shortCode = generateShortCode();
      tries++;
    }

    const shortUrl = `${req.protocol}://${req.get("host")}/u/${shortCode}`;
    const url = await prisma.url.create({
      data: { originalUrl, shortCode, shortUrl, userId: user.id }
    });

    return successResponse(res, "Short URL created", url, 201);
  } catch (err) {
    console.error("shortenUrl error:", err);
    return errorResponse(res, "Internal server error", 500, err);
  }
}


export async function listUrls(req: Request, res: Response) {
  try {
    const user = req.user!;
    const urls = await prisma.url.findMany({ where: { userId: user!.id }, orderBy: { createdAt: "desc" } });
    return successResponse(res, "URLs fetched", urls);
  } catch (err) {
    console.error("listUrls error:", err);
    return errorResponse(res);
  }
}

export async function redirectShort(req: Request, res: Response) {
  try {
    const code = req.params.code;
    const url = await prisma.url.findUnique({ where: { shortCode: code } });
    if (!url) return res.status(404).send("Not found");

    // increment clicks
    await prisma.url.update({ where: { id: url.id }, data: { clicks: url.clicks + 1 } });
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error("redirectShort error:", err);
    return errorResponse(res);
  }
}

export async function deleteUrl(req: Request, res: Response) {
  try {
    const user = req.user!;
    const id = Number(req.params.id);
    const url = await prisma.url.findUnique({ where: { id } });
    if (!url) return errorResponse(res, "URL not found", 404);
    if (url.userId !== user!.id) return errorResponse(res, "Not authorized", 403);

    await prisma.url.delete({ where: { id } });
    return successResponse(res, "URL deleted");
  } catch (err) {
    console.error("deleteUrl error:", err);
    return errorResponse(res);
  }
}
