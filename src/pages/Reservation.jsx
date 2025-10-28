// import { useState } from "react";
import "../App.css";
// import axios from "axios";
import db from "../../db.json";
import Dot from "../assets/DashboardIconDot";

function Reserv({ onNavigateToForm }) {
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

  return (
    <>
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between items-center">
        <div className="">hgfhjgfhgfhg</div>
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
                <button
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                  onClick={onNavigateToForm}
                >
                  + Ajouter
                </button>
              </div>
            </div>
          </div>

          <table className="w-full text-left border-collapse rounded-3xl overflow-hidden border border-gray-500">
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
              {db.Ajout_Voiture.slice()
                .reverse()
                .map((row) => (
                  <tr
                    key={row.id}
                    className=" text-sm bg-gray-800 hover:bg-gray-700 transition"
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
    </>
  );
}

export default Reserv;
