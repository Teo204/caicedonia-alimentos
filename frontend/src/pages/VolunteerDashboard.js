// src/pages/VolunteerDashboard.js
import React, { useEffect, useState } from 'react';
import { getDonations, updateDonationStatus } from '../api';

function VolunteerDashboard({ user, setRole, setUser }) {
  const [donations, setDonations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

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
    setLoadingId(id);
    try {
      await updateDonationStatus(id, { status, volunteerId: user.id });
      await loadDonations();
    } catch (err) {
      console.error(err);
      alert('No se pudo actualizar el estado.');
    } finally {
      setLoadingId(null);
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
          <h1 className="app-title">Panel de Voluntariado</h1>
          <p className="app-subtitle">
            Coordina las rutas de recogida y entrega, y actualiza el estado de las donaciones
            para mantener informados a donantes y beneficiarios.
          </p>
        </div>
        <div className="app-user-info">
          <div className="badge-role badge-voluntario">Voluntario</div>
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
              <h2 className="card-title">Donaciones y rutas</h2>
              <p className="card-subtitle">
                Marca las donaciones como <strong>EN_RUTA</strong> o <strong>ENTREGADA</strong>{' '}
                según avance la entrega.
              </p>
            </div>
          </div>

          {donations.length === 0 ? (
            <p className="text-muted">
              Aún no hay donaciones cargadas en el sistema.
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
                      Donante #{d.donorId} · Beneficiario:{' '}
                      {d.beneficiaryId ? `#${d.beneficiaryId}` : 'Sin asignar'}
                      <br />
                      Voluntario asignado:{' '}
                      {d.volunteerId ? `#${d.volunteerId}` : 'Ninguno'}
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

                    <div style={{ marginTop: '0.5rem' }}>
                      <button
                        className="btn-chip"
                        onClick={() => handleStatusChange(d.id, 'EN_RUTA')}
                        disabled={loadingId === d.id}
                      >
                        {loadingId === d.id ? 'Actualizando...' : 'Marcar EN RUTA'}
                      </button>
                      <button
                        className="btn-chip"
                        onClick={() => handleStatusChange(d.id, 'ENTREGADA')}
                        disabled={loadingId === d.id}
                      >
                        {loadingId === d.id ? 'Actualizando...' : 'Marcar ENTREGADA'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2 className="card-title">Buenas prácticas de voluntariado</h2>
          <p className="text-muted">
            • Confirma los horarios de recogida con el establecimiento donante. <br />
            • Verifica que los alimentos estén en buen estado y bien empacados. <br />
            • Coordina puntos de entrega seguros y visibles para los beneficiarios. <br />
            • Actualiza el estado en la plataforma tan pronto completes cada entrega.
          </p>
        </section>
      </div>
    </>
  );
}

export default VolunteerDashboard;
