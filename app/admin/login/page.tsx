"use client";

import Link from "next/link";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const response = await axios.post("/api/login", {
      email,
      password,
    });
    if (response.data.message === "success") {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      {" "}
      {/* Genel açık gri arka plan */}
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-300">
          {" "}
          {/* Hafif daha koyu gri kart */}
          <div className="bg-white p-6 border-b border-gray-200">
            {" "}
            {/* Başlık alanı beyaz */}
            <div className="flex items-center justify-center mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Yönetici Girişi
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <Link href="/admin/forgot-password">
                  <span className="text-xs text-blue-600 hover:text-blue-700 transition cursor-pointer">
                    Şifremi Unuttum?
                  </span>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="************"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Giriş Yap
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-600">veya</span>{" "}
              {/* Ara metin koyu gri */}
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>
          <div className="px-6 py-4 bg-white text-center border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Hesabınız yok mu?{" "}
              <Link href="/admin/register">
                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition">
                  Hesap Oluşturun
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
