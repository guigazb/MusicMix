import { updateArtist } from '../api/artistsApi.js';
import { allArtists, setAllArtists } from '../data/artists.js';
import { showToast } from '../ui/toast.js';
import { renderGrid } from '../ui/render.js';

export async function handleUpdate(id, data) {
  try {
    const updated = await updateArtist(id, data);
    const index = allArtists.findIndex(a => a.id === id);

    // Cria uma nova array com o artista atualizado
    const newArtists = [...allArtists];
    newArtists[index] = updated;
    setAllArtists(newArtists);
    allArtists[index] = updated;
    showToast('Artista atualizado!');
    renderGrid();
  } catch (err) {
    showToast('Erro ao atualizar', false);
  }
}