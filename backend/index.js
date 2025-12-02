const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos en memoria (después puedes pasar a JSON o DB)
let donations = [];
let nextDonationId = 1;

// Roles: donante, beneficiario, voluntario
// Por ahora simulamos usuarios simples:
let users = [];
let nextUserId = 1;

// Rutas

// Registrar usuario
app.post('/api/users', (req, res) => {
  const { name, role, location } = req.body;
  const newUser = { id: nextUserId++, name, role, location };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Crear donación (Donante)
app.post('/api/donations', (req, res) => {
  const { donorId, title, description, quantity, expirationDate, location } = req.body;
  const newDonation = {
    id: nextDonationId++,
    donorId,
    title,
    description,
    quantity,
    expirationDate,
    location,
    status: 'PUBLICADA', // PUBLICADA / RESERVADA / EN_RUTA / ENTREGADA
    beneficiaryId: null,
    volunteerId: null
  };
  donations.push(newDonation);
  res.status(201).json(newDonation);
});

// Listar donaciones disponibles (Beneficiarios)
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

// Voluntario actualiza estado
app.post('/api/donations/:id/status', (req, res) => {
  const donationId = parseInt(req.params.id, 10);
  const { status, volunteerId } = req.body; // EN_RUTA / ENTREGADA
  const donation = donations.find(d => d.id === donationId);
  if (!donation) return res.status(404).json({ message: 'Donación no encontrada' });
  donation.status = status;
  if (volunteerId) donation.volunteerId = volunteerId;
  res.json(donation);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
