import { useState, useRef, useEffect } from "react";
import "../App.css";
import db from "../../db.json";
import Dot from "../assets/DashboardIconDot.jsx";
import Driverx from "../components/Driverx.jsx";
import FormLocation from "./FormLocation.jsx";
import Reserv from "./Reservation.jsx";
import FormTaxi from "./FormTaxi.jsx";
import FormAjoutVoiture from "./FormAjoutVoiture.jsx";
import axios from "axios";
import { Routes, Route, Link } from "react-router";

function Dashboard() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [vehicles, setVehicles] = useState(db.Ajout_Voiture || []);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const menuRef = useRef(null);

  // Fermer le menu lors d'un clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleModifier = (id) => {
    const veh = vehicles.find((v) => v.id === id) || null;
    setSelectedVehicle(veh);
    setOpenMenuId(null);
    setActiveTab("form-voiture");
  };

  const handleSupprimer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Ajout_Voiture/${id}`);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Suppression échouée", error);
      alert("Erreur lors de la suppression du véhicule.");
    } finally {
      setOpenMenuId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Disponible":
        return "bg-green-600/20 text-green-400";
      case "Louée":
        return "bg-orange-600/20 text-orange-400";
      case "En maintenance":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      {/* Main Content */}
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between items-center">
        <div className=""></div>
        <div className="overflow-y-auto rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Véhicules du Parc
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Filtrer
                </button>
                <Link to="/addvoiture">
                  <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                    + Ajouter
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <table className="w-full text-left border-collapse rounded-3xl overflow-hidden border-gray-500">
            <thead>
              <tr className="text-gray-400 text-sm bg-gray-900">
                <th className="px-4 py-2 border border-gray-500">Car number</th>
                <th className="px-4 py-2 border border-gray-500">Car's type</th>
                <th className="px-4 py-2 border border-gray-500">Car model</th>
                <th className="px-4 py-2 border border-gray-500">
                  License plate
                </th>
                <th className="px-4 py-2 border border-gray-500">Year</th>
                <th className="px-4 py-2 border border-gray-500">Color</th>
                <th className="px-4 py-2 border border-gray-500">Mileage</th>
                <th className="px-4 py-2 border border-gray-500">
                  Daily price
                </th>
                <th className="px-4 py-2 border border-gray-500">Status</th>
                <th className="px-4 py-2 border border-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles
                .slice()
                .reverse()
                .map((row) => (
                  <tr
                    key={row.id}
                    className="text-sm bg-gray-800 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      <p className="font-medium">{row.car_type}</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      <p className="font-medium">{row.car_model}</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      {row.license_plate}
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 truncate max-w-xs border border-gray-500">
                      {row.color}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.mileage}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.daily_price}
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      <span
                        className={`px-3 py-1 rounded-full text-[7px] font-semibold ${getStatusColor(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right border border-gray-500">
                      <div
                        className="relative inline-block"
                        ref={openMenuId === row.id ? menuRef : null}
                      >
                        <button
                          onClick={() => handleClick(row.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Dot />
                        </button>

                        {openMenuId === row.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                            <button
                              onClick={() => handleModifier(row.id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Modifier
                            </button>
                            <button
                              onClick={() => handleSupprimer(row.id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Supprimer
                            </button>
                            <Link
                              to={`/reservation/details/${row.id}`}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              Details
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeTab === "form-voiture" && (
        <FormAjoutVoiture
          initialData={selectedVehicle}
          onSaved={(saved) => {
            if (saved?.id) {
              setVehicles((prev) => {
                const exists = prev.some((v) => v.id === saved.id);
                return exists
                  ? prev.map((v) =>
                      v.id === saved.id ? { ...v, ...saved } : v
                    )
                  : [
                      ...prev,
                      {
                        ...saved,
                        id: saved.id,
                      },
                    ];
              });
            }
            setSelectedVehicle(null);
            setActiveTab("dashboard");
          }}
          onCancel={() => {
            setSelectedVehicle(null);
            setActiveTab("dashboard");
          }}
        />
      )}
    </>
  );
}

export default Dashboard;
