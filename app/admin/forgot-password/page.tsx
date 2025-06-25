import Link from "next/link";

const ForgotPassword = () => {
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
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
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
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Şifremi Unuttum
            </h1>
          </div>
          <form className="p-6 space-y-6">
            <div className="space-y-4">
              <p className="text-gray-700 text-sm text-center">
                Lütfen hesabınızla ilişkili e-posta adresini girin. Size
                şifrenizi sıfırlamanız için bir bağlantı göndereceğiz.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full pl-10 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Şifre Sıfırlama Bağlantısı Gönder
            </button>

            <div className="flex justify-center pt-2">
              <Link href="/admin/login">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Giriş Sayfasına Dön
                </button>
              </Link>
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

export default ForgotPassword;
