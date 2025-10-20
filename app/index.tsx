"use client";

import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>خوش آمدید!</h1>

      {session ? (
        <>
          <p>سلام، {session.user?.name ?? "کاربر"}!</p>
          <button onClick={() => signOut()}>خروج</button>
          <br />
          <Link href="/profile">رفتن به پروفایل</Link>
        </>
      ) : (
        <>
          <p>شما وارد نشده‌اید.</p>
          <button onClick={() => signIn()}>ورود</button>
        </>
      )}
    </div>
  );
};

export default Home;
