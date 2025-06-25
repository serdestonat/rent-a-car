// /store/vehicleStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type VehicleStatus = "Available" | "Rented" | "In Maintenance";

// Araç tipini tanımlayın
type Vehicle = {
  id: string;
  title: string; // "Egea", "i20" gibi kısa isimler
  category: string;
  model: string;
  fuelType: string;
  fuelCapacity: string;
  trunkCapacity: string;
  engineDisplacement: string;
  transmission: string;
  image: string;
  plate?: string;
  year?: number;
  status?: VehicleStatus;
};

type VehicleStore = {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
};

// Başlangıç verileri (mevcut araçlarınız) - Bu veriler sadece ilk yüklemede kullanılacak,
// daha sonra localStorage'dan yüklenecek.
const initialVehicles: Vehicle[] = [
  {
    id: "1",
    title: "Egea",
    model: "Fiat Egea 1.4 Fire",
    plate: "34 ABC 123",
    year: 2022,
    status: "Available",
    category: "Fiat",
    fuelType: "Gasoline",
    fuelCapacity: "50 L",
    trunkCapacity: "520 L",
    engineDisplacement: "1368 cc",
    transmission: "Manual (6 Speed)",
    image: "/images/cars/egea.png",
  },
  {
    id: "2",
    title: "i20",
    model: "Hyundai i20 1.4 MPI",
    plate: "34 XYZ 456",
    year: 2021,
    status: "Rented",
    category: "Hyundai",
    fuelType: "Gasoline",
    fuelCapacity: "40 L",
    trunkCapacity: "352 L",
    engineDisplacement: "1368 cc",
    transmission: "Manual / Automatic",
    image: "/images/cars/i20.jpg",
  },
  {
    id: "3",
    title: "Fluence",
    model: "Renault Fluence 1.5 dCi",
    plate: "34 QWE 456",
    year: 2021,
    status: "In Maintenance",
    category: "Renault",
    fuelType: "Diesel",
    fuelCapacity: "60 L",
    trunkCapacity: "530 L",
    engineDisplacement: "1431 cc",
    transmission: "Manual / Automatic",
    image: "/images/cars/fluence.jpg",
  },
  {
    id: "4",
    title: "301",
    model: "Peugeot 301 1.5 BlueHDi",
    plate: "34 ASD 456",
    year: 2021,
    status: "Available",
    category: "Peugeot",
    fuelType: "Diesel",
    fuelCapacity: "50 L",
    trunkCapacity: "506 L",
    engineDisplacement: "1400 cc",
    transmission: "Manual (6 Speed)",
    image: "/images/cars/301.png",
  },
  {
    id: "5",
    title: "Focus",
    model: "Ford Focus 1.5 EcoBlue",
    plate: "34 CVB 456",
    year: 2021,
    status: "Rented",
    category: "Ford",
    fuelType: "Diesel",
    fuelCapacity: "47 L",
    trunkCapacity: "511 L",
    engineDisplacement: "1499 cc",
    transmission: "Manual (8 Speed)",
    image: "/images/cars/focus.png",
  },
  {
    id: "6",
    title: "Clio Sport Tourer",
    model: "Renault Clio Sport Tourer",
    plate: "34 JKL 456",
    year: 2021,
    status: "In Maintenance",
    category: "Renault",
    fuelType: "Gasoline / Diesel",
    fuelCapacity: "45-50 L",
    trunkCapacity: "443 L",
    engineDisplacement: "999-1461 cc",
    transmission: "Manual / Automatic",
    image: "/images/cars/sportClio1.jpg",
  },
  {
    id: "7",
    title: "Symbol",
    model: "Renault Symbol 1.0 SCe",
    plate: "07 XYZ 456",
    year: 2021,
    status: "Available",
    category: "Renault",
    fuelType: "Gasoline",
    fuelCapacity: "50 L",
    trunkCapacity: "510 L",
    engineDisplacement: "999 cc",
    transmission: "Manual (5 Speed)",
    image: "/images/cars/symbol.png",
  },
  {
    id: "8",
    title: "Linea",
    model: "Fiat Linea 1.3 Multijet",
    plate: "07 XYZ 789",
    year: 2021,
    status: "Rented",
    category: "Fiat",
    fuelType: "Diesel",
    fuelCapacity: "45 L",
    trunkCapacity: "500 L",
    engineDisplacement: "1248 cc",
    transmission: "Manual (5 Speed)",
    image: "/images/cars/linea.jpg",
  },
  // Diğer araçları buraya ekleyin...
];

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set) => ({
      // 'get' parametresini buradan kaldırdık
      vehicles: initialVehicles, // Initial data will be used if localStorage is empty
      addVehicle: (vehicle) =>
        set((state) => ({
          vehicles: [
            ...state.vehicles,
            { ...vehicle, id: Date.now().toString() },
          ],
        })),
      updateVehicle: (id, updatedVehicle) =>
        set((state) => ({
          vehicles: state.vehicles.map((v) =>
            v.id === id ? { ...v, ...updatedVehicle } : v
          ),
        })),
      deleteVehicle: (id) =>
        set((state) => ({
          vehicles: state.vehicles.filter((v) => v.id !== id),
        })),
    }),
    {
      name: "vehicle-storage", // localStorage'da kullanılacak key
      storage: createJSONStorage(() => localStorage), // (optional) default is localStorage
      // only store the 'vehicles' part of the state
      partialize: (state) => ({ vehicles: state.vehicles }),
    }
  )
);

export default Vehicle;
