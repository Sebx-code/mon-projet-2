import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Ajout_Voiture({ initialData = null, onSaved }) {
  const [formAData, setFormAData] = useState({
    car_type: "",
    car_model: "",
    license_plate: "",
    year: "",
    color: "",
    mileage: "",
    daily_price: "",
    status: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormAData({
        car_type: initialData.car_type || "",
        car_model: initialData.car_model || "",
        license_plate: initialData.license_plate || "",
        year: initialData.year || "",
        color: initialData.color || "",
        mileage: initialData.mileage || "",
        daily_price: initialData.daily_price || "",
        status: initialData.status || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAData({ ...formAData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = initialData?.id
      ? `http://localhost:3000/Ajout_Voiture/${initialData.id}`
      : "http://localhost:3000/Ajout_Voiture";
    const method = initialData?.id ? axios.put : axios.post;

    method(url, formAData)
      .then((response) => {
        const saved = initialData?.id
          ? { id: initialData.id, ...formAData }
          : response.data;
        alert(
          initialData?.id
            ? "Véhicule mis à jour !"
            : "Voiture ajoutée avec succès !"
        );
        if (onSaved) onSaved(saved);
        if (!initialData?.id) {
          setFormAData({
            car_type: "",
            car_model: "",
            license_plate: "",
            year: "",
            color: "",
            mileage: "",
            daily_price: "",
            status: "",
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement du véhicule :", error);
        alert("Une erreur est survenue lors de l'enregistrement du véhicule !");
      });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-4xl mx-auto my-8">
        {/* Header avec fond accentué */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-white text-2xl font-bold text-center">
            {initialData
              ? "Modifier un véhicule"
              : "Formulaire d'ajout d'une voiture"}
          </h1>
          <p className="text-blue-100 text-sm text-center mt-1">
            Remplissez les informations du véhicule
          </p>
        </div>

        {/* Corps du formulaire */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Colonne 1 */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="car_type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Type de voiture *
                </label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  id="car_type"
                  name="car_type"
                  value={formAData.car_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="SUV">SUV</option>
                  <option value="Berline">Berline</option>
                  <option value="Compact">Compact</option>
                  <option value="Citadine">Citadine</option>
                  <option value="Break">Break</option>
                  <option value="Monospace">Monospace</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="car_model"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Modèle de la voiture *
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  type="text"
                  id="car_model"
                  name="car_model"
                  value={formAData.car_model}
                  onChange={handleChange}
                  placeholder="Ex: Toyota Corolla"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="license_plate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Immatriculation *
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors uppercase"
                  type="text"
                  id="license_plate"
                  name="license_plate"
                  value={formAData.license_plate}
                  onChange={handleChange}
                  placeholder="Ex: AB-123-CD"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Année de fabrication *
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  type="number"
                  id="year"
                  name="year"
                  value={formAData.year}
                  onChange={handleChange}
                  min="1990"
                  max={currentYear}
                  placeholder="Ex: 2023"
                  required
                />
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Couleur *
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  type="text"
                  id="color"
                  name="color"
                  value={formAData.color}
                  onChange={handleChange}
                  placeholder="Ex: Rouge"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Kilométrage (km) *
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formAData.mileage}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="Ex: 15000"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="daily_price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Prix par jour (FCFA) *
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors pl-12"
                    type="number"
                    id="daily_price"
                    name="daily_price"
                    value={formAData.daily_price}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    placeholder="10000"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    FCFA
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Statut du véhicule *
                </label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  id="status"
                  name="status"
                  value={formAData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un statut</option>
                  <option value="Disponible" className="text-green-600">
                    Disponible
                  </option>
                  <option value="En location" className="text-orange-600">
                    En location
                  </option>
                  <option value="En maintenance" className="text-red-600">
                    En maintenance
                  </option>
                </select>
              </div>
            </div>
            {/* Footer avec bouton - placé à l'intérieur du formulaire pour activer la validation native */}
            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  * Champs obligatoires
                </span>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg px-6 py-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    {initialData ? "Enregistrer" : "Ajouter la voiture"}
                  </span>
                </button>
              </div>
            </div>
          </form>
          <Link
            to="/addvoiture/reservation"
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
          >
            <button className="p-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Ajout_Voiture;
