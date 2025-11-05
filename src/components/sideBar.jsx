import React, { useState } from "react";

import { Link } from "react-router-dom";
import ChartIcon from "../assets/DashboardChart";
import DriverIcon from "../assets/DashboardDriverIcon";
import ReIcon from "../assets/DashboardReIcon";
import DriveIcn from "../assets/DashboarddriveIcn";
import CarIcon from "../assets/DashboardCarIcon";
import Icon from "../assets/DashboardIcon";
const SideBar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      {/* Sidebar */}
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

          <Link to="/Dashboard">
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
          </Link>
          <Link to="/statistic">
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
          </Link>

          <Link to="/driverx">
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
          </Link>
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

          <Link to="/reservation">
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
          </Link>

          <Link to="addriver">
            <button
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                activeTab === "form-taxi"
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              onClick={() => setActiveTab("form-taxi")}
            >
              <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                <DriveIcn />
              </div>
              <span className="font-medium">Add Driver</span>
            </button>
          </Link>

          <Link to="addvoiture">
            <button
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                activeTab === "form-voiture"
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-soft"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              onClick={() => setActiveTab("form-voiture")}
            >
              <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
                <CarIcon />
              </div>
              <span className="font-medium">Add Vehicle</span>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
