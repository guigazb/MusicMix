import { allArtists } from '../data/artists.js';

export function renderArtistCard(artist) {
  return `
    <div class="artist-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-5" data-id="${artist.id}">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">${artist.artista}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">${artist.genero} • ${artist.origem}</p>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-amber-500 text-xl">★</span>
          <span class="font-bold">${artist.rating.toFixed(1)}</span>
        </div>
      </div>
      ${artist.albumPrincipal ? `<p class="text-xs text-gray-500 mb-3">Álbum: ${artist.albumPrincipal}</p>` : ''}

      <div class="flex gap-3 mt-4">
        <button class="edit-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">Editar</button>
        <button class="delete-btn flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium">Excluir</button>
        ${artist.linkStreaming 
          ? `<a href="${artist.linkStreaming}" target="_blank" rel="noopener noreferrer" class="streaming-btn flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium text-center transition">
               Ouvir no Spotify
             </a>`
          : ''
        }
      </div>
    </div>
  `;
}

export function renderGrid(filtered = allArtists) {
  const grid = document.getElementById('artists-grid');
  grid.innerHTML = filtered.length
    ? filtered.map(renderArtistCard).join('')
    : '<p class="col-span-full text-center text-gray-500 py-10">Nenhum artista encontrado</p>';
}