import { Request, Response } from "express";
import prisma from '../services/prisma';
import bcrypt from "bcryptjs";
import { signToken } from "../services/jwt";
import { successResponse, errorResponse } from "../utils/response";
import { validateRegister, validateLogin } from "../validators/auth";

export async function register(req: Request, res: Response) {
  try {
    const validationError = validateRegister(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return errorResponse(res, "User already exists", 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const token = signToken({ userId: user.id });

    return successResponse(res, "User registered", { id: user.id, email: user.email, token }, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validationError = validateLogin(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return errorResponse(res, "Invalid credentials", 400);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return errorResponse(res, "Invalid credentials", 400);

    const token = signToken({ userId: user.id });
    return successResponse(res, "Login successful", { token });
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}
