import Vehicle, { useVehicleStore, RentalPeriod } from "@/store/vehicleStore";

export default function DashboardHome() {
  const { vehicles } = useVehicleStore();
  const totalCars = vehicles.length;
  const rentedCars = vehicles.filter((v) => v.status === "Rented").length;
  const maintenanceCars = vehicles.filter(
    (v) => v.status === "In Maintenance"
  ).length;
  const monthlyIncome = rentedCars * 2500; // Her araç için aylık 2500₺ varsayımı

  // Son 5 kiralama (status'ü Rented olan ve rentalPeriod'u olan araçlar)
  const latestRentals = vehicles
    .filter(
      (v): v is Vehicle & { rentalPeriod: RentalPeriod } =>
        v.status === "Rented" && v.rentalPeriod !== undefined
    )
    .sort((a, b) => {
      const dateA = new Date(a.rentalPeriod.startDate).getTime();
      const dateB = new Date(b.rentalPeriod.startDate).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  // Kullanılabilir araç oranı
  const availableRate =
    vehicles.length > 0
      ? Math.round(
          (vehicles.filter((v) => v.status === "Available").length /
            vehicles.length) *
            100
        )
      : 0;

  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Cars In Total", value: totalCars },
          { title: "Actively Rented", value: rentedCars },
          { title: "In Maintenance", value: maintenanceCars },
          {
            title: "Monthly Income",
            value: `₺${monthlyIncome.toLocaleString()}`,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-neutral-800 p-4 rounded-lg shadow border border-neutral-700 hover:border-neutral-600 transition-colors"
          >
            <h2 className="text-lg font-semibold text-neutral-300">
              {stat.title}
            </h2>
            <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Rentings */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Latest Rentings
          </h2>
          <div className="space-y-4">
            {latestRentals.length > 0 ? (
              latestRentals.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex justify-between items-center border-b border-neutral-700 pb-3"
                >
                  <div>
                    <p className="font-medium text-white">
                      {vehicle.model} ({vehicle.plate})
                    </p>
                    <p className="text-sm text-neutral-400">
                      {vehicle.rentalPeriod.customerName}
                    </p>
                  </div>
                  <span className="text-white">
                    {new Date(
                      vehicle.rentalPeriod.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      vehicle.rentalPeriod.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-neutral-400">No recent rentals</p>
            )}
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Vehicle Status
          </h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-40 h-40 bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">
                  {availableRate}%
                </span>
              </div>
              <p className="mt-4 text-neutral-300">Available Vehicle Rate</p>
              <div className="mt-4 flex justify-center gap-4">
                <div className="text-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mx-auto"></div>
                  <p className="text-sm text-neutral-300 mt-1">
                    Available:{" "}
                    {vehicles.filter((v) => v.status === "Available").length}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto"></div>
                  <p className="text-sm text-neutral-300 mt-1">
                    Rented: {rentedCars}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto"></div>
                  <p className="text-sm text-neutral-300 mt-1">
                    Maintenance: {maintenanceCars}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
