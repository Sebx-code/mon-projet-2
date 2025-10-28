import "../App.css";
import db from "../../db.json";

function Reserv({ onNavigateToForm }) {
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
                <button
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                  onClick={onNavigateToForm}
                >
                  + Nouvelle Réservation
                </button>
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
                    N° Identité
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
                    Prix/jour
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Prix total
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Caution
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    Paiement
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
                        <span className="text-gray-700 dark:text-gray-300">
                          {row.identity_number}
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
                      <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                        {row.daily_price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-primary-600 dark:text-primary-400">
                        {row.total_price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {row.caution}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                          {row.payment_method === "credit_card"
                            ? "Carte"
                            : row.payment_method === "paypal"
                            ? "Espèces"
                            : row.payment_method === "bank_transfer"
                            ? "Virement"
                            : row.payment_method === "orange_money"
                            ? "Chèque"
                            : row.payment_method}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
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
    </div>
  );
}

export default Reserv;
