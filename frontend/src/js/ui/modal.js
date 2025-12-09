let currentEditId = null;
let onSaveCallback = null;

export function openModal(mode = 'create', artist = null, callback) {
  const modal = document.getElementById('artist-modal');
  const title = document.getElementById('modal-title');
  onSaveCallback = callback;

  if (mode === 'create') {
    title.textContent = 'Adicionar Artista';
    document.getElementById('artist-form').reset();
    currentEditId = null;
  } else {
    title.textContent = 'Editar Artista';
    document.getElementById('input-artista').value = artist.artista;
    document.getElementById('input-genero').value = artist.genero;
    document.getElementById('input-origem').value = artist.origem;
    document.getElementById('input-album').value = artist.albumPrincipal || '';
    document.getElementById('input-rating').value = artist.rating;
    currentEditId = artist.id;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeModal() {
  document.getElementById('artist-modal').classList.add('hidden');
  document.getElementById('artist-modal').classList.remove('flex');
  currentEditId = null;
}

export function getFormData() {
  return {
    id: currentEditId,
    artista: document.getElementById('input-artista').value.trim(),
    genero: document.getElementById('input-genero').value.trim(),
    origem: document.getElementById('input-origem').value.trim(),
    albumPrincipal: document.getElementById('input-album').value.trim() || null,
    rating: parseFloat(document.getElementById('input-rating').value) || 0
  };
}

export { currentEditId };