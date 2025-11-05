import { useParams } from "react-router-dom";
import db from "../../db.json";
import React from "react";

function Details() {
  const { id } = useParams();
  const reservation = db.Location_Voiture.find((r) => r.id == id);

  if (!reservation)
    return <p className="text-white">Réservation introuvable</p>;

  return (
    <div className="p-5">
      <div className="p-6 bg-gray-900 text-gray-200 items-center max-h-[80vh] overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Détails de la Réservation #{id}
        </h2>
        <div className="grid grid-cols-2 justify-center">
          <div className="text-start box-border">
            <h3 className="font-semibold">Information Client</h3>
            <p>Nom: {reservation.client_name}</p>
            <p>Téléphone: {reservation.client_phone}</p>
            <p>Adresse: {reservation.client_address}</p>
            <p>N° Identité: {reservation.identity_number}</p>
          </div>

          <div>
            <h3 className="font-semibold">Information Véhicule</h3>
            <p>Modèle: {reservation.car_model}</p>
            <p>Immatriculation: {reservation.license_plate}</p>
          </div>

          <div>
            <h3 className="font-semibold mt-3">Information Location</h3>
            <p>Date début: {reservation.rental_start}</p>
            <p>Date fin: {reservation.rental_end}</p>
            <p>Prix journalier: {reservation.daily_price}</p>
            <p>Prix total: {reservation.total_price}</p>
          </div>

          <div>
            <h3 className="font-semibold">Information Paiement</h3>
            <p>Caution: {reservation.caution}</p>
            <p>Mode de paiement: {reservation.payment_method}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
