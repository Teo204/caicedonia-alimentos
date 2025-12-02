const API_URL = 'http://localhost:4000/api';

export async function createUser(data) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getDonations() {
  const res = await fetch(`${API_URL}/donations`);
  return res.json();
}

export async function createDonation(data) {
  const res = await fetch(`${API_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function requestDonation(id, data) {
  const res = await fetch(`${API_URL}/donations/${id}/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDonationStatus(id, data) {
  const res = await fetch(`${API_URL}/donations/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
