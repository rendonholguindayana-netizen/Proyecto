
    // Initial Datasets
    let catalogData = [
      {
        id: "mov-1",
        title: "Dune: Parte Dos",
        director: "Denis Villeneuve",
        type: "Película",
        platform: "Max",
        score: "9.2",
        mood: "Que me vuele la cabeza",
        status: "Publicado",
        synopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia."
      },
      {
        id: "mov-2",
        title: "Past Lives",
        director: "Celine Song",
        type: "Película",
        platform: "Filmin",
        score: "8.9",
        mood: "Mantita & Helado",
        status: "Publicado",
        synopsis: "Nora y Hae Sung, dos amigos de la infancia profundamente conectados, se separan después de que la familia de Nora emigra de Corea del Sur."
      },
      {
        id: "mov-3",
        title: "Severance",
        director: "Dan Erickson / Ben Stiller",
        type: "Serie",
        platform: "Apple TV+",
        score: "9.4",
        mood: "Que me vuele la cabeza",
        status: "Publicado",
        synopsis: "Mark lidera un equipo de oficinistas cuyos recuerdos han sido divididos quirúrgicamente entre su vida laboral y su vida personal."
      },
      {
        id: "mov-4",
        title: "The Bear (T3)",
        director: "Christopher Storer",
        type: "Serie",
        platform: "Max",
        score: "9.0",
        mood: "Adrenalina Pura",
        status: "Publicado",
        synopsis: "Carmy lucha por elevar el modesto restaurante familiar a una estrella Michelin bajo una presión culinaria implacable."
      },
      {
        id: "mov-5",
        title: "Anatomía de una caída",
        director: "Justine Triet",
        type: "Película",
        platform: "Filmin",
        score: "8.7",
        mood: "Cine de Autor",
        status: "Borrador",
        synopsis: "Una mujer es sospechosa del asesinato de su marido en un chalé remoto de los Alpes, con su hijo ciego como único testigo."
      }
    ];

    let moderationQueue = [
      {
        id: "mod-101",
        user: "Javier_FilmBuff",
        avatar: "JF",
        movie: "Dune: Parte Dos",
        rating: 5,
        mood: "🧠 Que me vuele la cabeza",
        comment: "El tercer acto con Paul marchando hacia el sur cambia todo el destino del imperio de una forma visceral. Denis es el Kubrick de nuestra era.",
        isSpoiler: false,
        timestamp: "Hace 6 min"
      },
      {
        id: "mod-102",
        user: "Carla_Bresson",
        avatar: "CB",
        movie: "Severance",
        rating: 4,
        mood: "🧠 Que me vuele la cabeza",
        comment: "¡Cuidado! En el capítulo final descubren que Helly es en realidad la hija del CEO de Lumon y nadie lo vio venir.",
        isSpoiler: true,
        timestamp: "Hace 14 min"
      },
      {
        id: "mod-103",
        user: "Lucia_Noire",
        avatar: "LN",
        movie: "Past Lives",
        rating: 5,
        mood: "🍦 Mantita & Helado",
        comment: "Ese silencio al final en el taxi esperando el Uber me destrozó por completo. La mejor película romántica de la última década.",
        isSpoiler: false,
        timestamp: "Hace 28 min"
      },
      {
        id: "mod-104",
        user: "MarcosVFX",
        avatar: "MV",
        movie: "The Bear (T3)",
        rating: 3,
        mood: "⚡ Adrenalina Pura",
        comment: "Sentí que el ritmo decayó un poco en los primeros tres episodios pero la fotografía en primeros planos se mantiene impecable.",
        isSpoiler: false,
        timestamp: "Hace 42 min"
      }
    ];

    let usersList = [
      {
        id: "usr-1",
        name: "Elena Rostova",
        email: "elena.rostova@spotlight.cine",
        role: "Super Admin",
        roleTagColor: "bg-primary-container text-on-primary-container",
        dateJoined: "12 Ene 2023",
        lastActive: "En línea ahora",
        status: "Activo"
      },
      {
        id: "usr-2",
        name: "Mateo Silveira",
        email: "mateo.silveira@spotlight.cine",
        role: "Crítico Editorial",
        roleTagColor: "bg-secondary-container text-on-secondary-container",
        dateJoined: "04 Mar 2023",
        lastActive: "Hace 18 min",
        status: "Activo"
      },
      {
        id: "usr-3",
        name: "Sofía Valenzuela",
        email: "sofia.val@cinephile.net",
        role: "Crítico Editorial",
        roleTagColor: "bg-secondary-container text-on-secondary-container",
        dateJoined: "22 Sep 2023",
        lastActive: "Hace 2 horas",
        status: "Activo"
      },
      {
        id: "usr-4",
        name: "Rodrigo Mendez",
        email: "rodrigo.m@gmail.com",
        role: "Miembro Cinéfilo",
        roleTagColor: "bg-surface-container-high text-on-surface-variant",
        dateJoined: "15 Oct 2024",
        lastActive: "Ayer",
        status: "Activo"
      },
      {
        id: "usr-5",
        name: "Ignacio Bell",
        email: "ignacio.bot@test.org",
        role: "Miembro Cinéfilo",
        roleTagColor: "bg-surface-container-high text-on-surface-variant",
        dateJoined: "01 Nov 2024",
        lastActive: "Hace 4 días",
        status: "Suspendido"
      }
    ];

    // Toast Notification System
    function showToast(message, type = "info") {
      const container = document.getElementById("toast-container");
      const toast = document.createElement("div");
      toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-body-sm text-body-sm transition-all transform duration-300 translate-y-2 opacity-0 z-50 ${type === "success" ? "bg-slate-900 text-white border border-amber-500/40" :
          type === "warning" ? "bg-secondary-container text-on-secondary-container font-semibold border border-outline-variant/40" :
            type === "error" ? "bg-error text-on-error shadow-error/20" :
              "bg-surface-container-highest text-on-surface"
        }`;

      const iconName = type === "success" ? "check_circle" :
        type === "warning" ? "warning" :
          type === "error" ? "error" : "info";

      toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] ${type === 'success' ? 'text-amber-400' : ''}">${iconName}</span>
      <span>${message}</span>
    `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
      }, 20);

      setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    // Tab Switcher
    function switchTab(tabId) {
      const tabs = ["tab-catalog", "tab-moderation", "tab-analytics", "tab-users"];
      tabs.forEach(t => {
        const el = document.getElementById(t);
        const btn = document.getElementById(`btn-${t}`);
        if (t === tabId) {
          el.classList.remove("hidden");
          if (btn) {
            btn.className = "tab-pill px-4 py-2.5 rounded-lg font-label-prominent text-label-prominent flex items-center gap-2 transition-all bg-primary-container text-on-primary-container shadow-sm font-bold";
          }
        } else {
          el.classList.add("hidden");
          if (btn) {
            btn.className = "tab-pill px-4 py-2.5 rounded-lg font-label-prominent text-label-prominent flex items-center gap-2 transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container";
          }
        }
      });

      // Sync mode pill styling
      const pubBtn = document.getElementById("btn-mode-public");
      const backBtn = document.getElementById("btn-mode-backoffice");
      if (pubBtn && backBtn) {
        backBtn.className = "px-3 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider bg-primary-container text-on-primary-container font-bold shadow-sm transition-all";
        pubBtn.className = "px-3 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all";
      }
    }

    // Sidebar navigation handler
    function navigateSidebar(tabId, buttonEl) {
      switchTab(tabId);
      // Update active state in sidebar
      const allSidebarBtns = document.querySelectorAll("#sidebar-nav .sidebar-item");
      allSidebarBtns.forEach(btn => {
        btn.className = "sidebar-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-label-prominent text-label-prominent text-left";
      });
      if (buttonEl) {
        buttonEl.className = "sidebar-item w-full flex items-center gap-3 px-4 py-3 transition-all bg-primary-container text-on-primary-container font-bold rounded-xl shadow-sm text-left";
      }
    }

    // KPI card click actions
    function filterByKpi(type) {
      if (type === 'catalog') {
        switchTab('tab-catalog');
        document.getElementById('filter-status').value = 'all';
        filterCatalog();
        showToast("Visualizando catálogo completo", "info");
      } else if (type === 'reviews') {
        switchTab('tab-analytics');
        showToast("Mostrando métricas de retención y reseñas", "info");
      }
    }

    // Catalog Table Rendering & Filtering
    function renderCatalog(items = catalogData) {
      const tbody = document.getElementById("catalog-table-body");
      const emptyState = document.getElementById("catalog-empty");
      const resultCount = document.getElementById("catalog-result-count");

      tbody.innerHTML = "";

      if (items.length === 0) {
        emptyState.classList.remove("hidden");
      } else {
        emptyState.classList.add("hidden");
      }

      resultCount.textContent = `Mostrando ${items.length} obra${items.length === 1 ? '' : 's'} en el catálogo`;

      items.forEach(movie => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-surface-container-low transition-colors";

        let platformBadgeClass = "bg-surface-container text-on-surface";
        if (movie.platform === "Max") platformBadgeClass = "bg-[#4900A0] text-white";
        if (movie.platform === "Apple TV+") platformBadgeClass = "bg-[#111111] text-white";
        if (movie.platform === "Netflix") platformBadgeClass = "bg-[#E50914] text-white";
        if (movie.platform === "Prime Video") platformBadgeClass = "bg-[#00A8E1] text-white";
        if (movie.platform === "Filmin") platformBadgeClass = "bg-[#00C399] text-[#00271F]";

        const statusBadge = movie.status === "Publicado"
          ? '<span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-label-badge font-bold">Publicado</span>'
          : '<span class="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge font-bold">Borrador</span>';

        tr.innerHTML = `
        <td class="py-4 px-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-14 rounded bg-surface-container-high flex-shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
              <span class="material-symbols-outlined text-tertiary text-lg">theaters</span>
            </div>
            <div>
              <p class="font-label-prominent text-label-prominent text-on-surface">${movie.title}</p>
              <p class="font-label-meta text-label-meta text-tertiary">Dir. ${movie.director}</p>
            </div>
          </div>
        </td>
        <td class="py-4 px-4 font-label-prominent text-label-prominent text-on-surface-variant">${movie.type}</td>
        <td class="py-4 px-4">
          <span class="px-2 py-0.5 rounded font-label-badge text-label-badge font-bold ${platformBadgeClass}">${movie.platform}</span>
        </td>
        <td class="py-4 px-4">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-meta text-label-meta">${movie.mood}</span>
        </td>
        <td class="py-4 px-4">
          <div class="flex items-center gap-1 text-primary font-bold">
            <span class="material-symbols-outlined text-[17px]">star</span>
            <span>${movie.score}</span>
          </div>
        </td>
        <td class="py-4 px-4">${statusBadge}</td>
        <td class="py-4 px-6 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="previewMovie('${movie.id}')" title="Previsualizar Ficha" class="p-1.5 rounded-lg text-tertiary hover:text-on-surface hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-[20px]">visibility</span>
            </button>
            <button onclick="editMovie('${movie.id}')" title="Editar Obra" class="p-1.5 rounded-lg text-primary hover:bg-secondary-container transition-colors">
              <span class="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <button onclick="deleteMovie('${movie.id}')" title="Eliminar Obra" class="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors">
              <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
        </td>
      `;
        tbody.appendChild(tr);
      });

      const metricCount = document.getElementById("metric-catalog-count");
      if (metricCount) metricCount.textContent = catalogData.length;
    }

    function filterCatalog() {
      const q = (document.getElementById("catalog-search").value || "").toLowerCase().trim();
      const plat = document.getElementById("filter-platform").value;
      const stat = document.getElementById("filter-status").value;

      const filtered = catalogData.filter(item => {
        const matchQuery = !q || item.title.toLowerCase().includes(q) || item.director.toLowerCase().includes(q);
        const matchPlat = plat === "all" || item.platform === plat;
        const matchStat = stat === "all" || item.status === stat;
        return matchQuery && matchPlat && matchStat;
      });

      renderCatalog(filtered);
    }

    function changeCatalogPage(delta) {
      showToast("Catálogo dentro de la página única 1 de 1", "info");
    }

    // Movie CRUD Modals
    function openCreateModal() {
      document.getElementById("modal-movie-title").textContent = "Nueva Obra Cinematográfica";
      document.getElementById("movie-id").value = "";
      document.getElementById("form-movie").reset();
      document.getElementById("modal-movie").classList.remove("hidden");
    }

    function editMovie(id) {
      const item = catalogData.find(m => m.id === id);
      if (!item) return;

      document.getElementById("modal-movie-title").textContent = `Editar: ${item.title}`;
      document.getElementById("movie-id").value = item.id;
      document.getElementById("movie-title").value = item.title;
      document.getElementById("movie-director").value = item.director;
      document.getElementById("movie-type").value = item.type;
      document.getElementById("movie-platform").value = item.platform;
      document.getElementById("movie-score").value = item.score;
      document.getElementById("movie-mood").value = item.mood;
      document.getElementById("movie-status").value = item.status;
      document.getElementById("movie-synopsis").value = item.synopsis;

      document.getElementById("modal-movie").classList.remove("hidden");
    }

    function closeMovieModal() {
      document.getElementById("modal-movie").classList.add("hidden");
    }

    function handleSaveMovie(e) {
      e.preventDefault();
      const id = document.getElementById("movie-id").value;
      const movieObj = {
        id: id || `mov-${Date.now()}`,
        title: document.getElementById("movie-title").value,
        director: document.getElementById("movie-director").value,
        type: document.getElementById("movie-type").value,
        platform: document.getElementById("movie-platform").value,
        score: parseFloat(document.getElementById("movie-score").value).toFixed(1),
        mood: document.getElementById("movie-mood").value,
        status: document.getElementById("movie-status").value,
        synopsis: document.getElementById("movie-synopsis").value,
      };

      if (id) {
        const index = catalogData.findIndex(m => m.id === id);
        if (index !== -1) {
          catalogData[index] = movieObj;
          showToast(`Obra "${movieObj.title}" actualizada correctamente`, "success");
        }
      } else {
        catalogData.unshift(movieObj);
        showToast(`"${movieObj.title}" añadida al catálogo con éxito`, "success");
      }

      closeMovieModal();
      filterCatalog();
    }

    function deleteMovie(id) {
      const movie = catalogData.find(m => m.id === id);
      if (!movie) return;

      if (confirm(`¿Confirmas la eliminación de "${movie.title}" del catálogo SPOTLIGHT?`)) {
        catalogData = catalogData.filter(m => m.id !== id);
        filterCatalog();
        showToast(`"${movie.title}" ha sido eliminada del catálogo`, "error");
      }
    }

    function previewMovie(id) {
      const movie = catalogData.find(m => m.id === id);
      if (!movie) return;

      document.getElementById("preview-title").textContent = movie.title;
      document.getElementById("preview-director").textContent = `Dirección: ${movie.director}`;
      document.getElementById("preview-type-badge").textContent = movie.type;
      document.getElementById("preview-score").textContent = movie.score;
      document.getElementById("preview-platform-badge").textContent = movie.platform;
      document.getElementById("preview-mood").textContent = movie.mood;
      document.getElementById("preview-synopsis").textContent = movie.synopsis;

      document.getElementById("modal-preview").classList.remove("hidden");
    }

    function closePreviewModal() {
      document.getElementById("modal-preview").classList.add("hidden");
    }

    // Moderation Engine
    function renderModeration() {
      const list = document.getElementById("moderation-list");
      const emptyState = document.getElementById("moderation-empty");
      const queueMetric = document.getElementById("metric-pending-reviews");
      const badgeTab = document.getElementById("tab-moderation-badge");
      const sidebarBadge = document.getElementById("sidebar-mod-badge");
      const notifCountBadge = document.getElementById("notif-count-badge");
      const bellBadge = document.getElementById("bell-badge");

      list.innerHTML = "";

      const count = moderationQueue.length;
      if (queueMetric) queueMetric.textContent = count;
      if (badgeTab) badgeTab.textContent = count;
      if (sidebarBadge) sidebarBadge.textContent = count;
      if (notifCountBadge) notifCountBadge.textContent = `${count} Nuevas`;

      if (count === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        if (bellBadge) bellBadge.classList.add("hidden");
        if (badgeTab) badgeTab.classList.add("hidden");
        if (sidebarBadge) sidebarBadge.classList.add("hidden");
      } else {
        if (emptyState) emptyState.classList.add("hidden");
        if (bellBadge) bellBadge.classList.remove("hidden");
        if (badgeTab) badgeTab.classList.remove("hidden");
        if (sidebarBadge) sidebarBadge.classList.remove("hidden");
      }

      moderationQueue.forEach(item => {
        const card = document.createElement("div");
        card.id = `card-${item.id}`;
        card.className = "bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300";

        let starsHtml = "";
        for (let s = 1; s <= 5; s++) {
          starsHtml += `<span class="material-symbols-outlined text-[18px] ${s <= item.rating ? 'text-primary' : 'text-surface-container-highest'}">star</span>`;
        }

        card.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center font-headline-sm text-sm">
                ${item.avatar}
              </div>
              <div>
                <p class="font-label-prominent text-label-prominent text-on-surface">${item.user}</p>
                <p class="font-label-meta text-label-meta text-tertiary">Sobre: <strong class="text-on-surface font-semibold">${item.movie}</strong> • ${item.timestamp}</p>
              </div>
            </div>
            <div class="flex items-center">
              ${starsHtml}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface">${item.mood}</span>
            ${item.isSpoiler ? '<span class="px-2 py-0.5 rounded-full bg-error-container text-error font-label-badge text-label-badge font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">flag</span> Posible Spoiler</span>' : ''}
          </div>

          <div class="p-3 bg-surface-container-low rounded-xl">
            <p class="font-body-md text-body-md text-on-surface-variant italic">"${item.comment}"</p>
          </div>
        </div>

        <div class="pt-2 flex items-center justify-end gap-2 border-t border-surface-container">
          <button onclick="rejectReview('${item.id}')" class="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant font-label-badge text-label-badge font-bold transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">close</span>
            <span>Rechazar</span>
          </button>
          <button onclick="toggleSpoilerTag('${item.id}')" class="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-badge text-label-badge font-bold transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">flag</span>
            <span>${item.isSpoiler ? 'Quitar Alerta' : 'Marcar Spoiler'}</span>
          </button>
          <button onclick="approveReview('${item.id}')" class="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:brightness-105 font-label-badge text-label-badge font-bold transition-all shadow-sm flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">check</span>
            <span>Aprobar Reseña</span>
          </button>
        </div>
      `;
        list.appendChild(card);
      });

      renderNotificationsList();
    }

    function approveReview(id) {
      const card = document.getElementById(`card-${id}`);
      if (card) {
        card.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
          moderationQueue = moderationQueue.filter(m => m.id !== id);
          renderModeration();
          const revCountEl = document.getElementById("metric-reviews-count");
          if (revCountEl) {
            const cur = parseInt(revCountEl.textContent.replace(/,/g, '')) || 1420;
            revCountEl.textContent = (cur + 1).toLocaleString();
          }
          showToast("Reseña aprobada y publicada en el muro comunitario", "success");
        }, 200);
      } else {
        moderationQueue = moderationQueue.filter(m => m.id !== id);
        renderModeration();
        showToast("Reseña aprobada con éxito", "success");
      }
    }

    function toggleSpoilerTag(id) {
      const item = moderationQueue.find(m => m.id === id);
      if (!item) return;
      item.isSpoiler = !item.isSpoiler;
      renderModeration();
      showToast(item.isSpoiler ? "Etiqueta de spoiler asignada a la reseña" : "Etiqueta de spoiler retirada", "warning");
    }

    function rejectReview(id) {
      const card = document.getElementById(`card-${id}`);
      if (card) {
        card.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
          moderationQueue = moderationQueue.filter(m => m.id !== id);
          renderModeration();
          showToast("Reseña descartada por incumplimiento normativo", "error");
        }, 200);
      } else {
        moderationQueue = moderationQueue.filter(m => m.id !== id);
        renderModeration();
        showToast("Reseña descartada", "error");
      }
    }

    function approveAllPending() {
      if (moderationQueue.length === 0) {
        showToast("No hay elementos pendientes para aprobación masiva", "info");
        return;
      }
      const count = moderationQueue.length;
      moderationQueue = [];
      renderModeration();
      const revCountEl = document.getElementById("metric-reviews-count");
      if (revCountEl) {
        const cur = parseInt(revCountEl.textContent.replace(/,/g, '')) || 1420;
        revCountEl.textContent = (cur + count).toLocaleString();
      }
      showToast(`${count} reseñas aprobadas simultáneamente con éxito`, "success");
    }

    // Bell Notifications Flyout
    function toggleNotificationsMenu(e) {
      if (e) e.stopPropagation();
      const flyout = document.getElementById("notifications-flyout");
      if (flyout) {
        flyout.classList.toggle("hidden");
      }
    }

    function renderNotificationsList() {
      const list = document.getElementById("notif-items-list");
      if (!list) return;

      if (moderationQueue.length === 0) {
        list.innerHTML = `<div class="py-6 text-center text-xs text-tertiary">No hay alertas de moderación pendientes. Todo limpio.</div>`;
        return;
      }

      list.innerHTML = "";
      moderationQueue.forEach(item => {
        const div = document.createElement("div");
        div.className = "py-2.5 flex items-start justify-between gap-3 text-left";
        div.innerHTML = `
        <div class="space-y-0.5">
          <p class="font-label-prominent text-xs text-on-surface">${item.user} <span class="text-tertiary font-normal">en ${item.movie}</span></p>
          <p class="text-[11px] text-tertiary line-clamp-1 italic font-body-sm">"${item.comment.slice(0, 50)}..."</p>
          <span class="text-[10px] text-primary">${item.timestamp}</span>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="approveReview('${item.id}');" title="Aprobar" class="p-1 rounded bg-secondary-container hover:bg-primary-container text-on-primary-container transition-colors">
            <span class="material-symbols-outlined text-[15px]">check</span>
          </button>
          <button onclick="switchTab('tab-moderation'); toggleNotificationsMenu();" title="Revisar" class="p-1 rounded bg-surface-container-high hover:bg-surface-container text-on-surface-variant transition-colors">
            <span class="material-symbols-outlined text-[15px]">visibility</span>
          </button>
        </div>
      `;
        list.appendChild(div);
      });
    }

    // Close notifications menu on outside click
    document.addEventListener('click', (e) => {
      const flyout = document.getElementById("notifications-flyout");
      const bellBtn = document.getElementById("btn-notifications");
      if (flyout && !flyout.contains(e.target) && !bellBtn.contains(e.target)) {
        flyout.classList.add("hidden");
      }
    });

    // Users & Roles Management Engine
    function renderUsers() {
      const tbody = document.getElementById("users-table-body");
      tbody.innerHTML = "";

      usersList.forEach(user => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-surface-container-low transition-colors";

        const statusBadge = user.status === "Activo"
          ? '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-badge text-label-badge font-bold"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Activo</span>'
          : '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-error font-label-badge text-label-badge font-bold"><span class="w-1.5 h-1.5 rounded-full bg-error"></span> Suspendido</span>';

        tr.innerHTML = `
        <td class="py-4 px-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold">
              ${user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p class="font-label-prominent text-label-prominent text-on-surface">${user.name}</p>
              <p class="font-label-meta text-label-meta text-tertiary">${user.email}</p>
            </div>
          </div>
        </td>
        <td class="py-4 px-4">
          <span class="px-2.5 py-1 rounded-full font-label-badge text-label-badge font-bold ${user.roleTagColor}">${user.role}</span>
        </td>
        <td class="py-4 px-4 font-label-meta text-label-meta text-on-surface-variant">${user.dateJoined}</td>
        <td class="py-4 px-4 font-label-meta text-label-meta text-tertiary">${user.lastActive}</td>
        <td class="py-4 px-4">${statusBadge}</td>
        <td class="py-4 px-6 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="toggleUserRole('${user.id}')" title="Alternar Rol Editorial" class="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container font-label-badge text-label-badge text-on-surface font-semibold transition-colors">
              Cambiar Rol
            </button>
            <button onclick="toggleUserStatus('${user.id}')" title="Alternar Estado de Acceso" class="p-1.5 rounded-lg text-tertiary hover:text-error hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-[18px]">${user.status === 'Activo' ? 'block' : 'lock_open'}</span>
            </button>
          </div>
        </td>
      `;
        tbody.appendChild(tr);
      });
    }

    function toggleUserRole(userId) {
      const user = usersList.find(u => u.id === userId);
      if (!user) return;

      if (user.role === "Super Admin") {
        user.role = "Crítico Editorial";
        user.roleTagColor = "bg-secondary-container text-on-secondary-container";
      } else if (user.role === "Crítico Editorial") {
        user.role = "Miembro Cinéfilo";
        user.roleTagColor = "bg-surface-container-high text-on-surface-variant";
      } else {
        user.role = "Super Admin";
        user.roleTagColor = "bg-primary-container text-on-primary-container";
      }

      renderUsers();
      showToast(`Rol de ${user.name} actualizado a "${user.role}"`, "success");
    }

    function toggleUserStatus(userId) {
      const user = usersList.find(u => u.id === userId);
      if (!user) return;

      user.status = user.status === "Activo" ? "Suspendido" : "Activo";
      renderUsers();
      showToast(`Estado de ${user.name} cambiado a "${user.status}"`, user.status === "Activo" ? "success" : "warning");
    }

    function inviteUserPrompt() {
      const email = prompt("Introduce el correo institucional para conceder credenciales de Crítico Editorial:");
      if (email && email.includes("@")) {
        const newUser = {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          email: email,
          role: "Crítico Editorial",
          roleTagColor: "bg-secondary-container text-on-secondary-container",
          dateJoined: "Hoy",
          lastActive: "Invitación enviada",
          status: "Activo"
        };
        usersList.push(newUser);
        renderUsers();
        showToast(`Invitación despachada exitosamente a ${email}`, "success");
      } else if (email) {
        showToast("Dirección de correo inválida", "error");
      }
    }

    // Auth & Session Modal Engine
    function openAuthModal() {
      document.getElementById("modal-auth").classList.remove("hidden");
    }

    function closeAuthModal() {
      document.getElementById("modal-auth").classList.add("hidden");
    }

    function switchActiveUser(name, roleDesc, shortRole) {
      document.getElementById("top-user-name").textContent = name;
      document.getElementById("top-user-role").textContent = shortRole || roleDesc;
      document.getElementById("sidebar-role-title").textContent = name;
      document.getElementById("sidebar-role-subtitle").textContent = roleDesc;
      closeAuthModal();
      showToast(`Sesión cambiada a: ${name} (${roleDesc})`, "success");
    }

    function handleAuthSubmit(e) {
      e.preventDefault();
      const name = document.getElementById("auth-name").value;
      const role = document.getElementById("auth-role-select").value;
      switchActiveUser(name, role, role);
    }

    // Public Preview Launcher
    function launchPublicPreview() {
      const modal = document.getElementById("modal-public-preview");
      const grid = document.getElementById("public-catalog-preview-grid");
      const countEl = document.getElementById("public-live-count");

      if (grid) {
        grid.innerHTML = "";
        const published = catalogData.filter(m => m.status === "Publicado");
        if (countEl) countEl.textContent = `${published.length} títulos disponibles en streaming`;

        published.forEach(movie => {
          const item = document.createElement("div");
          item.className = "p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between";
          item.innerHTML = `
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">${movie.platform}</span>
              <span class="text-xs font-bold text-amber-300 flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">star</span> ${movie.score}</span>
            </div>
            <h5 class="font-bold text-sm text-white mt-1">${movie.title}</h5>
            <p class="text-xs text-slate-400">Dir. ${movie.director}</p>
            <p class="text-xs text-slate-300 mt-2 line-clamp-2 italic">"${movie.synopsis}"</p>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">${movie.mood}</span>
            <button onclick="showToast('Redirigiendo a reproductor de ${movie.platform}...', 'info')" class="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1">Ver ahora <span class="material-symbols-outlined text-[12px]">open_in_new</span></button>
          </div>
        `;
          grid.appendChild(item);
        });
      }

      modal.classList.remove("hidden");
      showToast("Entorno público SPOTLIGHT sincronizado con éxito", "info");
    }

    function closePublicPreviewModal() {
      document.getElementById("modal-public-preview").classList.add("hidden");
    }

    // Initialize Data Tables and Queues
    document.addEventListener("DOMContentLoaded", () => {
      renderCatalog();
      renderModeration();
      renderUsers();
    });
    renderCatalog();
    renderModeration();
    renderUsers();
  