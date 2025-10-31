import { useState } from "react";
import "../App.css";
import axios from "axios";

function FormTaxi() {
  const [formData, setFormData] = useState({
    id: "",
    driver_name: "",
    date_of_birth: "",
    telephone: "",
    adresse: "",
    drivers_licence_number: "",
    experience_year: "",
    vehicule_attribuer: "",
    immatriculation_number: "",
    cni_number: "",
    date_embauche: "",
    statut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/Chauffeur_Taxi", formData)
      .then((response) => {
        console.log("Donnees envoyees avec succes :", response.data);
        alert("Inscription reussie !");
        setFormData({
          id: "",
          driver_name: "",
          date_of_birth: "",
          telephone: "",
          adresse: "",
          drivers_licence_number: "",
          experience_year: "",
          vehicule_attribuer: "",
          immatriculation_number: "",
          cni_number: "",
          date_embauche: "",
          statut: "",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des donnees :", error);
        alert("Une erreur est survenue lors de l'inscription !");
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-y-auto overflow-hidden w-6xl m-5">
        {/* Header gradient pour cohérence */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
          <h1 className="mx-auto w-fit font-bold m-2 text-3xl text-white">
            Formulaire d'inscription de chauffeur de taxi
          </h1>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="driver_name">Nom du chauffeur :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="driver_name"
            name="driver_name"
            value={formData.driver_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="date_of_birth">Date de naissance :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />

          <label htmlFor="telephone">Numéro de téléphone :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />

          <label htmlFor="adresse">Adresse :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />

          <label htmlFor="drivers_licence_number">
            Numéro du permis de conduire :
          </label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="drivers_licence_number"
            name="drivers_licence_number"
            value={formData.drivers_licence_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="experience_year">Année d'expérience :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="experience_year"
            name="experience_year"
            value={formData.experience_year}
            onChange={handleChange}
            required
          />

          <label htmlFor="vehicule_attribuer">Véhicule attribué :</label>
          <select
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="vehicule_attribuer"
            id="vehicule_attribuer"
            onChange={handleChange}
            value={formData.vehicule_attribuer}
            required
          >
            <option value="">-- Sélectionnez un véhicule --</option>
          </select>

          <label htmlFor="immatriculation_number">
            Numéro d'immatriculation :
          </label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="immatriculation_number"
            name="immatriculation_number"
            value={formData.immatriculation_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="cni_number">Numéro de CNI :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="cni_number"
            name="cni_number"
            value={formData.cni_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="date_embauche">Date d'embauche :</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            id="date_embauche"
            name="date_embauche"
            value={formData.date_embauche}
            onChange={handleChange}
            required
          />

          <label htmlFor="statut">Statut :</label>
          <select
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="statut"
            id="statut"
            onChange={handleChange}
            value={formData.statut}
            required
          >
            <option value="">-- Sélectionnez un statut --</option>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
            <option value="En congé">En congé</option>
            <option value="En mission">En mission</option>
          </select>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg px-6 py-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      </div>
  );
}

export default FormTaxi;
