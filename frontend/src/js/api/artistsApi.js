const API_URL = 'http://localhost:3000/api/artists';

export async function fetchAll(search = '') {
  const url = search ? `${API_URL}?q=${encodeURIComponent(search)}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro na API');
  return res.json();
}

export async function createArtist(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao criar');
  return res.json();
}

export async function updateArtist(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar');
  return res.json();
}

export async function deleteArtist(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar');
  return res.status === 204;
}