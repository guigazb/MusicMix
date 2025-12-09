import { allArtists } from '../data/artists.js';
import { renderGrid } from '../ui/render.js';

export function applyFilters() {
  const query = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
  const selectedGenre = document.getElementById('genre-filter')?.value || 'Todos gêneros';
  const minRating = Number(document.getElementById('rating-slider')?.value || 0);
  const sortValue = document.getElementById('sort-by')?.value || 'Destaques';

  let filtered = allArtists.filter(artist => {
    const matchesSearch = artist.artista.toLowerCase().includes(query);
    const matchesGenre = selectedGenre === 'Todos gêneros' || artist.genero === selectedGenre;
    const matchesRating = artist.rating >= minRating;
    return matchesSearch && matchesGenre && matchesRating;
  });

  // Ordenação
  if (sortValue.includes('Alta')) {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortValue.includes('Baixa')) {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  renderGrid(filtered);
}