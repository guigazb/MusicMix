import { updateArtist } from '../api/artistsApi.js';
import { allArtists } from '../data/artists.js';
import { showToast } from '../ui/toast.js';
import { renderGrid } from '../ui/render.js';

export async function handleUpdate(id, data) {
  try {
    const updated = await updateArtist(id, data);
    const index = allArtists.findIndex(a => a.id === id);
    allArtists[index] = updated;
    showToast('Artista atualizado!');
    renderGrid();
  } catch (err) {
    showToast('Erro ao atualizar', false);
  }
}