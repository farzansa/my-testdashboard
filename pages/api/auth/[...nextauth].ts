// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

/**
 * NOTE:
 * - NextAuth به‌طور پیش‌فرض انتظار دارد user.id از نوع string باشد.
 * - بنابراین در authorize مقدار id را به string تبدیل می‌کنیم.
 * - در callbacks هم id را به‌صورت string در token/session نگه می‌داریم.
 */

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "ایمیل", type: "text", placeholder: "ایمیل شما" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // تبدیل id به string برای سازگاری با تایپ‌های NextAuth
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/SignIn",
  },
  callbacks: {
    /**
     * در اینجا از any برای token/user استفاده شده تا تایپ‌‌ها ساده و امن بمانند.
     * در پروژه بزرگ‌تر می‌توانی تایپ‌های سفارشی تعریف کنی.
     */
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        // user.id الان string است
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        // نگهداری id به صورت string در session.user.id
        // اگر در فرانت‌اند نیاز به number داری، اینجا Number(token.id) کن
        session.user = session.user ?? {};
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
