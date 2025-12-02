// src/App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import DonorDashboard from './pages/DonorDashboard';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  if (!role || !user) {
    return <Home setRole={setRole} setUser={setUser} />;
  }

  if (role === 'donante') {
    return <DonorDashboard user={user} setRole={setRole} setUser={setUser} />;
  }

  if (role === 'beneficiario') {
    return <BeneficiaryDashboard user={user} setRole={setRole} setUser={setUser} />;
  }

  if (role === 'voluntario') {
    return <VolunteerDashboard user={user} setRole={setRole} setUser={setUser} />;
  }

  // Fallback raro (por si algo se rompe)
  return (
    <div style={{ padding: '2rem' }}>
      <p>Rol no reconocido. Recargando...</p>
      <button onClick={() => { setUser(null); setRole(null); }}>
        Volver al inicio
      </button>
    </div>
  );
}

export default App;
