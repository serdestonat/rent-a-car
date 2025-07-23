// components/RentalModal.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import Vehicle, { RentalPeriod } from "@/store/vehicleStore";

interface RentalModalProps {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle | null;
  onClose: () => void;
  onConfirm: (vehicleId: string, rentalData: RentalPeriod) => void;
}

export default function RentalModal({
  vehicles,
  selectedVehicle,
  onClose,
  onConfirm,
}: RentalModalProps) {
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(
    format(new Date(Date.now() + 86400000), "yyyy-MM-dd")
  );
  const [customerName, setCustomerName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    selectedVehicle?.id || ""
  );

  const availableVehicles = vehicles.filter((v) => v.status === "Available");

  const handleSubmit = () => {
    if (!selectedVehicleId) {
      alert("Please select a vehicle");
      return;
    }

    onConfirm(selectedVehicleId, {
      startDate,
      endDate,
      customerName,
      licenseNumber,
      idCardNumber,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Rent Vehicle</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              disabled={!!selectedVehicle}
            >
              <option value="">Select a vehicle</option>
              {availableVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model} ({vehicle.plate})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              min={startDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name*
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Drivers License Number*
            </label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Renters ID Number*
            </label>
            <input
              type="text"
              value={idCardNumber}
              onChange={(e) => setIdCardNumber(e.target.value)}
              className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600"
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            disabled={!selectedVehicleId || !customerName}
          >
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
}
