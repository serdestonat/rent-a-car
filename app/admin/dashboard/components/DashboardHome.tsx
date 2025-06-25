export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Cars In Total</h2>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Actively Rented</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">In Maintenance</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Monthly Income</h2>
          <p className="text-3xl font-bold mt-2">€12,500</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Latest Renting</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">ABC {i + 1}23 </p>
                  <p className="text-sm text-gray-500">Ahmet Yılmaz</p>
                </div>
                <span>₺{1500 + i * 200}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Araç Durumu</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold">%78</span>
              </div>
              <p className="mt-4">Kullanılabilir Araç Oranı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
