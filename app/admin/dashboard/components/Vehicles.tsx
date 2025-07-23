// /app/admin/dashboard/components/vehicles.tsx
import { useState, useRef, ChangeEvent } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import Vehicle from "@/store/vehicleStore";
import Image from "next/image"; // Image component'i için import
import VehicleCalendar from "@/components/VehicleCalendar";

export default function Vehicles() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } =
    useVehicleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<
    Omit<Vehicle, "id"> & { imageFile?: File }
  >({
    title: "",
    category: "",
    model: "",
    fuelType: "",
    fuelCapacity: "",
    trunkCapacity: "",
    engineDisplacement: "",
    transmission: "",
    image: "",
    plate: "",
    year: 2024,
    status: "Available",
    imageFile: undefined,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imageFile: file,
      });

      // Preview oluştur
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle(id);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      title: vehicle.title,
      category: vehicle.category,
      model: vehicle.model,
      fuelType: vehicle.fuelType,
      fuelCapacity: vehicle.fuelCapacity,
      trunkCapacity: vehicle.trunkCapacity,
      engineDisplacement: vehicle.engineDisplacement,
      transmission: vehicle.transmission,
      image: vehicle.image,
      plate: vehicle.plate || "",
      year: vehicle.year || 0,
      status: vehicle.status || "Available",
      imageFile: undefined,
    });
    setImagePreview(vehicle.image || null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.model || !formData.category || !formData.title) {
      alert("Please fill all required fields!");
      return;
    }

    let imageUrl = formData.image;

    if (formData.imageFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", formData.imageFile);

        const response = await fetch("/api/uploads", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.imageUrl) {
          throw new Error("No image URL returned");
        }

        imageUrl = result.imageUrl;
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const vehicleData = {
      ...formData,
      image: imageUrl,
    };

    if (editingVehicle) {
      updateVehicle(editingVehicle.id, vehicleData);
    } else {
      addVehicle(vehicleData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      model: "",
      fuelType: "",
      fuelCapacity: "",
      trunkCapacity: "",
      engineDisplacement: "",
      transmission: "",
      image: "",
      plate: "",
      year: 2024,
      status: "Available",
      imageFile: undefined,
    });
    setImagePreview(null);
    setEditingVehicle(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {" "}
      {/* Genel padding eklendi */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          Vehicle Management
        </h1>
        <button
          onClick={() => {
            setEditingVehicle(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-auto" // Buton responsive yapıldı
        >
          Add New Vehicle
        </button>
      </div>
      {/* Add/Edit Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {" "}
          {/* Modal için padding */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {" "}
            {/* Max height ve scroll eklendi */}
            <h2 className="text-xl font-bold mb-4">
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {" "}
                {/* Grid responsive yapıldı */}
                {/* Resim Yükleme Alanı */}
                <div className="md:col-span-2">
                  {" "}
                  {/* Tam genişlik aldı */}
                  <label className="block text-sm font-medium mb-1">
                    Vehicle Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {" "}
                      {/* flex-shrink-0 eklendi */}
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          layout="fill" // Resim boyutlandırması için
                          objectFit="cover" // Resim boyutlandırması için
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm text-center">
                          No Image
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="vehicleImage"
                    />
                    <label
                      htmlFor="vehicleImage"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer transition-colors"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
                {/* Diğer form alanları */}
                {/* Her input div'ine mb-3 yerine genel gap ile boşluk veriyoruz */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category*
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Model*
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fuel Type
                  </label>
                  <input
                    type="text"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fuel Capacity
                  </label>
                  <input
                    type="text"
                    name="fuelCapacity"
                    value={formData.fuelCapacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Trunk Capacity
                  </label>
                  <input
                    type="text"
                    name="trunkCapacity"
                    value={formData.trunkCapacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Engine Displacement
                  </label>
                  <input
                    type="text"
                    name="engineDisplacement"
                    value={formData.engineDisplacement}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Transmission
                  </label>
                  <input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    name="plate"
                    value={formData.plate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  {" "}
                  {/* Tam genişlik aldı */}
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="In Maintenance">In Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                {" "}
                {/* Butonlar arası boşluk ve üstten boşluk */}
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer transition-colors" // Griye çevrildi
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer transition-colors"
                >
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-x-auto">
        {" "}
        {/* Küçük ekranlarda yatay kaydırma */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
            {vehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-400"
                >
                  No vehicles found. Add a new one!
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                    {vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                    {vehicle.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                    {vehicle.plate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.status === "Available"
                          ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                          : vehicle.status === "Rented"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-3 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <VehicleCalendar />
    </div>
  );
}
