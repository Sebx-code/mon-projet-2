import { useState, useRef, useEffect } from "react";
import "../App.css";
import db from "../../db.json";
import axios from "axios";
import { Link } from "react-router-dom";
import Details from "./details";
import React from 'react';

function Reserv() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

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

  // Fonction pour modifier une réservation
  const handleModifier = (id) => {
    // Ici on cherche la réservation à modifier dans la db locale
    const reservation = db.Location_Voiture.find((loc) => loc.id === id);
    if (!reservation) {
      alert("Réservation introuvable !");
      return;
    }

    // Prompt pour chaque champ à éditer (basique pour cette démo, à remplacer par un vrai formulaire dans une app réelle)
    const client_name = prompt("Nom du client :", reservation.client_name);
    const identity_number = prompt(
      "N° Identité :",
      reservation.identity_number
    );
    const client_phone = prompt("Téléphone :", reservation.client_phone);
    const client_address = prompt("Adresse :", reservation.client_address);
    const car_model = prompt("Modèle :", reservation.car_model);
    const license_plate = prompt(
      "Immatriculation :",
      reservation.license_plate
    );
    const rental_start = prompt("Début location :", reservation.rental_start);
    const rental_end = prompt("Fin location :", reservation.rental_end);
    const daily_price = prompt("Prix jour :", reservation.daily_price);
    const total_price = prompt("Prix total :", reservation.total_price);
    const caution = prompt("Caution :", reservation.caution);
    const payment_method = prompt(
      "Mode de paiement :",
      reservation.payment_method
    );

    axios
      .put(`http://localhost:3000/Location_Voiture/${id}`, {
        client_name,
        identity_number,
        client_phone,
        client_address,
        car_model,
        license_plate,
        rental_start,
        rental_end,
        daily_price,
        total_price,
        caution,
        payment_method,
      })
      .then((response) => {
        console.log("Réservation modifiée", response.data);
        alert("Réservation modifiée !");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la modification de la réservation",
          error
        );
        alert("Erreur lors de la modification !");
      });
    setOpenMenuId(null);
  };

  // Fonction pour supprimer définitivement une réservation
  const handleSupprimer = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      axios
        .delete(`http://localhost:3000/Location_Voiture/${id}`)
        .then(() => {
          alert("Réservation supprimée !");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression", error);
          alert("Erreur lors de la suppression !");
        });
    }
    setOpenMenuId(null);
  };

  // Fonction pour detailler une ligne de réservation
  // const [res, setRes] = useState(null);

  // const handleDetails = (id) => {
  //   const reservation = db.Location_Voiture.find((row) => row.id === id);
  //   setRes(reservation);
  //   if (!reservation) {
  //     alert("Réservation introuvable !");
  //     return;

  //   }

  // };
  

  

  return (
    <div className="flex-1 p-6 bg-gray-900 text-gray-200 overflow-auto">
      <div className="max-w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Réservations de Véhicules
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Filtrer
                </button>
                <Link to="form-location">
                  <button
                    className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                    // onClick={onNavigateToForm}
                  >
                    + Nouvelle Réservation
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                <tr className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    ID
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Nom du client
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Téléphone
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Adresse
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Modèle
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Immatriculation
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Date début
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Date fin
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Prix total
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {db.Location_Voiture.slice()
                  .reverse()
                  .map((row, index) => (
                    <tr
                      key={row.id}
                      className={`text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50/50 dark:bg-gray-800/50"
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                            {row.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {row.client_name}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          {row.client_phone}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 max-w-xs truncate"
                        title={row.client_address}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {row.client_address}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {row.car_model}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                          {row.license_plate}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                        {row.rental_start}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                        {row.rental_end}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-primary-600 dark:text-primary-400">
                        {row.total_price}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-right">
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
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                              <button
                                onClick={() => handleModifier(row.id)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
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

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total: {db.Location_Voiture.length} réservation(s)
            </div>
          </div>
        </div>
      </div>
      {/* <Details stockData={res} /> */}
    </div>
  );
}

export default Reserv;
