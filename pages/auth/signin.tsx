import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (res?.ok) {
        // ورود موفق → هدایت به داشبورد
        router.push("/dashboard");
      } else {
        setError("ایمیل یا رمز عبور اشتباه است.");
      }
    } catch (err) {
      setLoading(false);
      setError("خطایی در ورود رخ داده است.");
      console.error("SignIn error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-lg shadow bg-amber-50"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">ورود</h1>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <label className="block mb-2 text-sm">ایمیل</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-4 bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm">رمز عبور</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-4 bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>

        <div className="mt-4 text-center text-sm">
          حسابی ندارید؟{" "}
          <Link href="/auth/signup" className="text-blue-600 underline">
            ثبت‌نام
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
