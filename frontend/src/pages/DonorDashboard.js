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
    <>
      <div className="app-header">
        <div>
          <h1 className="app-title">Panel de Donante</h1>
          <p className="app-subtitle">
            Registra alimentos en buen estado que estén próximos a vencerse para
            que puedan ser redistribuidos a tiempo.
          </p>
        </div>
        <div className="app-user-info">
          <div className="badge-role badge-donante">Donante</div>
          <div>{user.name}</div>
          {user.location && <div className="text-muted">{user.location}</div>}
          <button className="btn-ghost" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="app-content">
        <section className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Publicar una nueva donación</h2>
              <p className="card-subtitle">
                Describe el alimento y la fecha de vencimiento para que los beneficiarios
                puedan priorizar su uso.
              </p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Nombre del alimento</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej. Yogurt de fresa x 12 unidades"
                required
              />
            </div>

            <div>
              <label>Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Condiciones, empaque, notas relevantes..."
              />
            </div>

            <div className="form-row-inline">
              <div>
                <label>Cantidad</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Fecha de vencimiento</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={form.expirationDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label>Ubicación para la recogida</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Dirección o punto de referencia"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar donación'}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Tus donaciones</h2>
          </div>

          {donations.length === 0 ? (
            <p className="text-muted">Aún no has registrado donaciones.</p>
          ) : (
            <ul className="donations-list">
              {donations.map(d => (
                <li key={d.id} className="donation-item">
                  <div>
                    <h3 className="donation-main-title">{d.title}</h3>
                    {d.description && (
                      <p className="donation-description">{d.description}</p>
                    )}
                    <p className="donation-meta">
                      Cantidad: {d.quantity} · Vence: {d.expirationDate || 'Sin fecha'}
                      <br />
                      Ubicación: {d.location || 'No especificada'}
                    </p>
                  </div>
                  <div className="donation-status">
                    <div
                      className={
                        'status-pill ' +
                        (d.status === 'PUBLICADA'
                          ? 'status-publicada'
                          : d.status === 'RESERVADA'
                          ? 'status-reservada'
                          : d.status === 'EN_RUTA'
                          ? 'status-en-ruta'
                          : 'status-entregada')
                      }
                    >
                      {d.status}
                    </div>
                    {d.beneficiaryId && (
                      <p className="donation-meta">
                        Beneficiario #{d.beneficiaryId}
                      </p>
                    )}
                    {d.volunteerId && (
                      <p className="donation-meta">
                        Voluntario #{d.volunteerId}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default DonorDashboard;
