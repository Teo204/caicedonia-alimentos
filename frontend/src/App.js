// src/App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import DonorDashboard from './pages/DonorDashboard';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const renderContent = () => {
    if (!role || !user) {
      return <Home setRole={setRole} setUser={setUser} />;
    }

    if (role === 'donante') {
      return (
        <DonorDashboard
          user={user}
          setRole={setRole}
          setUser={setUser}
        />
      );
    }

    if (role === 'beneficiario') {
      return (
        <BeneficiaryDashboard
          user={user}
          setRole={setRole}
          setUser={setUser}
        />
      );
    }

    if (role === 'voluntario') {
      return (
        <VolunteerDashboard
          user={user}
          setRole={setRole}
          setUser={setUser}
        />
      );
    }

    return (
      <div>
        <p>Rol no reconocido.</p>
        <button
          className="btn-primary"
          onClick={() => {
            setUser(null);
            setRole(null);
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        {renderContent()}
        <div className="app-footer">
          Prototipo académico – Caicedonia · React + Node / Express
        </div>
      </div>
    </div>
  );
}

export default App;
