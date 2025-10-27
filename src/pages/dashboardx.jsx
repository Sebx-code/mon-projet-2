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

// Import Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboardx() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calcul des statistiques pour les graphiques
  const vehicleStats = db.Formulaire_Ajout_voiture.Ajout_Voiture.reduce(
    (acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const locationStats = db.Formulaire_Location_voiture.Location_Voiture.reduce(
    (acc, location) => {
      const month = location.rental_start.substring(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {}
  );

  const revenueByModel = db.Formulaire_Location_voiture.Location_Voiture.reduce(
    (acc, location) => {
      const revenue =
        parseInt(location.total_price.replace("K fcfa", "")) * 1000;
      acc[location.car_model] = (acc[location.car_model] || 0) + revenue;
      return acc;
    },
    {}
  );

  // Données pour le graphique de disponibilité
  const availabilityData = {
    labels: Object.keys(vehicleStats),
    datasets: [
      {
        data: Object.values(vehicleStats),
        backgroundColor: [
          "#10B981", // Vert pour Disponible
          "#F59E0B", // Orange pour En location
          "#EF4444", // Rouge pour En maintenance
        ],
        borderColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 2,
      },
    ],
  };

  // Données pour le graphique des locations par mois
  const monthlyData = {
    labels: Object.keys(locationStats),
    datasets: [
      {
        label: "Nombre de locations",
        data: Object.values(locationStats),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
      },
    ],
  };

  // Données pour le graphique des revenus par modèle
  const revenueData = {
    labels: Object.keys(revenueByModel),
    datasets: [
      {
        label: "Revenus (FCFA)",
        data: Object.values(revenueByModel),
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#D1D5DB",
          usePointStyle: true,
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#D1D5DB",
          callback: function (value) {
            return value / 1000 + "K";
          },
        },
        grid: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#D1D5DB",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#D1D5DB",
        },
        grid: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#D1D5DB",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  // Calcul des KPI
  const totalVehicles = db.Formulaire_Ajout_voiture.Ajout_Voiture.length;
  const availableVehicles = vehicleStats["Disponible"] || 0;
  const totalRevenue = Object.values(revenueByModel).reduce(
    (sum, revenue) => sum + revenue,
    0
  );

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-700 overflow-hidden p-6 h-full w-[280px] flex flex-col shadow-strong">
          {/* Logo Section */}
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

          {/* Navigation */}
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
                  activeTab === "drivers-tab"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setActiveTab("drivers-tab")}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === "drivers-tab"
                      ? "bg-primary-500/20"
                      : "bg-gray-700 group-hover:bg-gray-600"
                  }`}
                >
                  <ChartIcon />
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

              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group text-gray-300 hover:bg-gray-800/50 hover:text-white">
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <ReIcon />
                </div>
                <span className="font-medium">Reservations</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group text-gray-300 hover:bg-gray-800/50 hover:text-white">
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <DriveIcn />
                </div>
                <span className="font-medium">Add Driver</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group text-gray-300 hover:bg-gray-800/50 hover:text-white">
                <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                  <CarIcon />
                </div>
                <span className="font-medium">Add Vehicle</span>
              </button>
            </div>
          </nav>

          {/* User Profile */}
          <div className="mt-auto pt-6 border-t border-gray-700">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">
                  bille-admin@parkauto.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen overflow-y-auto">
          <div className="p-8">
            {activeTab === "dashboard" && (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vue d'ensemble de votre parc automobile
                  </p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-success-600 dark:text-success-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {availableVehicles}/{totalVehicles}
                        </div>
                        <div className="text-sm text-success-600 dark:text-success-400 font-medium">
                          +
                          {Math.round(
                            (availableVehicles / totalVehicles) * 100
                          )}
                          %
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Véhicules Disponibles
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {Math.round((availableVehicles / totalVehicles) * 100)}%
                      du parc total
                    </p>
                  </div>

                  <div
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-primary-600 dark:text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {(totalRevenue / 1000).toLocaleString()}K
                        </div>
                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          FCFA
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Revenus Totaux
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {db.Formulaire_Location_voiture.Location_Voiture.length}{" "}
                      locations effectuées
                    </p>
                  </div>

                  <div
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-warning-600 dark:text-warning-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {Math.round(
                            (vehicleStats["En location"] / totalVehicles) * 100
                          )}
                          %
                        </div>
                        <div className="text-sm text-warning-600 dark:text-warning-400 font-medium">
                          {vehicleStats["En location"] || 0} véhicules
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Taux d'Occupation
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Véhicules actuellement en location
                    </p>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Graphique de disponibilité */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Disponibilité des Véhicules
                      </h3>
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-primary-600 dark:text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-64">
                      <Doughnut
                        data={availabilityData}
                        options={chartOptions}
                      />
                    </div>
                  </div>

                  {/* Graphique des locations mensuelles */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Locations par Mois
                      </h3>
                      <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-success-600 dark:text-success-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-64">
                      <Line data={monthlyData} options={lineOptions} />
                    </div>
                  </div>

                  {/* Graphique des revenus par modèle */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Revenus par Modèle de Véhicule
                      </h3>
                      <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-warning-600 dark:text-warning-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-64">
                      <Bar data={revenueData} options={barOptions} />
                    </div>
                  </div>
                </div>

                {/* Tableau des véhicules */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
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

                  <div className="overflow-x-auto h-80">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Modèle
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Immatriculation
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Année
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Couleur
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Kilométrage
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Prix/Jour
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {db.Formulaire_Ajout_voiture.Ajout_Voiture.map(
                          (row, index) => (
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
                                  {row.car_type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {row.car_model}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                  {row.license_plate}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {row.year}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div
                                    className="w-4 h-4 rounded-full mr-2 border border-gray-300 dark:border-gray-600"
                                    style={{
                                      backgroundColor:
                                        row.color.toLowerCase() === "noire"
                                          ? "#000"
                                          : row.color.toLowerCase() ===
                                            "blanche"
                                          ? "#fff"
                                          : row.color.toLowerCase() === "rouge"
                                          ? "#ef4444"
                                          : row.color.toLowerCase() === "bleue"
                                          ? "#3b82f6"
                                          : row.color.toLowerCase() === "verte"
                                          ? "#22c55e"
                                          : row.color.toLowerCase() === "grise"
                                          ? "#6b7280"
                                          : "#6b7280",
                                    }}
                                  ></div>
                                  <span className="text-sm text-gray-900 dark:text-white">
                                    {row.color}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {row.mileage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {row.daily_price}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    row.status === "Disponible"
                                      ? "bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-400"
                                      : row.status === "En location"
                                      ? "bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-400"
                                      : "bg-danger-100 dark:bg-danger-900/30 text-danger-800 dark:text-danger-400"
                                  }`}
                                >
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                      row.status === "Disponible"
                                        ? "bg-success-400"
                                        : row.status === "En location"
                                        ? "bg-warning-400"
                                        : "bg-danger-400"
                                    }`}
                                  ></div>
                                  {row.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
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
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "statistics" && (
              <div className="space-y-8">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Statistiques
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyses détaillées et rapports de performance
                  </p>
                </div>

                {/* Advanced Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-primary-600 dark:text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {Object.keys(revenueByModel).length}
                        </div>
                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          Modèles
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Modèles Actifs
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Nombre de modèles différents dans le parc
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-success-600 dark:text-success-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {Math.round(
                            (db.Formulaire_Location_voiture.Location_Voiture
                              .length /
                              30) *
                              100
                          )}
                          %
                        </div>
                        <div className="text-sm text-success-600 dark:text-success-400 font-medium">
                          Taux
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Efficacité
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Taux d'utilisation moyen du parc
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-xl">
                        <svg
                          className="w-6 h-6 text-warning-600 dark:text-warning-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                          {Math.round(
                            totalRevenue /
                              db.Formulaire_Location_voiture.Location_Voiture
                                .length /
                              1000
                          )}
                          K
                        </div>
                        <div className="text-sm text-warning-600 dark:text-warning-400 font-medium">
                          FCFA
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      Revenu Moyen
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Par location effectuée
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Performance des Modèles
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(revenueByModel)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([model, revenue], index) => (
                          <div
                            key={model}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {model}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {(revenue / 1000).toLocaleString()}K FCFA
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Analyses Temporelles
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary-800 dark:text-primary-200">
                            Tendances
                          </span>
                          <span className="text-xs text-primary-600 dark:text-primary-400">
                            +12%
                          </span>
                        </div>
                        <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                          Croissance des locations ce mois
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-success-800 dark:text-success-200">
                            Prévisions
                          </span>
                          <span className="text-xs text-success-600 dark:text-success-400">
                            +8%
                          </span>
                        </div>
                        <p className="text-xs text-success-700 dark:text-success-300 mt-1">
                          Prévision de croissance pour le prochain mois
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "drivers-tab" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Chauffeur de taxi
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
                          Date de naissance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Telephone
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Adresse
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Numero de permis de conduire
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Année d'expérience
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Véhicule attribué
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Numéro d'immatricule
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Numéro de la cni
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
                      {db.Formulaire_Chauffeur_Taxi.Chauffeur_Taxi.map(
                        (row, index) => (
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
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {row.date_of_birth}
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
                              <div className="flex items-center">
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {row.drivers_licence_number}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {row.experience_year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {row.vehicule_attribuer}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {row.immatriculation_number}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {row.cni_number}
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
                                    ? "bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-400"
                                    : row.statut === "Inactif"
                                    ? "bg-danger-100 dark:bg-danger-900/30 text-danger-800 dark:text-danger-400"
                                    : row.statut === "En congé"
                                    ? "bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-400"
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
                              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
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
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboardx;
