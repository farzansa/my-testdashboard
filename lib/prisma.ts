import { PrismaClient } from "../app/generated/prisma";

declare global {
  // جلوگیری از ایجاد چندین instance در development
  var prisma: PrismaClient | undefined;
}


const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
