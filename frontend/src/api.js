// src/api.js
const API_URL = 'http://localhost:4000/api';

// Crear usuario (donante / beneficiario / voluntario)
export async function createUser(data) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creando usuario');
  return res.json();
}

// Obtener todas las donaciones
export async function getDonations() {
  const res = await fetch(`${API_URL}/donations`);
  if (!res.ok) throw new Error('Error obteniendo donaciones');
  return res.json();
}

// Crear donación (donante)
export async function createDonation(data) {
  const res = await fetch(`${API_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creando donación');
  return res.json();
}

// Beneficiario solicita donación
export async function requestDonation(id, data) {
  const res = await fetch(`${API_URL}/donations/${id}/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error solicitando donación');
  return res.json();
}

// Voluntario actualiza estado
export async function updateDonationStatus(id, data) {
  const res = await fetch(`${API_URL}/donations/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error actualizando estado');
  return res.json();
}
