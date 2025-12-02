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
      setRole(newUser.role);
    } catch (err) {
      console.error(err);
      setError('No se pudo registrar el usuario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-header">
        <div>
          <h1 className="app-title">Caicedonia – Plataforma de Donación de Alimentos</h1>
          <p className="app-subtitle">
            Reducimos el desperdicio conectando supermercados, tiendas y restaurantes con
            familias, adultos mayores y personas en situación de calle que necesitan alimentos.
          </p>
        </div>
      </div>

      <div className="app-content">
        <section className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Ingresa a la plataforma</h2>
              <p className="card-subtitle">
                Crea un usuario rápido según tu rol: donante, beneficiario o voluntario.
              </p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Nombre o nombre del establecimiento</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Supermercado El Centro, María López..."
                required
              />
            </div>

            <div>
              <label>Barrio / zona</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ej. Barrio La Floresta"
              />
            </div>

            <div>
              <label>Rol</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="donante">Donante</option>
                <option value="beneficiario">Beneficiario</option>
                <option value="voluntario">Voluntario</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Ingresando...' : 'Entrar'}
            </button>

            {error && <p className="text-error">{error}</p>}
          </form>
        </section>

        <section className="card">
          <h2 className="card-title">Impacto social del prototipo</h2>
          <p className="text-muted">
            Este proyecto busca disminuir el desperdicio de alimentos en Caicedonia
            creando un puente entre:
          </p>
          <ul className="text-muted">
            <li>• Establecimientos que tienen alimentos próximos a vencer.</li>
            <li>• Organizaciones y familias que los necesitan.</li>
            <li>• Voluntarios que apoyan la logística y las rutas.</li>
          </ul>
          <p className="text-muted">
            La plataforma permite registrar donaciones, solicitar alimentos disponibles
            y actualizar el estado de las entregas (recogido, en ruta, entregado).
          </p>
        </section>
      </div>
    </>
  );
}

export default Home;
