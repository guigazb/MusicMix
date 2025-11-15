import artistsData from '../../artists.json' assert { type: 'json' };

export const artists = artistsData;

export function renderArtistCard(artist) {
  return `
    <div class="flex flex-col gap-3 pb-3 group cursor-pointer" onclick="window.open('${artist.linkStreaming}', '_blank')">
      <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg overflow-hidden">
        <div class="w-full h-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
             style="background-image:url('${artist.imagem}')"></div>
      </div>
      <div>
        <div class="flex justify-between items-center">
          <p class="text-gray-900 dark:text-white text-base font-medium leading-normal">${artist.artista}</p>
          <div class="flex items-center gap-1 text-primary">
            <span class="material-symbols-outlined !text-[16px] text-amber-400">star</span>
            <span class="text-sm font-bold text-gray-800 dark:text-gray-200">${artist.rating}</span>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">${artist.genero} • ${artist.origem}</p>
      </div>
    </div>`;
}