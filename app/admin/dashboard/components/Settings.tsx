export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sistem Ayarları</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Firma Bilgileri</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Firma Adı
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"
                defaultValue="Gaye Rent A Car"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefon
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"
                  defaultValue="+90 212 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"
                  defaultValue="info@gayerentacar.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adres</label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"
                rows={3}
                defaultValue="Şişli, İstanbul"
              ></textarea>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Bilgileri Güncelle
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Güvenlik</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Şifre Değiştir</h3>
              <button className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 py-2 px-4 rounded-md">
                Şifre Yenileme Talebi Gönder
              </button>
            </div>

            <div className="pt-4 border-t dark:border-neutral-700">
              <h3 className="font-medium mb-2">İki Adımlı Doğrulama</h3>
              <div className="flex items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle" className="sr-only" />
                  <div className="block bg-gray-300 dark:bg-neutral-600 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <label htmlFor="toggle" className="text-sm">
                  Aktif
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
