// src/App.js
import React, { useState } from 'react';

function App() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  const probarBackend = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/donations');
      if (!res.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el backend. ¿Está corriendo en el puerto 4000?');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Caicedonia – Plataforma de Donación de Alimentos</h1>
      <p>Si ves este mensaje, el frontend ya está funcionando correctamente.</p>
      <p>Ahora vamos a probar la conexión con el backend.</p>

      <button onClick={probarBackend}>
        Probar conexión con backend
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </p>
      )}

      <h2 style={{ marginTop: '2rem' }}>Donaciones (desde el backend)</h2>
      {donations.length === 0 ? (
        <p>No hay donaciones registradas todavía.</p>
      ) : (
        <ul>
          {donations.map(d => (
            <li key={d.id}>
              <strong>{d.title}</strong> — estado: {d.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
