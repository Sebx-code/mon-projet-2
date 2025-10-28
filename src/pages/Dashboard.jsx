import { useState } from "react";
import "../App.css";
import Icon from "../assets/DashboardIcon";
import ChartIcon from "../assets/DashboardChart.jsx";
import DriverIcon from "../assets/DashboardDriverIcon.jsx";
import ReIcon from "../assets/DashboardReIcon.jsx";
import DriveIcn from "../assets/DashboarddriveIcn.jsx";
import CarIcon from "../assets/DashboardCarIcon.jsx";
import db from "../../db.json";
import Dot from "../assets/DashboardIconDot.jsx";
import Driverx from "../components/Driverx.jsx";
import FormLocation from "./FormLocation.jsx";
import Reserv from "./Reservation.jsx";
import FormTaxi from "./FormTaxi.jsx";
import FormAjoutVoiture from "./FormAjoutVoiture.jsx";

function Dashboard() {
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
      <div className="flex gap-2 dark:bg-gray-900 dark:text-gray-300 h-screen text-lg tracking-wider">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-700 overflow-hidden p-6 h-full w-[280px] flex flex-col shadow-strong">
          {/* Logo section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-medium">
                <span className="text-white font-bold text-lg">PA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Park Auto</h1>
                <p className="text-xs text-gray-400">Management System</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Main
              </h3>

              <button
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === "dashboard"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-primary-500/20"
                      : "bg-gray-700 group-hover:bg-gray-600"
                  }`}
                >
                  <Icon />
                </div>
                <span className="font-medium">Dashboard</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === "statistics"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setActiveTab("statistics")}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === "statistics"
                      ? "bg-primary-500/20"
                      : "bg-gray-700 group-hover:bg-gray-600"
                  }`}
                >
                  <ChartIcon />
                </div>
                <span className="font-medium">Statistics</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === "drivers"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setActiveTab("drivers")}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === "drivers"
                      ? "bg-primary-500/20"
                      : "bg-gray-700 group-hover:bg-gray-600"
                  }`}
                >
                  <DriverIcon />
                </div>
                <span className="font-medium">Drivers</span>
              </button>
            </div>
            {/* Divider */}
            <div className="my-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Actions */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Actions
              </h3>

              <button
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === "reservations" || activeTab === "form-location"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setActiveTab("reservations")}
              >
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <ReIcon />
                </div>
                <span className="font-medium">Reservations</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group text-gray-300 hover:bg-gray-800/50 hover:text-white" onClick={() => setActiveTab("form-taxi")}>
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <DriveIcn />
                </div>
                <span className="font-medium">Add Driver</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group text-gray-300 hover:bg-gray-800/50 hover:text-white" onClick={() => setActiveTab("form-voiture")}>
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <CarIcon />
                </div>
                <span className="font-medium">Add Vehicle</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        {activeTab === "dashboard" && (
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
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                      + Ajouter
                    </button>
                  </div>
                </div>
              </div>

              <table className="w-full text-left border-collapse rounded-3xl overflow-hidden border-gray-500">
                <thead>
                  <tr className="text-gray-400 text-sm bg-gray-900">
                    <th className="px-4 py-2 border border-gray-500">
                      Car number
                    </th>
                    <th className="px-4 py-2 border border-gray-500">
                      Car's type
                    </th>
                    <th className="px-4 py-2 border border-gray-500">
                      Car model
                    </th>
                    <th className="px-4 py-2 border border-gray-500">
                      License plate
                    </th>
                    <th className="px-4 py-2 border border-gray-500">Year</th>
                    <th className="px-4 py-2 border border-gray-500">Color</th>
                    <th className="px-4 py-2 border border-gray-500">
                      Mileage
                    </th>
                    <th className="px-4 py-2 border border-gray-500">
                      Daily price
                    </th>
                    <th className="px-4 py-2 border border-gray-500">Status</th>
                    <th className="px-4 py-2 border border-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {db.Ajout_Voiture.slice()
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
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Dot />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            {/* Votre contenu statistics ici */}
          </div>
        )}

        {activeTab === "drivers" && <Driverx />}

        {activeTab === "reservations" && (
          <Reserv onNavigateToForm={() => setActiveTab("form-location")} />
        )}

        {activeTab === "form-location" && (
          <FormLocation onNavigateBack={() => setActiveTab("reservations")} />
        )}

        {activeTab === "form-taxi" && <FormTaxi />}

        {activeTab === "form-voiture" && <FormAjoutVoiture />}
      </div>
    </>
  );
}

export default Dashboard;
