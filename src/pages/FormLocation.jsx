import { useState } from "react";
import "../App.css";
import axios from "axios";
import db from "../../db.json";

function FormLocation() {
  const [formData, setFormData] = useState({
    client_name: "",
    identity_number: "",
    client_phone: "",
    client_address: "",
    car_model: "",
    license_plate: "",
    rental_start: "",
    rental_end: "",
    daily_price: "",
    total_price: "",
    caution: "",
    payment_method: "",
  });

  const calculerNombreDeJours = (dateDebut, dateFin) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    if (isNaN(debut) || isNaN(fin)) return 0;

    const diff = fin - debut;
    const jours = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return jours > 0 ? jours : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      if (name === "car_model") {
        const selectedCar = db.Ajout_Voiture.find(
          (row) => row.car_model === value
        );
        if (selectedCar) {
          updatedData.daily_price = selectedCar.daily_price || "";
        } else {
          updatedData.daily_price = "";
        }
      }

      if (
        updatedData.rental_start &&
        updatedData.rental_end &&
        updatedData.daily_price
      ) {
        const days = calculerNombreDeJours(
          updatedData.rental_start,
          updatedData.rental_end
        );
        const total = days * parseFloat(updatedData.daily_price || 0);
        updatedData.total_price = total.toFixed(2);
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/Location_Voiture", formData)
      .then((response) => {
        console.log("Données envoyées avec succès :", response.data);
        alert("Réservation réussie !");
        setFormData({
          client_name: "",
          identity_number: "",
          client_phone: "",
          client_address: "",
          car_model: "",
          license_plate: "",
          rental_start: "",
          rental_end: "",
          daily_price: "",
          total_price: "",
          caution: "",
          payment_method: "",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l’envoi :", error);
        alert("Une erreur est survenue lors de la réservation !");
      });
  };

  const uniqueModels = [
    ...new Set(
      db.Ajout_Voiture.map((row) => row.car_model)
    ),
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-y-auto overflow-hidden w-6xl m-5 p-5">
      <h1 className="mx-auto w-fit font-bold m-2 text-3xl">
        Formulaire de location de voiture
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="client_name">Nom du client :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="client_name"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="identity_number">Numéro de pièce d'identité :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="identity_number"
          name="identity_number"
          value={formData.identity_number}
          onChange={handleChange}
          required
        />

        <label htmlFor="client_phone">Téléphone du client :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="tel"
          id="client_phone"
          name="client_phone"
          value={formData.client_phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="client_address">Adresse du client :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="client_address"
          name="client_address"
          value={formData.client_address}
          onChange={handleChange}
          required
        />

        <label htmlFor="car_model">Modèle de la voiture :</label>
        <select
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="car_model"
          name="car_model"
          value={formData.car_model}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionnez un modèle --</option>
          {uniqueModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>

        <label htmlFor="license_plate">Immatriculation du véhicule :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="license_plate"
          name="license_plate"
          value={formData.license_plate}
          onChange={handleChange}
          required
        />

        <label htmlFor="rental_start">Date de début :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="date"
          id="rental_start"
          name="rental_start"
          value={formData.rental_start}
          onChange={handleChange}
          required
        />

        <label htmlFor="rental_end">Date de fin :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="date"
          id="rental_end"
          name="rental_end"
          value={formData.rental_end}
          min={formData.rental_start}
          onChange={handleChange}
          required
        />

        <label htmlFor="daily_price">Prix par jour :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="number"
          id="daily_price"
          name="daily_price"
          value={formData.daily_price}
          onChange={handleChange}
          readOnly
          required
        />

        <label htmlFor="total_price">Prix total :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="total_price"
          name="total_price"
          value={formData.total_price}
          readOnly
        />

        <label htmlFor="caution">Caution :</label>
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="caution"
          name="caution"
          value={formData.caution}
          onChange={handleChange}
          required
        />

        <label htmlFor="payment_method">Mode de paiement :</label>
        <select
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="payment_method"
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionnez --</option>
          <option value="credit_card">Carte de crédit</option>
          <option value="paypal">Espèces</option>
          <option value="bank_transfer">Virement</option>
          <option value="orange_money">Chèque</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2 mt-3"
        >
          Réserver
        </button>
      </form>
    </div>
  );
}

export default FormLocation;
