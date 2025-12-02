// src/pages/BeneficiaryDashboard.js
import React, { useEffect, useState } from 'react';
import { getDonations, requestDonation } from '../api';

function BeneficiaryDashboard({ user, setRole, setUser }) {
  const [donations, setDonations] = useState([]);

  const loadDonations = async () => {
    try {
      const data = await getDonations();
      // Aquí podrías filtrar por ubicación o estado
      setDonations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleRequest = async (id) => {
    try {
      await requestDonation(id, { beneficiaryId: user.id });
      loadDonations();
    } catch (err) {
      console.error(err);
      alert('No se pudo solicitar esta donación.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Panel de Beneficiario</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <p>Hola, <strong>{user.name}</strong>. Aquí puedes ver alimentos disponibles y solicitar los que necesites.</p>

      <h2>Donaciones disponibles</h2>
      {donations.length === 0 ? (
        <p>No hay donaciones registradas todavía.</p>
      ) : (
        <ul>
          {donations.map(d => (
            <li key={d.id} style={{ marginBottom: '0.75rem' }}>
              <strong>{d.title}</strong> — {d.description || 'Sin descripción'}
              <br />
              Cantidad: {d.quantity} | Vence: {d.expirationDate || 'Sin fecha registrada'}
              <br />
              Ubicación: {d.location || 'No especificada'}
              <br />
              Estado: {d.status}
              <br />
              {d.status === 'PUBLICADA' ? (
                <button onClick={() => handleRequest(d.id)}>
                  Solicitar
                </button>
              ) : d.beneficiaryId === user.id ? (
                <em>Ya solicitaste esta donación.</em>
              ) : (
                <em>No disponible.</em>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BeneficiaryDashboard;
