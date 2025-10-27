import { useState } from "react";
import "../App.css";
import axios from "axios";

function Ajout_Voiture() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAData({ ...formAData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/Formulaire_Ajout_voiture", formAData)
      .then((response) => {
        console.log("Données de la voiture ajoutée :", response.data);
        alert("Voiture ajoutée avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la voiture :", error);
        alert("Une erreur est survenue lors de l'ajout de la voiture !");
      });

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
  };

  return (
    <>
      <h1>Formulaire d'ajout d'une voiture</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="type">Type de voiture :</label>
        <select
          id="type"
          name="type"
          value={formAData.car_type}
          onChange={handleChange}
          required
        >
          <option value="SUV">SUV</option>
          <option value="Berline">Berline</option>
          <option value="Compact">Compact</option>
          <option value="Citadine">Citadine</option>
          <option value="Break">Break</option>
          <option value="Monospace">Monospace</option>
        </select>
        <label htmlFor="car_model">Modèle de la voiture :</label>
        <input
          type="text"
          id="car_model"
          name="car_model"
          value={formAData.car_model}
          onChange={handleChange}
          required
        />

        <label htmlFor="license_plate">Immatriculation de la voiture :</label>
        <input
          type="text"
          id="license_plate"
          name="license_plate"
          value={formAData.license_plate}
          onChange={handleChange}
          required
        />

        <label htmlFor="year">Année de la voiture :</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formAData.year}
          onChange={handleChange}
          required
        />

        <label htmlFor="color">Couleur de la voiture :</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formAData.color}
          onChange={handleChange}
          required
        />

        <label htmlFor="mileage">Kilométrage de la voiture :</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          value={formAData.mileage}
          onChange={handleChange}
          required
        />

        <label htmlFor="daily_price">Prix par jour de la location :</label>
        <input
          type="number"
          id="daily_price"
          name="daily_price"
          value={formAData.daily_price}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Statut de la voiture :</label>
        <select
          id="status"
          name="status"
          value={formAData.status}
          onChange={handleChange}
          required
        >
          <option value="Disponible">Disponible</option>
          <option value="En location">En location</option>
          <option value="En maintenance">En maintenance</option>
        </select>

        <button type="submit">Ajouter la voiture</button>
      </form>
    </>
  );
}

export default Ajout_Voiture;
