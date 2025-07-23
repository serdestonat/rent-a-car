// components/VehicleCalendar.tsx
"use client";

import Vehicle, { RentalPeriod, useVehicleStore } from "@/store/vehicleStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  EventClickArg,
  EventDropArg,
  EventApi,
  DateSelectArg,
} from "@fullcalendar/core";
import { useState } from "react";
import RentalModal from "@/components/RentalModal";

export default function VehicleCalendar() {
  const { vehicles, updateVehicle } = useVehicleStore();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const events: EventInput[] = vehicles.flatMap((vehicle) => {
    if (vehicle.status !== "Rented" || !vehicle.rentalPeriod) return [];

    return {
      id: vehicle.id,
      title: `${vehicle.model} (${vehicle.plate}) - ${vehicle.rentalPeriod.customerName}`,
      start: vehicle.rentalPeriod.startDate,
      end: vehicle.rentalPeriod.endDate,
      color: "#ef4444", // Kırmızı
      extendedProps: {
        vehicleId: vehicle.id,
        status: vehicle.status,
        customerName: vehicle.rentalPeriod.customerName,
      },
    };
  });

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const availableVehicles = vehicles.filter((v) => v.status === "Available");
    if (availableVehicles.length === 0) {
      alert("No available vehicles for rental");
      return;
    }

    setSelectedDateRange({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    console.log(selectedDateRange);
    setIsRentalModalOpen(true);
  };

  const handleRentalConfirm = (vehicleId: string, rentalData: RentalPeriod) => {
    updateVehicle(vehicleId, {
      status: "Rented",
      rentalPeriod: rentalData,
    });
    setIsRentalModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const vehicleId = clickInfo.event.id;
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setIsModalOpen(true);
    }
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const vehicleId = dropInfo.event.id;
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle && dropInfo.event.start && vehicle.rentalPeriod) {
      const updatedRentalPeriod: RentalPeriod = {
        ...vehicle.rentalPeriod,
        startDate: dropInfo.event.start.toISOString(),
        endDate:
          dropInfo.event.end?.toISOString() ||
          dropInfo.event.start.toISOString(),
      };
      updateVehicle(vehicleId, { rentalPeriod: updatedRentalPeriod });
    }
  };

  const handleEventResize = (resizeInfo: { event: EventApi }) => {
    const vehicleId = resizeInfo.event.id;
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle && resizeInfo.event.start && vehicle.rentalPeriod) {
      const updatedRentalPeriod: RentalPeriod = {
        ...vehicle.rentalPeriod,
        startDate: resizeInfo.event.start.toISOString(),
        endDate:
          resizeInfo.event.end?.toISOString() ||
          resizeInfo.event.start.toISOString(),
      };
      updateVehicle(vehicleId, { rentalPeriod: updatedRentalPeriod });
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow dark:bg-neutral-800 mt-6">
        <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">
          Vehicle Availability Calendar
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventContent={(eventInfo) => (
            <div className="p-1">
              <b>{eventInfo.event.title.split(" - ")[0]}</b>
              <div className="text-xs">{eventInfo.timeText}</div>
              <div className="text-xs">
                {eventInfo.event.extendedProps.customerName}
              </div>
            </div>
          )}
          height="auto"
          aspectRatio={1.8}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
        />
      </div>

      {/* Vehicle Details Modal */}
      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">
                {selectedVehicle.model} Details
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedVehicle(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Plate
                </p>
                <p className="font-medium">{selectedVehicle.plate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </p>
                <p
                  className={`font-medium ${
                    selectedVehicle.status === "Available"
                      ? "text-green-600"
                      : selectedVehicle.status === "Rented"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedVehicle.status}
                </p>
              </div>
            </div>

            {selectedVehicle.rentalPeriod && (
              <div className="space-y-2">
                <h3 className="font-semibold">Rental Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start Date
                    </p>
                    <p className="font-medium">
                      {new Date(
                        selectedVehicle.rentalPeriod.startDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      End Date
                    </p>
                    <p className="font-medium">
                      {new Date(
                        selectedVehicle.rentalPeriod.endDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customer
                    </p>
                    <p className="font-medium">
                      {selectedVehicle.rentalPeriod.customerName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rental Modal */}
      {isRentalModalOpen && (
        <RentalModal
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onClose={() => {
            setIsRentalModalOpen(false);
            setSelectedVehicle(null);
          }}
          onConfirm={handleRentalConfirm}
        />
      )}
    </>
  );
}
