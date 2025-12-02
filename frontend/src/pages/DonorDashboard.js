// src/pages/DonorDashboard.js
import React, { useEffect, useState } from 'react';
import { createDonation, getDonations } from '../api';

function DonorDashboard({ user, setRole, setUser }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    quantity: 1,
    expirationDate: '',
    location: user?.location || '',
  });
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDonations = async () => {
    try {
      const data = await getDonations();
      // Solo las donaciones de este donante
      const myDonations = data.filter(d => d.donorId === user.id);
      setDonations(myDonations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleChange = (e) => {
    const value = e.target.name === 'quantity'
      ? Number(e.target.value)
      : e.target.value;
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDonation({
        donorId: user.id,
        ...form,
      });
      setForm({
        title: '',
        description: '',
        quantity: 1,
        expirationDate: '',
        location: user.location || '',
      });
      loadDonations();
    } catch (err) {
      console.error(err);
      alert('Error creando la donación');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Panel de Donante</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <p>Hola, <strong>{user.name}</strong>. Desde aquí puedes registrar alimentos disponibles.</p>

      <h2>Publicar donación</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 500 }}>
        <input
          name="title"
          placeholder="Nombre del alimento (ej. Leche entera x 6)"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción (estado, condiciones, etc.)"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
        <input
          type="number"
          name="quantity"
          min="1"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
        />
        <label>
          Fecha de vencimiento:
          <input
            type="date"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
          />
        </label>
        <input
          name="location"
          placeholder="Ubicación para recoger"
          value={form.location}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar donación'}
        </button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Tus donaciones publicadas</h2>
      {donations.length === 0 ? (
        <p>No has registrado donaciones todavía.</p>
      ) : (
        <ul>
          {donations.map(d => (
            <li key={d.id}>
              <strong>{d.title}</strong> — {d.status}
              {d.beneficiaryId && <span> (reservada por beneficiario #{d.beneficiaryId})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonorDashboard;
