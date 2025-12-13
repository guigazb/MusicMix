import { createArtist } from '../api/artistsApi.js';
import { allArtists, setAllArtists } from '../data/artists.js';
import { showToast } from '../ui/toast.js';
import { renderGrid } from '../ui/render.js';

export async function handleCreate(data) {
  try {
    const novo = await createArtist(data);
    const updated = [...allArtists, novo]; // Adiciona o novo artista
    setAllArtists(updated); // Atualiza a memória
    allArtists.push(novo);
    showToast('Artista adicionado!');
    renderGrid();
  } catch (err) {
    showToast('Erro ao criar artista', false);
  }
}