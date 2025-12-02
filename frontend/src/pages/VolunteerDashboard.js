// src/pages/VolunteerDashboard.js
import React, { useEffect, useState } from 'react';
import { getDonations, updateDonationStatus } from '../api';

function VolunteerDashboard({ user, setRole, setUser }) {
  const [donations, setDonations] = useState([]);

  const loadDonations = async () => {
    try {
      const data = await getDonations();
      setDonations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDonationStatus(id, { status, volunteerId: user.id });
      loadDonations();
    } catch (err) {
      console.error(err);
      alert('No se pudo actualizar el estado.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Panel de Voluntario</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <p>Hola, <strong>{user.name}</strong>. Puedes ayudar a gestionar las rutas de entrega.</p>

      <h2>Donaciones y rutas</h2>
      {donations.length === 0 ? (
        <p>No hay donaciones registradas todavía.</p>
      ) : (
        <ul>
          {donations.map(d => (
            <li key={d.id} style={{ marginBottom: '0.75rem' }}>
              <strong>{d.title}</strong> — {d.status}
              <br />
              Donante: #{d.donorId} | Beneficiario: {d.beneficiaryId ? `#${d.beneficiaryId}` : 'Sin asignar'}
              <br />
              Voluntario asignado: {d.volunteerId ? `#${d.volunteerId}` : 'Ninguno'}
              <br />
              <button onClick={() => handleStatusChange(d.id, 'EN_RUTA')}>
                Marcar EN RUTA
              </button>{' '}
              <button onClick={() => handleStatusChange(d.id, 'ENTREGADA')}>
                Marcar ENTREGADA
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VolunteerDashboard;
