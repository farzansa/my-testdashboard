import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-end p-8" dir="rtl">
      <h1 className="text-4xl font-bold mb-6">داشبورد</h1>

      {session ? (
        <>
          <p className="text-xl mb-6">
            خوش آمدید، <span className="text-green-400">{session.user?.name}</span>
          </p>

          {/* لینک‌ها به صورت عمودی */}
          <div className="flex flex-col gap-4 mb-8 w-48">
            <Link href="/users">
              <div className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition text-center">
                کاربران
              </div>
            </Link>
            <Link href="/designs">
              <div className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition text-center">
                طرح‌ها
              </div>
            </Link>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg transition"
          >
            خروج
          </button>
        </>
      ) : (
        <p className="text-gray-400">شما وارد نشده‌اید.</p>
      )}
    </div>
  );
}
