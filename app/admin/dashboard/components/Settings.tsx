export default function Settings() {
  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Sistem Ayarları</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Firma Bilgileri
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-300">
                Firma Adı
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-neutral-700 border-neutral-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="Gaye Rent A Car"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-300">
                  Telefon
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-neutral-700 border-neutral-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="+90 212 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-300">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md bg-neutral-700 border-neutral-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="info@gayerentacar.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-300">
                Adres
              </label>
              <textarea
                className="w-full p-2 border rounded-md bg-neutral-700 border-neutral-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                defaultValue="Şişli, İstanbul"
              ></textarea>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
              Bilgileri Güncelle
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Güvenlik</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-neutral-300">
                Şifre Değiştir
              </h3>
              <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-4 rounded-md transition-colors">
                Şifre Yenileme Talebi Gönder
              </button>
            </div>

            <div className="pt-4 border-t border-neutral-700">
              <h3 className="font-medium mb-2 text-neutral-300">
                İki Adımlı Doğrulama
              </h3>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm text-neutral-300">Aktif</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
