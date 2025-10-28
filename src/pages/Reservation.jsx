// import { useState } from "react";
import "../App.css";
// import axios from "axios";
import db from "../../db.json";
import Dot from "../assets/DashboardIconDot";

function Reserv({ onNavigateToForm }) {
  return (
    <>
      <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between items-center text-sm w-1xl">
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
                  onClick={onNavigateToForm}>
                  + Ajouter
                </button>
              </div>
            </div>
          </div>

          <div className="p-15 bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between items-center overflow-x-auto overflow-y-auto">
            <table className=" text-left border-collapse rounded-3xl overflow-hidden border border-gray-500">
            <thead>
              <tr className="text-gray-400 text-sm bg-gray-900">
                <th className="px-4 py-2 border border-gray-500">Id</th>
                <th className="px-4 py-2 border border-gray-500">
                  Nom du client
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Numéro de pièce d'identité
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Téléphone du client
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Adresse du client
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Modèle de la voiture
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Immatriculation du véhicule
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Date de début
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Date de fin
                </th>
                <th className="px-4 py-2 border border-gray-500">
                  Prix par jour
                </th>
                <th className="px-4 py-2 border border-gray-500">Prix total</th>
                <th className="px-4 py-2 border border-gray-500">Caution</th>
                <th className="px-4 py-2 border border-gray-500">
                  Mode de paiement
                </th>
                <th className="px-4 py-2 border border-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {db.Location_Voiture.slice()
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
                      <p className="font-medium">{row.client_name}</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      <p className="font-medium">{row.identity_number}</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      {row.client_phone}
                    </td>
                    <td className="px-4 py-3 border border-gray-500">
                      {row.client_address}
                    </td>
                    <td className="px-4 py-3 truncate max-w-xs border border-gray-500">
                      {row.car_model}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.license_plate}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.rental_start}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.rental_end}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.daily_price}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.total_price}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.caution}
                    </td>
                    <td className="px-4 py-3 font-semibold border border-gray-500">
                      {row.payment_method}
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
      </div>
    </>
  );
}

export default Reserv;
