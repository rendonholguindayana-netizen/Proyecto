
    // STATE MANAGEMENT WITH LOCALSTORAGE FALLBACK
    const state = {
      user: {
        name: localStorage.getItem('spotlight_user_name') || 'Lucía Mendez',
        email: localStorage.getItem('spotlight_user_email') || 'lucia@spotlight.film',
        role: localStorage.getItem('spotlight_user_role') || 'Crítica Senior',
        isLoggedIn: localStorage.getItem('spotlight_logged') === 'true'
      },
      savedList: JSON.parse(localStorage.getItem('spotlight_saved_films') || '["Duna: Parte Dos", "Perfect Days", "Past Lives", "The Killer"]'),
      authMode: 'login',
      roulettePick: null,
      previewFilmData: null,
      agoraVotes: {
        A: 1068,
        B: 774,
        userVoted: false
      }
    };

    // INITIALIZE UI ON LOAD
    document.addEventListener('DOMContentLoaded', () => {
      updateUserHeaderDisplay();
      updateSavedCountPill();
    });

    // TOAST NOTIFICATION UTILITY
    function showToast(message, icon = 'check_circle') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'flex items-center gap-2 px-space-md py-2.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl font-label-prominent text-label-prominent pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300';
      toast.innerHTML = `<span class="material-symbols-outlined text-primary-fixed text-[20px]">${icon}</span><span>${message}</span>`;
      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 2800);
    }

    // SMOOTH SCROLL HELPER
    function scrollToSection(sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // DOCK VISIBILITY TOGGLE FOR SMALL SCREENS
    const dock = document.getElementById('spotlight-dock');
    const dockToggleBtn = document.getElementById('dock-toggle-btn');
    dockToggleBtn.addEventListener('click', () => {
      dock.classList.toggle('translate-x-[calc(100%-52px)]');
    });

    // USER PROFILE & SESSION HANDLING
    function updateUserHeaderDisplay() {
      const nameEl = document.getElementById('user-display-name');
      const roleEl = document.getElementById('user-role-badge');
      const dockAuthLabel = document.getElementById('dock-auth-btn-label');
      const subtextEl = document.getElementById('user-subtext');

      if (nameEl) nameEl.textContent = state.user.name;
      if (roleEl) roleEl.textContent = state.user.role;
      if (dockAuthLabel) dockAuthLabel.textContent = state.user.name.split(' ')[0] || 'Mi Cuenta';
      if (subtextEl) {
        subtextEl.innerHTML = `Sesión activa como <strong>${state.user.email}</strong>. Curaduría personalizada en vivo.`;
      }
    }

    function updateSavedCountPill() {
      const pill = document.getElementById('saved-count-pill');
      if (pill) {
        pill.textContent = `${state.savedList.length} títulos`;
      }
    }

    // AUTH MODAL FUNCTIONS
    function openAuthModal() {
      document.getElementById('auth-modal').classList.remove('hidden');
      document.getElementById('auth-modal').classList.add('flex');
    }

    function closeAuthModal() {
      document.getElementById('auth-modal').classList.add('hidden');
      document.getElementById('auth-modal').classList.remove('flex');
    }

    function switchAuthTab(mode) {
      state.authMode = mode;
      const tabLogin = document.getElementById('tab-login');
      const tabRegister = document.getElementById('tab-register');
      const nameField = document.getElementById('field-name');
      const submitBtn = document.getElementById('auth-submit-btn');

      if (mode === 'login') {
        tabLogin.className = 'flex-1 py-space-sm font-label-prominent text-label-prominent text-center bg-surface-container-lowest text-primary';
        tabRegister.className = 'flex-1 py-space-sm font-label-prominent text-label-prominent text-center text-on-surface-variant hover:text-on-surface';
        nameField.classList.add('hidden');
        submitBtn.textContent = 'Ingresar al Club';
      } else {
        tabRegister.className = 'flex-1 py-space-sm font-label-prominent text-label-prominent text-center bg-surface-container-lowest text-primary';
        tabLogin.className = 'flex-1 py-space-sm font-label-prominent text-label-prominent text-center text-on-surface-variant hover:text-on-surface';
        nameField.classList.remove('hidden');
        submitBtn.textContent = 'Crear Cuenta & Empezar';
      }
    }

    function quickLogin(name, email, role) {
      state.user = { name, email, role, isLoggedIn: true };
      localStorage.setItem('spotlight_user_name', name);
      localStorage.setItem('spotlight_user_email', email);
      localStorage.setItem('spotlight_user_role', role);
      localStorage.setItem('spotlight_logged', 'true');
      updateUserHeaderDisplay();
      closeAuthModal();
      showToast(`¡Bienvenida/o de vuelta, ${name}!`, 'waving_hand');
    }

    function handleAuthSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('auth-input-email').value;
      const name = state.authMode === 'register' 
        ? (document.getElementById('auth-input-name').value || 'Cinéfilo Registrado') 
        : (email.split('@')[0]);

      state.user = {
        name: name,
        email: email,
        role: 'Cinéfilo Miembro',
        isLoggedIn: true
      };

      localStorage.setItem('spotlight_user_name', state.user.name);
      localStorage.setItem('spotlight_user_email', state.user.email);
      localStorage.setItem('spotlight_user_role', state.user.role);
      localStorage.setItem('spotlight_logged', 'true');

      updateUserHeaderDisplay();
      closeAuthModal();
      showToast(`Sesión confirmada para ${name}`, 'verified');
    }

    function handleLogout() {
      state.user = {
        name: 'Invitado Explorador',
        email: 'explora@spotlight.film',
        role: 'Modo Abierto',
        isLoggedIn: false
      };
      localStorage.setItem('spotlight_user_name', state.user.name);
      localStorage.setItem('spotlight_user_email', state.user.email);
      localStorage.setItem('spotlight_user_role', state.user.role);
      localStorage.setItem('spotlight_logged', 'false');
      updateUserHeaderDisplay();
      showToast('Has cerrado sesión.', 'logout');
    }

    // SOCIAL INTERACTIONS: LIKES, COMMENTS, SAVES
    function togglePostLike(postId, button) {
      const countSpan = button.querySelector('.like-count');
      const iconSpan = button.querySelector('.material-symbols-outlined');
      let current = parseInt(countSpan.textContent, 10);

      if (button.dataset.liked === 'true') {
        button.dataset.liked = 'false';
        iconSpan.textContent = 'favorite_border';
        button.classList.remove('text-error');
        button.classList.add('text-on-surface-variant');
        countSpan.textContent = current - 1;
      } else {
        button.dataset.liked = 'true';
        iconSpan.textContent = 'favorite';
        button.classList.add('text-error');
        button.classList.remove('text-on-surface-variant');
        countSpan.textContent = current + 1;
        showToast('Me gusta añadido a tu pulso cinéfilo', 'favorite');
      }
    }

    function toggleCommentDrawer(postId) {
      const commentsBox = document.getElementById(`comments-${postId}`);
      if (commentsBox) {
        commentsBox.classList.toggle('hidden');
        commentsBox.classList.toggle('flex');
      }
    }

    function submitComment(postId, btn) {
      const parent = btn.parentElement;
      const input = parent.querySelector('.comment-input');
      const text = input.value.trim();
      if (!text) return;

      const list = document.querySelector(`#comments-${postId} .comments-list`);
      const newBubble = document.createElement('div');
      newBubble.className = 'bg-secondary-container/40 p-2 rounded-lg text-body-sm animate-in fade-in duration-200';
      newBubble.innerHTML = `<span class="font-label-prominent text-label-prominent text-on-surface">${state.user.name}:</span> <p class="text-on-surface">${text}</p>`;
      list.appendChild(newBubble);
      list.scrollTop = list.scrollHeight;
      input.value = '';

      const postCard = document.querySelector(`article[data-post-id="${postId}"]`);
      const commentCount = postCard.querySelector('.comment-count');
      if (commentCount) {
        commentCount.textContent = parseInt(commentCount.textContent, 10) + 1;
      }
      showToast('Comentario publicado en el feed', 'forum');
    }

    function toggleSaveFilm(title, director, postId, btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      const index = state.savedList.indexOf(title);

      if (index > -1) {
        state.savedList.splice(index, 1);
        icon.textContent = 'bookmark_border';
        btn.classList.remove('text-primary');
        showToast(`Eliminado de 'Mi Lista'`, 'bookmark_remove');
      } else {
        state.savedList.push(title);
        icon.textContent = 'bookmark';
        btn.classList.add('text-primary');
        showToast(`"${title}" guardada en Mi Lista`, 'bookmark_added');
      }
      localStorage.setItem('spotlight_saved_films', JSON.stringify(state.savedList));
      updateSavedCountPill();
    }

    // MOOD RIBBON FILTER
    function filterByMood(mood, clickedBtn) {
      document.querySelectorAll('.mood-btn').forEach(b => {
        b.className = 'mood-btn px-space-md py-2 rounded-full font-label-badge text-label-badge uppercase tracking-wider transition-all bg-surface-container-low text-on-surface hover:bg-secondary-container shrink-0';
      });
      clickedBtn.className = 'mood-btn px-space-md py-2 rounded-full font-label-badge text-label-badge uppercase tracking-wider transition-all bg-primary-container text-on-primary-container shadow-sm shrink-0';

      const cards = document.querySelectorAll('#feed-posts-container article');
      cards.forEach(card => {
        if (mood === 'all' || card.dataset.mood === mood) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // FEED TAB SWITCHER
    function switchFeedTab(tabKey, clickedBtn) {
      document.querySelectorAll('.feed-tab-btn').forEach(b => {
        b.className = 'feed-tab-btn px-space-md py-1.5 rounded-lg font-label-badge text-label-badge uppercase tracking-wide text-on-surface-variant hover:text-on-surface';
      });
      clickedBtn.className = 'feed-tab-btn px-space-md py-1.5 rounded-lg bg-surface-container-lowest font-label-badge text-label-badge uppercase tracking-wide text-on-surface shadow-sm';
      showToast(`Mostrando feed de: ${tabKey.replace('-', ' ').toUpperCase()}`, 'filter_list');
    }

    // SEARCHABLE REAL-TIME CATALOG
    function handleCatalogSearch(query) {
      const q = query.toLowerCase().trim();
      const cards = document.querySelectorAll('.catalog-card');
      cards.forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        const director = (card.dataset.director || '').toLowerCase();
        const platform = (card.dataset.platform || '').toLowerCase();

        if (!q || title.includes(q) || director.includes(q) || platform.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function filterByPlatform(platform, clickedBtn) {
      document.querySelectorAll('.platform-chip').forEach(c => {
        c.className = 'platform-chip px-3 py-1 rounded-lg bg-surface-container-low text-on-surface hover:bg-secondary-container font-label-badge text-label-badge';
      });
      clickedBtn.className = 'platform-chip px-3 py-1 rounded-lg bg-primary-container text-on-primary-container font-label-badge text-label-badge';

      const cards = document.querySelectorAll('.catalog-card');
      cards.forEach(card => {
        const cardPlatform = card.dataset.platform || '';
        if (platform === 'all' || cardPlatform.toLowerCase().includes(platform.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // PREVIEW MODAL
    function previewFilmModal(title, director, score, platform) {
      state.previewFilmData = { title, director, score, platform };
      document.getElementById('preview-title').textContent = title;
      document.getElementById('preview-director').textContent = `${director} • Exclusiva Seleccionada`;
      document.getElementById('preview-score').textContent = score;
      document.getElementById('preview-platform-tag').textContent = platform;

      document.getElementById('preview-modal').classList.remove('hidden');
      document.getElementById('preview-modal').classList.add('flex');
    }

    function closePreviewModal() {
      document.getElementById('preview-modal').classList.add('hidden');
      document.getElementById('preview-modal').classList.remove('flex');
    }

    function savePreviewedFilm() {
      if (!state.previewFilmData) return;
      const title = state.previewFilmData.title;
      if (!state.savedList.includes(title)) {
        state.savedList.push(title);
        localStorage.setItem('spotlight_saved_films', JSON.stringify(state.savedList));
        updateSavedCountPill();
        showToast(`"${title}" guardada en Mi Lista`, 'bookmark_added');
      } else {
        showToast(`Ya tienes "${title}" en tu lista`, 'info');
      }
      closePreviewModal();
    }

    // RULETA DEL CINE LOGIC
    const roulettePool = [
      { title: "Everything Everywhere All at Once", dir: "The Daniels", plat: "Prime Video" },
      { title: "Aftersun", dir: "Charlotte Wells", plat: "MUBI" },
      { title: "Tar", dir: "Todd Field", plat: "Max" },
      { title: "La Zona de Interés", dir: "Jonathan Glazer", plat: "Filmin" },
      { title: "Decision to Leave", dir: "Park Chan-wook", plat: "MUBI" },
      { title: "El Irlandés", dir: "Martin Scorsese", plat: "Netflix" }
    ];

    function spinRoulette() {
      const display = document.getElementById('roulette-display');
      const sparkles = document.getElementById('roulette-sparkles');
      const saveBtn = document.getElementById('roulette-save-btn');
      sparkles.classList.remove('opacity-0');

      let counter = 0;
      const interval = setInterval(() => {
        const tempPick = roulettePool[Math.floor(Math.random() * roulettePool.length)];
        display.innerHTML = `
          <span class="material-symbols-outlined text-[44px] text-primary animate-spin">autorenew</span>
          <p class="font-headline-sm text-headline-sm text-on-surface">${tempPick.title}</p>
          <span class="font-label-meta text-label-meta text-on-surface-variant">${tempPick.dir}</span>
        `;
        counter++;
        if (counter > 10) {
          clearInterval(interval);
          const finalPick = roulettePool[Math.floor(Math.random() * roulettePool.length)];
          state.roulettePick = finalPick;
          display.innerHTML = `
            <span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-badge text-label-badge uppercase tracking-wider mb-1">¡Selección Ganadora!</span>
            <h4 class="font-headline-md text-headline-md text-on-surface">${finalPick.title}</h4>
            <span class="font-body-md text-body-md text-primary font-semibold">${finalPick.dir} &bull; ${finalPick.plat}</span>
          `;
          sparkles.classList.add('opacity-0');
          saveBtn.classList.remove('hidden');
          showToast(`Ruleta completada: ${finalPick.title}`, 'casino');
        }
      }, 100);
    }

    function saveRoulettePick() {
      if (state.roulettePick) {
        if (!state.savedList.includes(state.roulettePick.title)) {
          state.savedList.push(state.roulettePick.title);
          localStorage.setItem('spotlight_saved_films', JSON.stringify(state.savedList));
          updateSavedCountPill();
          showToast(`Guardada: ${state.roulettePick.title}`, 'bookmark_added');
        } else {
          showToast('Ya está en tu lista.', 'info');
        }
      }
    }

    // QUIZ EXPRESS 60s
    function answerQuiz(step, val) {
      if (step === 1) {
        document.getElementById('quiz-step-1').classList.add('hidden');
        document.getElementById('quiz-step-2').classList.remove('hidden');
        document.getElementById('quiz-bar-2').classList.replace('bg-surface-container-highest', 'bg-primary-container');
      } else if (step === 2) {
        document.getElementById('quiz-step-2').classList.add('hidden');
        document.getElementById('quiz-step-3').classList.remove('hidden');
        document.getElementById('quiz-bar-3').classList.replace('bg-surface-container-highest', 'bg-primary-container');
      }
    }

    function finishQuiz(aesthetic) {
      document.getElementById('quiz-step-3').classList.add('hidden');
      const resultBox = document.getElementById('quiz-result');
      resultBox.classList.remove('hidden');
      resultBox.classList.add('flex');
      showToast('Diagnóstico cinematográfico completado con éxito', 'auto_awesome');
    }

    function resetQuiz() {
      document.getElementById('quiz-step-1').classList.remove('hidden');
      document.getElementById('quiz-step-2').classList.add('hidden');
      document.getElementById('quiz-step-3').classList.add('hidden');
      document.getElementById('quiz-result').classList.add('hidden');
      document.getElementById('quiz-result').classList.remove('flex');
      document.getElementById('quiz-bar-2').classList.replace('bg-primary-container', 'bg-surface-container-highest');
      document.getElementById('quiz-bar-3').classList.replace('bg-primary-container', 'bg-surface-container-highest');
    }

    function saveCurrentQuizResult() {
      const title = document.getElementById('quiz-result-title').textContent.split(' (')[0];
      if (!state.savedList.includes(title)) {
        state.savedList.push(title);
        localStorage.setItem('spotlight_saved_films', JSON.stringify(state.savedList));
        updateSavedCountPill();
        showToast(`"${title}" añadida a tu lista`, 'bookmark_added');
      } else {
        showToast('Ya se encuentra guardada en tu lista.', 'info');
      }
    }

    // ÁGORA VOTING
    function voteAgora(option) {
      if (state.agoraVotes.userVoted) {
        showToast('Ya has emitido tu voto en este debate de la semana.', 'info');
        return;
      }
      state.agoraVotes[option]++;
      state.agoraVotes.userVoted = true;

      const total = state.agoraVotes.A + state.agoraVotes.B;
      const pctA = Math.round((state.agoraVotes.A / total) * 100);
      const pctB = 100 - pctA;

      document.getElementById('agora-pct-a').textContent = `${pctA}%`;
      document.getElementById('agora-bar-a').style.width = `${pctA}%`;

      document.getElementById('agora-pct-b').textContent = `${pctB}%`;
      document.getElementById('agora-bar-b').style.width = `${pctB}%`;

      document.getElementById('agora-total-votes').textContent = `${total.toLocaleString()} votos emitidos`;
      document.getElementById('vote-notice').textContent = `¡Voto registrado para la Opción ${option}! Gracias por participar en el Ágora.`;
      showToast('Tu voto ha sido contabilizado en el Ágora', 'thumb_up');
    }

    // BACKOFFICE ADMIN TOGGLE & ADD FILM TO LIVE CATALOG
    function toggleAdminPanel() {
      const panel = document.getElementById('admin-panel-section');
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) {
        panel.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function handleAdminAddFilm(e) {
      e.preventDefault();
      const title = document.getElementById('admin-film-title').value;
      const director = document.getElementById('admin-film-director').value;
      const score = document.getElementById('admin-film-score').value;
      const platform = document.getElementById('admin-film-platform').value;

      const grid = document.getElementById('catalog-grid');
      const newCard = document.createElement('div');
      newCard.className = 'catalog-card group cursor-pointer flex flex-col gap-2 animate-in zoom-in-95 duration-300';
      newCard.dataset.title = title;
      newCard.dataset.director = director;
      newCard.dataset.platform = platform;
      newCard.onclick = () => previewFilmModal(title, director, score, platform);

      newCard.innerHTML = `
        <div class="relative aspect-[2/3] rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all bg-surface-container-high flex items-center justify-center p-2 text-center">
          <span class="font-headline-sm text-headline-sm text-primary">🎬</span>
          <span class="absolute top-2 right-2 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded text-[11px] font-bold text-on-surface">★ ${score}</span>
          <span class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-primary">${platform}</span>
        </div>
        <div>
          <h4 class="font-label-prominent text-label-prominent text-on-surface truncate">${title}</h4>
          <p class="font-label-meta text-label-meta text-on-surface-variant truncate">${director} &bull; Nuevo</p>
        </div>
      `;

      grid.insertBefore(newCard, grid.firstChild);
      e.target.reset();
      showToast(`"${title}" agregada al catálogo maestro en vivo.`, 'publish');
    }
  