import { deleteArtist } from '../api/artistsApi.js';
import { allArtists } from '../data/artists.js';
import { showToast } from '../ui/toast.js';
import { renderGrid } from '../ui/render.js';

export async function handleDelete(id, name) {
  if (!confirm(`Excluir "${name}"?`)) return;
  try {
    await deleteArtist(id);
    allArtists = allArtists.filter(a => a.id !== id);
    showToast(`${name} excluído!`);
    renderGrid();
  } catch (err) {
    showToast('Erro ao excluir', false);
  }
}