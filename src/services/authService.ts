import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { WaiterRepository } from "../repositories/waiterRepository";
import { QRTokenRepository } from "../repositories/qrTokenRepository";

const waiterRepo = new WaiterRepository();
const qrTokenRepo = new QRTokenRepository();
const expiry = process.env.JWT_EXPIRY ?? "24h";

export class AuthService {
  async registerWaiter(data: any) {
    const existing = await waiterRepo.findByUsername(data.username);
    if (existing) throw new Error("Username already exists");

    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const waiter = await waiterRepo.create({
      ...data,
      password: hashedPassword
    });

    return {
      id: waiter.id,
      username: waiter.username,
      email: waiter.email,
      firstName: waiter.firstName,
      lastName: waiter.lastName
    };
  }

  async loginWaiter(username: string, password: string) {
    const waiter = await waiterRepo.findByUsername(username);
    if (!waiter) throw new Error("Invalid credentials");

    const isValid = await bcryptjs.compare(password, waiter.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
    {
    id: waiter.id,
    username: waiter.username,
    email: waiter.email
     },
     process.env.JWT_SECRET || "secret",
    {
    expiresIn: expiry as jwt.SignOptions["expiresIn"]
    }
    );
    return {
      token,
      waiter: {
        id: waiter.id,
        username: waiter.username,
        email: waiter.email,
        firstName: waiter.firstName,
        lastName: waiter.lastName
      }
    };
  }

  async generateQRToken(waiterId: string) {
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + parseInt(process.env.QR_TOKEN_EXPIRY || "900") * 1000);

    const qrToken = await qrTokenRepo.create({
      token,
      waiterId,
      expiresAt
    });

    return {
      qrToken: qrToken.token,
      expiresAt: qrToken.expiresAt
    };
  }

  async validateQRToken(token: string) {
    const qrToken = await qrTokenRepo.findByToken(token);

    if (!qrToken) throw new Error("Invalid QR token");
    if (qrToken.isUsed) throw new Error("QR token already used");
    if (qrToken.expiresAt < new Date()) throw new Error("QR token expired");

    await qrTokenRepo.markAsUsed(qrToken.id);

    return { waiterId: qrToken.waiterId };
  }
}