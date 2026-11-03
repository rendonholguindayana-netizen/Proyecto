
    document.addEventListener('DOMContentLoaded', () => {
      // Estado de filtros
      const filterState = {
        search: '',
        format: 'all',
        platform: 'all',
        mood: 'all'
      };

      // Elementos del DOM
      const cards = Array.from(document.querySelectorAll('.catalog-card'));
      const searchInput = document.getElementById('searchInput');
      const platformSelect = document.getElementById('platformSelect');
      const formatButtons = document.querySelectorAll('.format-btn');
      const moodButtons = document.querySelectorAll('.mood-btn');
      const visibleCounter = document.getElementById('visibleCounter');
      const resetBtn = document.getElementById('resetFiltersBtn');
      const noResults = document.getElementById('noResultsState');

      // Modal elements
      const modal = document.getElementById('filmModal');
      const modalBox = document.getElementById('modalBox');
      const modalCloseBtn = document.getElementById('modalCloseBtn');
      const modalTitle = document.getElementById('modalTitle');
      const modalDirector = document.getElementById('modalDirector');
      const modalSynopsis = document.getElementById('modalSynopsis');
      const modalScore = document.getElementById('modalScore');
      const modalMood = document.getElementById('modalMood');
      const modalFormatBadge = document.getElementById('modalFormatBadge');
      const modalYear = document.getElementById('modalYear');
      const modalPlatform = document.getElementById('modalPlatform');
      const modalAddWatchlist = document.getElementById('modalAddWatchlist');

      // Función principal de filtrado
      function applyFilters() {
        let visibleCount = 0;
        const query = filterState.search.toLowerCase().trim();

        cards.forEach(card => {
          const title = card.getAttribute('data-title').toLowerCase();
          const director = card.getAttribute('data-director').toLowerCase();
          const format = card.getAttribute('data-format');
          const platform = card.getAttribute('data-platform');
          const mood = card.getAttribute('data-mood');

          const matchesSearch = query === '' || title.includes(query) || director.includes(query);
          const matchesFormat = filterState.format === 'all' || format === filterState.format;
          const matchesPlatform = filterState.platform === 'all' || platform.includes(filterState.platform);
          const matchesMood = filterState.mood === 'all' || mood === filterState.mood;

          if (matchesSearch && matchesFormat && matchesPlatform && matchesMood) {
            card.classList.remove('hidden');
            visibleCount++;
          } else {
            card.classList.add('hidden');
          }
        });

        // Actualizar contador y estado vacío
        visibleCounter.textContent = visibleCount;
        if (visibleCount === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }

        // Mostrar u ocultar botón de reseteo si algún filtro está activo
        const isFiltered = filterState.search !== '' || filterState.format !== 'all' || filterState.platform !== 'all' || filterState.mood !== 'all';
        if (isFiltered) {
          resetBtn.classList.remove('hidden');
        } else {
          resetBtn.classList.add('hidden');
        }
      }

      // Eventos: Buscador
      searchInput.addEventListener('input', (e) => {
        filterState.search = e.target.value;
        applyFilters();
      });

      // Eventos: Formato
      formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          formatButtons.forEach(b => {
            b.classList.remove('bg-brand-graphite', 'text-white', 'border-brand-graphite');
            b.classList.add('bg-white', 'text-brand-graphite', 'border-slate-200');
          });
          btn.classList.remove('bg-white', 'text-brand-graphite', 'border-slate-200');
          btn.classList.add('bg-brand-graphite', 'text-white', 'border-brand-graphite');

          filterState.format = btn.getAttribute('data-filter');
          applyFilters();
        });
      });

      // Eventos: Plataforma
      platformSelect.addEventListener('change', (e) => {
        filterState.platform = e.target.value;
        applyFilters();
      });

      // Eventos: Moods
      moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          moodButtons.forEach(b => {
            b.classList.remove('bg-brand-gold/20', 'border-brand-gold/50', 'text-brand-goldDark', 'font-semibold');
            b.classList.add('bg-slate-100', 'text-slate-700', 'font-medium');
          });
          btn.classList.remove('bg-slate-100', 'text-slate-700', 'font-medium');
          btn.classList.add('bg-brand-gold/20', 'border-brand-gold/50', 'text-brand-goldDark', 'font-semibold');

          filterState.mood = btn.getAttribute('data-mood');
          applyFilters();
        });
      });

      // Evento: Limpiar Filtros
      resetBtn.addEventListener('click', () => {
        filterState.search = '';
        filterState.format = 'all';
        filterState.platform = 'all';
        filterState.mood = 'all';

        searchInput.value = '';
        platformSelect.value = 'all';

        formatButtons[0].click();
        moodButtons[0].click();
      });

      // Interacción con Botones de 'Guardar'
      document.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const svg = btn.querySelector('svg');
          if (btn.classList.contains('text-brand-gold')) {
            btn.classList.remove('text-brand-gold', 'border-brand-gold', 'bg-brand-gold/10');
            btn.classList.add('text-slate-400', 'border-slate-200');
            svg.setAttribute('fill', 'none');
          } else {
            btn.classList.add('text-brand-gold', 'border-brand-gold', 'bg-brand-gold/10');
            btn.classList.remove('text-slate-400', 'border-slate-200');
            svg.setAttribute('fill', 'currentColor');
          }
        });
      });

      // Lógica de Modal
      function openModal(card) {
        modalTitle.textContent = card.getAttribute('data-title');
        modalDirector.textContent = `Dirigida por ${card.getAttribute('data-director')}`;
        modalSynopsis.textContent = card.getAttribute('data-synopsis');
        modalScore.textContent = card.getAttribute('data-rating');
        modalMood.textContent = card.getAttribute('data-mood');
        modalFormatBadge.textContent = card.getAttribute('data-format');
        modalYear.textContent = card.getAttribute('data-year');
        modalPlatform.textContent = `Disponible en ${card.getAttribute('data-platform')}`;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-95');
        modalBox.classList.add('scale-100');
        document.body.classList.add('overflow-hidden');
      }

      function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-100');
        modalBox.classList.add('scale-95');
        document.body.classList.remove('overflow-hidden');
      }

      document.querySelectorAll('.btn-open-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.catalog-card');
          openModal(card);
        });
      });

      modalCloseBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Escape key to close modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });

      // Guardar desde el modal
      modalAddWatchlist.addEventListener('click', () => {
        modalAddWatchlist.textContent = '✓ En tu Colección';
        modalAddWatchlist.classList.add('bg-brand-gold', 'text-brand-graphiteDark');
        setTimeout(() => {
          modalAddWatchlist.textContent = '+ Añadir a Lista Personal';
          modalAddWatchlist.classList.remove('bg-brand-gold', 'text-brand-graphiteDark');
        }, 2000);
      });
    });
  