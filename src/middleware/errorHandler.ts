import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Unhandled error:", err);
  return errorResponse(res, "Internal server error", 500, err?.message ?? null);
}
