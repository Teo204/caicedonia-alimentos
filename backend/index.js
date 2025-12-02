// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---- Datos en memoria ----
let users = [];
let nextUserId = 1;

let donations = [];
let nextDonationId = 1;

// ---- Rutas ----

// Registrar usuario (donante / beneficiario / voluntario)
app.post('/api/users', (req, res) => {
  const { name, role, location } = req.body;
  if (!name || !role) {
    return res.status(400).json({ message: 'Nombre y rol son obligatorios' });
  }
  const newUser = { id: nextUserId++, name, role, location: location || '' };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Crear donación (Donante)
app.post('/api/donations', (req, res) => {
  const { donorId, title, description, quantity, expirationDate, location } = req.body;

  if (!donorId || !title) {
    return res.status(400).json({ message: 'donorId y title son obligatorios' });
  }

  const newDonation = {
    id: nextDonationId++,
    donorId,
    title,
    description: description || '',
    quantity: quantity || 1,
    expirationDate: expirationDate || null,
    location: location || '',
    status: 'PUBLICADA',          // PUBLICADA / RESERVADA / EN_RUTA / ENTREGADA
    beneficiaryId: null,
    volunteerId: null,
  };

  donations.push(newDonation);
  res.status(201).json(newDonation);
});

// Listar donaciones
app.get('/api/donations', (req, res) => {
  res.json(donations);
});

// Beneficiario solicita donación
app.post('/api/donations/:id/request', (req, res) => {
  const donationId = parseInt(req.params.id, 10);
  const { beneficiaryId } = req.body;

  const donation = donations.find(d => d.id === donationId);
  if (!donation) return res.status(404).json({ message: 'Donación no encontrada' });

  donation.status = 'RESERVADA';
  donation.beneficiaryId = beneficiaryId;
  res.json(donation);
});

// Voluntario actualiza estado (EN_RUTA / ENTREGADA)
app.post('/api/donations/:id/status', (req, res) => {
  const donationId = parseInt(req.params.id, 10);
  const { status, volunteerId } = req.body;

  const donation = donations.find(d => d.id === donationId);
  if (!donation) return res.status(404).json({ message: 'Donación no encontrada' });

  donation.status = status;
  if (volunteerId) donation.volunteerId = volunteerId;
  res.json(donation);
});

// ---- Arrancar servidor ----
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
