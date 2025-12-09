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
const $$ = (selector) => document.querySelectorAll(selector);

const on = (element, event, handler) => {
  element?.addEventListener(event, handler);
};

const delegate = (parent, event, selector, handler) => {
  parent?.addEventListener(event, (e) => {
    if (e.target.matches(selector) || e.target.closest(selector)) {
      handler(e);
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  app.innerHTML = `
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

              <div id="artist-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
                  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all scale-95">
                    <div class="flex justify-between items-center mb-6">
                      <h3 id="modal-title" class="text-2xl font-bold text-gray-900 dark:text-white">Adicionar Artista</h3>
                      <button id="close-modal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">×</button>
                    </div>

                    <form id="artist-form">
                      <input type="hidden" id="artist-id" value="">

                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Artista</label>
                          <input type="text" id="input-artista" required class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Anitta">
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gênero</label>
                          <input type="text" id="input-genero" required class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Funk">
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origem</label>
                          <input type="text" id="input-origem" required class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Brasil">
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Álbum Principal</label>
                          <input type="text" id="input-album" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Bang">
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (0 a 5)</label>
                          <input type="number" id="input-rating" step="0.1" min="0" max="5" value="4.5" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none">
                        </div>
                      </div>

                      <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition">Salvar</button>
                        <button type="button" id="cancel-modal" class="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-bold py-3 rounded-lg transition">Cancelar</button>
                      </div>
                    </form>
                  </div>
                </div>

                <!-- Toast de feedback -->
                <div id="toast" class="fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-bold shadow-lg z-50 hidden transition-all"></div>

                <!-- Botão flutuante para adicionar -->
                <button id="add-artist-btn" class="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14 shadow-2xl flex items-center justify-center text-3xl font-bold transition transform hover:scale-110">+</button>

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

  if (allArtists.length === 0) {
    try {
      const data = await fetchAll();
      allArtists.push(...data);
      renderGrid(allArtists);
      console.log("Artistas carregados:", allArtists.length);
    } catch (err) {
      showToast("Erro ao conectar com o servidor", false);
      $("#artists-grid").innerHTML =
        '<p class="col-span-full text-center text-red-500 py-10">Erro ao carregar artistas</p>';
    }
  }

  // ==================== Eventos principais ====================
  on($("#add-artist-btn"), "click", () => openModal("create"));
  on($("#close-modal"), "click", closeModal);
  on($("#cancel-modal"), "click", closeModal);

  // ==================== Event Delegation (editar/excluir) ====================
  delegate($("#artists-grid"), "click", ".edit-btn", (e) => {
    const card = e.target.closest(".artist-card");
    const id = parseInt(card.dataset.id);
    const artist = allArtists.find((a) => a.id === id);
    if (artist) openModal("edit", artist);
  });

  delegate($("#artists-grid"), "click", ".delete-btn", (e) => {
    const card = e.target.closest(".artist-card");
    const id = parseInt(card.dataset.id);
    const artist = allArtists.find((a) => a.id === id);
    if (artist) handleDelete(id, artist.artista);
  });

  // ==================== Formulário (criar/editar) ====================
  on($("#artist-form"), "submit", async (e) => {
    e.preventDefault();
    const formData = getFormData();

    try {
      if (formData.id) {
        await handleUpdate(formData.id, formData);
      } else {
        await handleCreate(formData);
      }
      closeModal();
      applyFilters(); // atualiza a lista com filtros ativos
    } catch (err) {
      showToast("Erro ao salvar artista", false);
    }
  });

  // ==================== Filtros e busca ====================
  const filterElements = [
    "search-input",
    "genre-filter",
    "rating-slider",
    "sort-by",
  ];
  filterElements.forEach((id) => {
    const el = $(`#${id}`);
    if (el) {
      el.addEventListener("input", applyFilters);
      el.addEventListener("change", applyFilters);
    }
  });

  applyFilters();
});
