import React, { useState } from 'react';
import { createUser } from '../api';

function Home({ setRole, setUser }) {
  const [form, setForm] = useState({ name: '', role: 'donante', location: '' });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = await createUser(form);
    setUser(newUser);
    setRole(newUser.role);
  };

  return (
    <div className="container">
      <h1>Conecta Alimentos Caicedonia</h1>
      <p>Reduce el desperdicio de alimentos conectando donantes y familias que lo necesitan.</p>

      <form onSubmit={handleSubmit} className="card">
        <input
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Tu barrio / zona"
          value={form.location}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="donante">Donante</option>
          <option value="beneficiario">Beneficiario</option>
          <option value="voluntario">Voluntario</option>
        </select>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Home;
