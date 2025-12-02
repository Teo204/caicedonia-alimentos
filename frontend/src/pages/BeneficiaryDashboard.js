// src/pages/BeneficiaryDashboard.js
import React, { useEffect, useState } from 'react';
import { getDonations, requestDonation } from '../api';

function BeneficiaryDashboard({ user, setRole, setUser }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleRequest = async (id) => {
    setLoading(true);
    try {
      await requestDonation(id, { beneficiaryId: user.id });
      await loadDonations();
    } catch (err) {
      console.error(err);
      alert('No se pudo solicitar esta donación.');
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
          <h1 className="app-title">Panel de Beneficiario</h1>
          <p className="app-subtitle">
            Explora las donaciones disponibles en Caicedonia y solicita alimentos cercanos a tu zona.
          </p>
        </div>
        <div className="app-user-info">
          <div className="badge-role badge-beneficiario">Beneficiario</div>
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
              <h2 className="card-title">Donaciones disponibles</h2>
              <p className="card-subtitle">
                Prioriza alimentos próximos a vencer y en tu mismo sector para facilitar la entrega.
              </p>
            </div>
          </div>

          {donations.length === 0 ? (
            <p className="text-muted">
              En este momento no hay donaciones registradas. Intenta de nuevo en unos minutos.
            </p>
          ) : (
            <ul className="donations-list">
              {donations.map((d) => (
                <li key={d.id} className="donation-item">
                  <div>
                    <h3 className="donation-main-title">{d.title}</h3>
                    {d.description && (
                      <p className="donation-description">{d.description}</p>
                    )}
                    <p className="donation-meta">
                      Cantidad: {d.quantity} · Vence:{' '}
                      {d.expirationDate || 'Sin fecha'}
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

                    {d.status === 'PUBLICADA' ? (
                      <button
                        className="btn-primary"
                        style={{ marginTop: '0.5rem' }}
                        onClick={() => handleRequest(d.id)}
                        disabled={loading}
                      >
                        {loading ? 'Solicitando...' : 'Solicitar donación'}
                      </button>
                    ) : d.beneficiaryId === user.id ? (
                      <p className="donation-meta" style={{ marginTop: '0.5rem' }}>
                        Ya solicitaste esta donación.
                      </p>
                    ) : (
                      <p className="donation-meta" style={{ marginTop: '0.5rem' }}>
                        No disponible.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2 className="card-title">Recomendaciones de uso</h2>
          <p className="text-muted">
            • Revisa siempre la fecha de vencimiento y el estado de los productos al recibirlos. <br />
            • Si no puedes asistir a la recogida, avisa a la organización o voluntario que coordina la ruta. <br />
            • Usa los alimentos prioritariamente para adultos mayores, niños y personas en mayor vulnerabilidad.
          </p>
        </section>
      </div>
    </>
  );
}

export default BeneficiaryDashboard;
