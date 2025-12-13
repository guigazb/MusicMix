import "./tailwind-config.js";
import { allArtists } from "./data/artists.js";
import { fetchAll } from "./api/artistsApi.js";
import { renderGrid } from "./ui/render.js";
import { openModal, closeModal, getFormData } from "./ui/modal.js";
import { showToast } from "./ui/toast.js";
import { handleCreate } from "./crud/create.js";
import { handleUpdate } from "./crud/update.js";
import { handleDelete } from "./crud/delete.js";
import { applyFilters } from "./filters/filters.js";

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-gray-50 dark:bg-gray-950">
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

              <div id="artists-grid" class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 p-4"></div>

              <!-- Modal com campo de linkStreaming -->
              <div id="artist-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4">
                  <div class="flex justify-between items-center mb-8">
                    <h3 id="modal-title" class="text-3xl font-bold text-gray-900 dark:text-white">Adicionar Artista</h3>
                    <button id="close-modal" class="text-4xl text-gray-500 hover:text-gray-700">&times;</button>
                  </div>
                  <form id="artist-form" class="space-y-6">
                    <input type="hidden" id="artist-id">
                    <input type="text" id="input-artista" required placeholder="Nome do artista" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <input type="text" id="input-genero" required placeholder="Gênero" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <input type="text" id="input-origem" required placeholder="Origem (país)" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <input type="text" id="input-album" placeholder="Álbum principal (opcional)" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <input type="url" id="input-streaming" placeholder="Link do Spotify (opcional)" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <input type="number" id="input-rating" step="0.1" min="0" max="5" value="4.5" class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"/>
                    <div class="flex gap-6 pt-6">
                      <button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-xl transition text-xl">Salvar</button>
                      <button type="button" id="cancel-modal" class="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-5 rounded-xl transition text-xl">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Toast -->
              <div id="toast" class="fixed bottom-5 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl text-white font-bold shadow-2xl z-50 hidden transition-all"></div>

              <!-- Botão + -->
              <button id="add-artist-btn" class="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white text-5xl font-bold rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110">+</button>
            </main>

            <!-- Footer -->
            <footer class="flex flex-col gap-6 px-5 py-10 text-center border-t border-solid border-black/10 dark:border-white/10 mt-10">
              <p class="text-gray-600 dark:text-gray-400 text-base">
                © 2025 MusicMix. All rights reserved. By Guilherme Barrio & Beneilton Martins.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;

  // Carregar artistas
  if (allArtists.length === 0) {
    try {
      const data = await fetchAll();
      allArtists.push(...data);
      renderGrid();
    } catch (err) {
      showToast("Erro ao conectar com o servidor", false);
    }
  }

  // Eventos
  $("#add-artist-btn").addEventListener("click", () => openModal("create"));
  $("#close-modal").addEventListener("click", closeModal);
  $("#cancel-modal").addEventListener("click", closeModal);

  // Event delegation para botões dinâmicos
  $("#artists-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".artist-card");
    if (!card) return;
    const id = parseInt(card.dataset.id);
    const artist = allArtists.find(a => a.id === id);

    if (e.target.classList.contains("edit-btn")) {
      openModal("edit", artist);
    }
    if (e.target.classList.contains("delete-btn")) {
      handleDelete(id, artist.artista);
    }
  });

  // Formulário
  $("#artist-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData();
    try {
      if (data.id) {
        await handleUpdate(data.id, data);
      } else {
        await handleCreate(data);
      }
      closeModal();
      applyFilters();
    } catch (err) {
      showToast("Erro ao salvar artista", false);
    }
  });

  // Filtros
  ["search-input", "genre-filter", "rating-slider", "sort-by"].forEach(id => {
    $(`#${id}`)?.addEventListener("input", applyFilters);
    $(`#${id}`)?.addEventListener("change", applyFilters);
  });

  applyFilters();
});