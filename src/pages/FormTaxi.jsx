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
      .post("http://localhost:3000/Formulaire_Chauffeur_Taxi", formData)
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
        console.error("Erreur lors de l’envoi des donnees :", error);
        alert("Une erreur est survenue lors de l'inscription !");
      });
  };

  return (
    <>
      <h1>Formulaire d'inscription de chauffeur de taxi</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="driver_name">Nom du chauffeur :</label>
        <input
          type="text"
          name="driver_name"
          id="driver_name"
          onChange={handleChange}
          value={formData.driver_name}
        />

        <label htmlFor="date_of_birth">Date de naissance :</label>
        <input
          type="date"
          name="date_of_birth"
          id="date_of_birth"
          onChange={handleChange}
          value={formData.date_of_birth}
        />

        <label htmlFor="telephone">Numero de telephone :</label>
        <input
          type="tel"
          name="telephone"
          id="telephone"
          onChange={handleChange}
          value={formData.telephone}
        />

        <label htmlFor="adresse">Adresse :</label>
        <input
          type="text"
          name="adresse"
          id="adresse"
          onChange={handleChange}
          value={formData.adresse}
        />

        <label htmlFor="driver's_licence_number">
          Numero du permis de conduire :
        </label>
        <input
          type="text"
          name="drivers_licence_number"
          id="drivers_licence_number"
          onChange={handleChange}
          value={formData.drivers_licence_number}
        />

        <label htmlFor="experience_year">Année d'experience :</label>
        <input
          type="date"
          name="experience_year"
          id="experience_year"
          onChange={handleChange}
          value={formData.experience_year}
        />

        <label htmlFor="vehicule_attribuer">Véhicule attribué</label>
        <select
          name="vehicule_attribuer"
          id="vehicule_attribuer"
          onChange={handleChange}
          value={formData.vehicule_attribuer}
        >
          <option value=""></option>
        </select>

        <label htmlFor="immatriculation_number">
          Numero d'Immatriculation :
        </label>
        <input
          type="text"
          name="immatriculation_number"
          id="immatriculation_number"
          onChange={handleChange}
          value={formData.immatriculation_number}
        />

        <label htmlFor="cni_number">Numero de CNI :</label>
        <input
          type="text"
          name="cni_number"
          id="cni_number"
          onChange={handleChange}
          value={formData.cni_number}
        />

        <label htmlFor="date_embauche">Date d'embauche :</label>
        <input
          type="text"
          name="date_embauche"
          id="date_embauche"
          onChange={handleChange}
          value={formData.date_embauche}
        />

        <label htmlFor="statut">Statut</label>
        <select
          name="statut"
          id="statut"
          onChange={handleChange}
          value={formData.statut}
        >
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
          <option value="En congé">En congé</option>
          <option value="En mission">En mission</option>
        </select>

        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
}

export default FormTaxi;
