import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client"; // اگر از Prisma استفاده می‌کنید

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "ایمیل و رمز عبور الزامی است" });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "ثبت‌نام موفقیت‌آمیز بود", userId: user.id });
  } catch (error: any) {
    console.error("Signup error:", error);
  return res.status(500).json({ message: "خطا در ثبت‌نام", detail: error.message });
  }
}
