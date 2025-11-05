import { useState, useRef, useEffect } from "react";
import "../App.css";
import axios from "axios";
import db from "../../db.json";
import FormTaxi from "../pages/FormTaxi.jsx";
import { Link } from "react-router-dom";

function Driverx() {
  const [drivers, setDrivers] = useState(db.Chauffeur_Taxi || []);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const [mode, setMode] = useState("list");
  const [selectedDriver, setSelectedDriver] = useState(null);

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
    const d = drivers.find((dr) => dr.id === id) || null;
    setSelectedDriver(d);
    setOpenMenuId(null);
    setMode("form");
  };

  const handleSupprimer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Chauffeur_Taxi/${id}`);
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Suppression échouée", error);
      alert("Erreur lors de la suppression du chauffeur.");
    } finally {
      setOpenMenuId(null);
    }
  };

  if (mode === "form") {
    return (
      <FormTaxi
        initialData={selectedDriver}
        onSaved={(saved) => {
          if (saved?.id) {
            setDrivers((prev) => {
              const exists = prev.some((p) => p.id === saved.id);
              return exists
                ? prev.map((p) => (p.id === saved.id ? { ...p, ...saved } : p))
                : [...prev, saved];
            });
          }
          setSelectedDriver(null);
          setMode("list");
        }}
        onCancel={() => {
          setSelectedDriver(null);
          setMode("list");
        }}
      />
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden w-6xl m-5">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chauffeur de taxi
            </h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Filtrer
              </button>
              <button
                onClick={() => {
                  setSelectedDriver(null);
                  setMode("form");
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                + Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto h-screen">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Nom des chauffeurs
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Telephone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Adresse
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Véhicule attribué
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Date d'embauche
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {drivers
                .slice()
                .reverse()
                .map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50/50 dark:bg-gray-800/50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                            {row.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {row.driver_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {row.telephone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {row.adresse}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {row.vehicule_attribuer}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {row.date_embauche}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.statut === "Actif"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : row.statut === "Inactif"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                            : row.statut === "En congé"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                            : row.statut === "En mission"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            row.statut === "Actif"
                              ? "bg-green-400"
                              : row.statut === "Inactif"
                              ? "bg-red-400"
                              : row.statut === "En congé"
                              ? "bg-yellow-400"
                              : row.statut === "En mission"
                              ? "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        {row.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div
                        className="relative inline-block"
                        ref={openMenuId === row.id ? menuRef : null}
                      >
                        <button
                          onClick={() => handleClick(row.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
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
    </>
  );
}

export default Driverx;
