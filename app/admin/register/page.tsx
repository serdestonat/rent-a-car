// app/admin/register/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { WarningModal } from "@/components/WarningModal"; // WarningModal'ı import edin

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // Yeni modal state'leri
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<"success" | "warning">("warning");

  const router = useRouter();

  // Modal'ı kapatma fonksiyonu
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
    // Başarılı bir kayıt sonrası modal kapatıldığında login sayfasına yönlendirme
    if (modalType === "success") {
      router.push("/admin/login");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Hata mesajlarını sıfırla
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    // Şifre uzunluğu kontrolü
    if (password.length < 8) {
      setPasswordError("Şifre en az 8 karakter olmalıdır.");
      hasError = true;
    }

    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      setConfirmPasswordError("Şifreler uyuşmuyor.");
      hasError = true;
    }

    if (hasError) {
      // Form validasyon hatalarında uyarı modalını göster
      setIsModalOpen(true);
      setModalType("warning");
      setModalMessage("Lütfen formdaki hataları düzeltin."); // Genel bir hata mesajı
      return; // Hata varsa submit işlemini durdur
    }

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      console.log("Kayıt başarılı:", response.data);

      // Başarılı durumda modalı göster
      setIsModalOpen(true);
      setModalType("success");
      setModalMessage("Account created successfully!");
      // router.push("/admin/login"); // Modal kapandığında yönlendirme yapılacak
    } catch (error: unknown) {
      console.error("Kayıt hatası:", error);

      setIsModalOpen(true); // Hata durumunda modalı aç
      setModalType("warning"); // Tipini uyarı olarak ayarla

      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
        ) {
          setModalMessage((error.response.data as { message: string }).message);
        } else {
          setModalMessage("A server error occured during registration.");
        }
      } else if (error instanceof Error) {
        setModalMessage(error.message);
      } else {
        setModalMessage("An unexpected error occured during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-300">
          <div className="bg-white p-6 border-b border-gray-200">
            <div className="flex items-center justify-center mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Create Account
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Adınız alanı */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            {/* E-Mail alanı */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            {/* Şifre alanı */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Password
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.length >= 8) {
                      setPasswordError("");
                    }
                    if (e.target.value === confirmPassword) {
                      setConfirmPasswordError("");
                    }
                  }}
                  className={`w-full pl-10 px-4 py-3 bg-white text-gray-900 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500`}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>

            {/* Şifre Doğrulama alanı */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="*******"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password === e.target.value) {
                      setConfirmPasswordError("");
                    }
                  }}
                  className={`w-full pl-10 px-4 py-3 bg-white text-gray-900 border ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500`}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs italic">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer"
            >
              Register
            </button>
          </form>
          <div className="px-6 py-4 bg-white text-center border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Have an account?{" "}
              <Link href="/admin/login">
                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* WarningModal component'ini buraya ekleyin */}
      <WarningModal
        isOpen={isModalOpen}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </div>
  );
};

export default Register;
