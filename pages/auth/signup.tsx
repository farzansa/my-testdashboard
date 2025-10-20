import { useState } from "react";
import { useRouter } from "next/router";


export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("ثبت‌نام انجام شد!");
      router.push("/auth/signin");
    } else {
      const data = await res.json();
      alert(`خطا: ${data.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-4">ثبت‌نام</h1>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
}
