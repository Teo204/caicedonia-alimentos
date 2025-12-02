import React, { useState } from 'react';
import Home from './pages/Home';
import DonorDashboard from './pages/DonorDashboard';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import './index.css';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  if (!role) {
    return (
      <Home setRole={setRole} setUser={setUser} />
    );
  }

  if (role === 'donante') {
    return <DonorDashboard user={user} setRole={setRole} />;
  }
  if (role === 'beneficiario') {
    return <BeneficiaryDashboard user={user} setRole={setRole} />;
  }
  if (role === 'voluntario') {
    return <VolunteerDashboard user={user} setRole={setRole} />;
  }

  return null;
}

export default App;
