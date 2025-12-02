// src/pages/Home.js
import React, { useState } from 'react';
import { createUser } from '../api';

function Home({ setRole, setUser }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    role: 'donante',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const newUser = await createUser(form);
      setUser(newUser);
      setRole(newUser.role); // "donante" / "beneficiario" / "voluntario"
    } catch (err) {
      console.error(err);
      setError('No se pudo registrar el usuario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 500 }}>
      <h1>Caicedonia – Plataforma de Donación de Alimentos</h1>
      <p>
        Conecta establecimientos que tienen alimentos en buen estado con familias,
        adultos mayores y personas en situación de calle que los necesitan.
      </p>

      <h2>Ingresa a la plataforma</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          name="name"
          placeholder="Tu nombre o nombre del establecimiento"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Barrio / zona"
          value={form.location}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="donante">Donante</option>
          <option value="beneficiario">Beneficiario</option>
          <option value="voluntario">Voluntario</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#555' }}>
        * Este prototipo es parte de un reto para reducir el desperdicio de alimentos en Caicedonia.
      </p>
    </div>
  );
}

export default Home;
