import { Response } from "express";

export function successResponse(res: Response, message = "OK", data: any = null, status = 200) {
  return res.status(status).json({ status: "success", message, data });
}

export function errorResponse(res: Response, message = "Internal server error", status = 500, error: any = null) {
  return res.status(status).json({ status: "error", message, error });
}
