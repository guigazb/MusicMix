import './tailwind-config.js';        
import { artists, renderArtistCard } from './artists.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  
  const html = `
    <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <div class="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">

            <!-- Header -->
            <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-black/10 dark:border-white/10 px-4 sm:px-10 py-3">
              <div class="flex items-center gap-4 text-gray-800 dark:text-white">
                <div class="size-4 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">MusicMix</h2>
              </div>

              <div class="flex items-center gap-4 flex-1 justify-end">
                <!-- Busca -->
                <label class="flex flex-col min-w-40 !h-10 max-w-64">
                  <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div class="text-gray-500 dark:text-gray-400 flex border-none bg-black/5 dark:bg-white/10 items-center justify-center pl-4 rounded-l-lg">
                      <span class="material-symbols-outlined">search</span>
                    </div>
                    <input id="search-input"
                           class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-0 border-none bg-black/5 dark:bg-white/10 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                           placeholder="Procure Artistas..." />
                  </div>
                </label>

                <!-- Botão Dark Mode -->
                <button id="theme-toggle"
                        class="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                  <span class="material-symbols-outlined text-gray-700 dark:text-gray-300">dark_mode</span>
                </button>
              </div>
            </header>

            <!-- Hero -->
            <main>
              <div class="@container">
                <div class="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row @[864px]:py-20">
                  <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-full"
                       style="background-image:url('https://lh3.googleusercontent.com/aida-public/AB6AXuCga_4NuOpd9sElseibb2IsR3dgsndAczCiuEE3ViIyu1C2FyUA9qPJB6ailaf6JTdUgQjm2UF3es_en6Bu3ZqfPxyV9PZviRjd8Z5hlxhs83WB7rX9CFhtT34NRhWHYHvMVJEDozIQWYbltLiHDYk_2SdGlqa3L5wyAIyMn2qJ5quRcpFarow35dwqHlJjWitn9GUxLKNld1l3VwEu7Jljhj8XwXKEtxFRBDbQbxj-ZxuNSuNR-l66cu-qiE7uVM14kwLF7Ak0wTUi')"></div>
                  <div class="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
                    <div class="flex flex-col gap-2 text-left">
                      <h1 class="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">Descubra seu novo Artista Favorito</h1>
                      <h2 class="text-gray-600 dark:text-gray-300 text-sm font-normal leading-normal @[480px]:text-base">Explore nosso catálogo selecionado de artistas diversos e talentosos de todo o mundo.</h2>
                    </div>
                    <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                      <span class="truncate">Descubra artistas</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Filtros -->
              <div class="px-4 py-6 border-y border-solid border-black/10 dark:border-white/10">
                <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div class="flex flex-col md:flex-row gap-4 flex-wrap flex-1">
                    <div class="flex-grow">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="genre-filter">Filtro por Gênero</label>
                      <select id="genre-filter" class="w-full rounded-lg border-none bg-black/5 dark:bg-white/30 text-gray-800 dark:text-black focus:outline-0 focus:ring-2 focus:ring-primary h-10 px-3">
                        <option>Todos gêneros</option>
                        <option>Pop</option>
                        <option>Rock</option>
                        <option>Jazz</option>
                        <option>Chanson</option>
                        <option>Eletrônica</option>
                        <option>R&B</option>
                        <option>MPB</option>
                        <option>Axé</option>
                        <option>Bossa Nova</option>
                        <option>Metal</option>
                        <option>Punk</option>
                        <option>Schlager</option>
                        <option>Ranchera</option>
                        <option>Balada</option>
                        <option>Tejano</option>
                        <option>Afrobeat</option>
                        <option>K-Pop</option>
                        <option>Mandopop</option>
                        <option>Cantopop</option>
                        <option>Filme</option>
                        <option>Playback</option>
                        <option>Clássico</option>
                        <option>J-Pop</option>
                        <option>Pop-Punk</option>
                        <option>Alternative Rock</option>
                        <option>Synthpop</option>
                        <option>Psicodélico</option>
                        <option>Indie Pop</option>
                        <option>Flamenco Pop</option>
                        <option>Ópera Pop</option>
                        <option>Folk Rock</option>
                        <option>Trap</option>
                        <option>Folk</option>
                        <option>Afro-Jazz</option>
                        <option>Hip-Hop</option>
                        <option>Hardcore Hip-Hop</option>
                        <option>Country</option>
                        <option>House</option>
                        <option>Vallenato</option>
                      </select>
                    </div>
                    <div class="flex-grow min-w-[200px]">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="rating-slider">Avaliação Mínima</label>
                      <input id="rating-slider" class="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer dark:bg-white/10 accent-primary" type="range" min="0" max="5" step="0.5" value="0" />
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="sort-by">Ordene por</label>
                    <select id="sort-by" class="w-full md:w-auto rounded-lg border-none bg-black/5 dark:bg-white/30 text-gray-800 dark:text-black focus:outline-0 focus:ring-2 focus:ring-primary h-10 px-3">
                      <option>Destaques</option>
                      <option>Avaliação (Alta para Baixa)</option>
                      <option>Avaliação (Baixa para Alta)</option>
                    </select>
                  </div>
                </div>
              </div>

              <h2 class="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Destaques</h2>

              <div id="artists-grid" class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4"></div>
            </main>

            <!-- Footer -->
            <footer class="flex flex-col gap-6 px-5 py-10 text-center @container border-t border-solid border-black/10 dark:border-white/10 mt-10">
              <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a href="#" class="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors">Sobre Nós</a>
                <a href="#" class="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors">Contato</a>
                <a href="#" class="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors">Termos de Serviço</a>
              </div>
              <div class="flex flex-wrap justify-center gap-4">
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">alternate_email</span></a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">photo_camera</span></a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">group</span></a>
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                © 2025 MusicMix. All rights reserved. By Guilherme Barrio & Beneilton Martins.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  `;

  app.innerHTML = html;

  // -------------------------------------------------
  // 1. Dark / Light toggle
  // -------------------------------------------------
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const icon = themeBtn.querySelector('span');

  const setTheme = (dark) => {
    if (dark) {
      htmlEl.classList.add('dark');
      icon.textContent = 'light_mode';
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      icon.textContent = 'dark_mode';
      localStorage.setItem('theme', 'light');
    }
  };

  // Detecta preferência salva ou do SO
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved === 'dark' || (!saved && prefersDark));

  themeBtn.addEventListener('click', () => setTheme(!htmlEl.classList.contains('dark')));

  // -------------------------------------------------
  // 2. Busca + Filtros + Ordenação
  // -------------------------------------------------
  const searchInput = document.getElementById('search-input');
  const genreFilter = document.getElementById('genre-filter');
  const ratingSlider = document.getElementById('rating-slider');
  const sortBy = document.getElementById('sort-by');
  const grid = document.getElementById('artists-grid');

  const render = () => {
    const query = searchInput.value.toLowerCase().trim();

    let list = artists.filter(a => {
      const byName = a.artista.toLowerCase().includes(query);
      const byGenre = genreFilter.value === 'Todos gêneros' || a.genero === genreFilter.value;
      const byRating = a.rating >= Number(ratingSlider.value);
      return byName && byGenre && byRating;
    });

    // Ordenação
    if (sortBy.value === 'Avaliação (Alta para Baixa)') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy.value === 'Avaliação (Baixa para Alta)') list.sort((a, b) => a.rating - b.rating);

    grid.innerHTML = list.length
      ? list.map(renderArtistCard).join('')
      : '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">Nenhum artista encontrado.</p>';
  };

  searchInput.addEventListener('input', render);
  genreFilter.addEventListener('change', render);
  ratingSlider.addEventListener('input', render);
  sortBy.addEventListener('change', render);

  render(); // primeira renderização
});