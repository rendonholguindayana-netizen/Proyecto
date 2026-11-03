
  (function() {
    // Utility: Toast Messenger
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    let toastTimer = null;

    function showToast(message, iconName = 'check_circle') {
      if (toastTimer) clearTimeout(toastTimer);
      toastMsg.textContent = message;
      toastIcon.textContent = iconName;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      
      toastTimer = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 3400);
    }

    // 1. Ecosistema Nav Buttons
    const btnNavCatalog = document.getElementById('btn-nav-catalog');
    const btnNavAdmin = document.getElementById('btn-nav-admin');
    const btnNavAuth = document.getElementById('btn-nav-auth');

    const btnEcoCatalog = document.getElementById('btn-eco-catalog');
    const btnEcoAdmin = document.getElementById('btn-eco-admin');
    const btnEcoAuth = document.getElementById('btn-eco-auth');

    const handleNav = (target) => {
      showToast(`Conectando con el módulo: ${target}...`, 'hub');
    };

    if (btnNavCatalog) btnNavCatalog.onclick = () => handleNav('Catálogo Global y Feed');
    if (btnNavAdmin) btnNavAdmin.onclick = () => handleNav('Panel de Control Backoffice');
    if (btnNavAuth) btnNavAuth.onclick = () => handleNav('Portal de Acceso y Perfil');

    if (btnEcoCatalog) btnEcoCatalog.onclick = () => handleNav('Catálogo General y Recomendador');
    if (btnEcoAdmin) btnEcoAdmin.onclick = () => handleNav('Backoffice / Gestión de Reseñas');
    if (btnEcoAuth) btnEcoAuth.onclick = () => handleNav('Identificación / Membresía Cine Club');

    // 2. Modals: Stream Player (Netflix)
    const btnPlayNetflix = document.getElementById('btn-play-netflix');
    const modalStream = document.getElementById('modal-stream');
    const btnCloseModalStream = document.getElementById('btn-close-modal-stream');
    const btnRedirectExternal = document.getElementById('btn-redirect-external');

    if (btnPlayNetflix && modalStream) {
      btnPlayNetflix.onclick = () => {
        modalStream.classList.remove('hidden');
      };
    }
    if (btnCloseModalStream && modalStream) {
      btnCloseModalStream.onclick = () => {
        modalStream.classList.add('hidden');
      };
    }
    if (btnRedirectExternal) {
      btnRedirectExternal.onclick = () => {
        showToast('Redirigiendo a la app nativa de Netflix...', 'launch');
      };
    }

    // 3. Watchlist Toggle
    const btnSaveWatchlist = document.getElementById('btn-save-watchlist');
    const watchlistIcon = document.getElementById('watchlist-icon');
    const watchlistText = document.getElementById('watchlist-text');
    let isSaved = false;

    if (btnSaveWatchlist) {
      btnSaveWatchlist.onclick = () => {
        isSaved = !isSaved;
        if (isSaved) {
          watchlistIcon.textContent = 'bookmark_added';
          watchlistIcon.style.fontVariationSettings = "'FILL' 1";
          watchlistText.textContent = 'En tu Lista de Espera';
          btnSaveWatchlist.classList.add('bg-secondary-container', 'text-on-secondary-container');
          btnSaveWatchlist.classList.remove('bg-surface-container');
          showToast('Guardado en tu lista personal de visionado', 'bookmark_added');
        } else {
          watchlistIcon.textContent = 'bookmark_border';
          watchlistIcon.style.fontVariationSettings = "'FILL' 0";
          watchlistText.textContent = 'Guardar en mi Lista';
          btnSaveWatchlist.classList.remove('bg-secondary-container', 'text-on-secondary-container');
          btnSaveWatchlist.classList.add('bg-surface-container');
          showToast('Eliminado de tu lista', 'bookmark_remove');
        }
      };
    }

    // 4. Modal: Share & Copy
    const btnShareModal = document.getElementById('btn-share-modal');
    const modalShare = document.getElementById('modal-share');
    const btnCloseModalShare = document.getElementById('btn-close-modal-share');
    const btnCopyLink = document.getElementById('btn-copy-link');
    const shareLinkInput = document.getElementById('share-link-input');

    if (btnShareModal && modalShare) {
      btnShareModal.onclick = () => modalShare.classList.remove('hidden');
    }
    if (btnCloseModalShare && modalShare) {
      btnCloseModalShare.onclick = () => modalShare.classList.add('hidden');
    }
    if (btnCopyLink && shareLinkInput) {
      btnCopyLink.onclick = () => {
        navigator.clipboard.writeText(shareLinkInput.value).then(() => {
          showToast('Enlace copiado al portapapeles', 'content_copy');
        }).catch(() => {
          showToast('Enlace listo para copiar', 'content_copy');
        });
      };
    }

    document.querySelectorAll('.share-social-btn').forEach(b => {
      b.onclick = () => {
        showToast(`Abriendo puente hacia ${b.getAttribute('data-social')}...`, 'share');
      };
    });

    // 5. Audio Synopsis Synthesizer Simulator
    const btnAudioSynopsis = document.getElementById('btn-play-audio-synopsis');
    const audioBar = document.getElementById('audio-player-bar');
    const audioText = document.getElementById('audio-text');
    const audioIcon = document.getElementById('audio-icon');
    let isAudioPlaying = false;
    let audioTimerInterval = null;

    if (btnAudioSynopsis && audioBar) {
      btnAudioSynopsis.onclick = () => {
        isAudioPlaying = !isAudioPlaying;
        if (isAudioPlaying) {
          audioBar.classList.remove('hidden');
          audioText.textContent = 'Pausar síntesis';
          audioIcon.textContent = 'pause';
          showToast('Reproduciendo análisis narrado con voz sintética IA...', 'graphic_eq');
        } else {
          audioText.textContent = 'Escuchar sinopsis (0:48)';
          audioIcon.textContent = 'volume_up';
        }
      };
    }

    // 6. Agora: Interactive Star Selector & Mood Chips
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingFeedback = document.getElementById('rating-text-feedback');
    let selectedRating = 5;

    starBtns.forEach(btn => {
      btn.onclick = () => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        selectedRating = val;
        ratingFeedback.textContent = `${val}.0 / 5.0`;

        starBtns.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-val'), 10);
          if (sVal <= val) {
            s.style.fontVariationSettings = "'FILL' 1";
            s.classList.add('text-primary');
            s.classList.remove('text-outline');
          } else {
            s.style.fontVariationSettings = "'FILL' 0";
            s.classList.remove('text-primary');
            s.classList.add('text-outline');
          }
        });
      };
    });

    const moodBtns = document.querySelectorAll('.mood-btn');
    let selectedMood = 'Destrozado pero en paz';

    moodBtns.forEach(mb => {
      mb.onclick = () => {
        moodBtns.forEach(o => {
          o.classList.remove('bg-secondary-container', 'text-on-secondary-container');
          o.classList.add('bg-surface-container', 'text-on-surface');
        });
        mb.classList.remove('bg-surface-container', 'text-on-surface');
        mb.classList.add('bg-secondary-container', 'text-on-secondary-container');
        selectedMood = mb.getAttribute('data-mood');
      };
    });

    // 7. Agora: Live Form Submission
    const reviewForm = document.getElementById('form-review');
    const reviewsFeed = document.getElementById('reviews-feed');

    if (reviewForm && reviewsFeed) {
      reviewForm.onsubmit = (e) => {
        e.preventDefault();
        const authorInput = document.getElementById('review-author');
        const commentInput = document.getElementById('review-comment');
        
        const author = authorInput.value.trim();
        const comment = commentInput.value.trim();

        if (!author || !comment) return;

        // Construct Star HTML string
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
          starsHtml += `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' ${i <= selectedRating ? 1 : 0};">${i <= selectedRating ? 'star' : 'star_border'}</span>`;
        }

        const newCard = document.createElement('div');
        newCard.className = 'review-card p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm border-l-4 border-primary transition-all';
        newCard.setAttribute('data-votes', '1');

        newCard.innerHTML = `
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-space-sm">
              <div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center text-sm">
                ${author.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-title-editorial text-title-editorial text-on-surface">${author}</span>
                  <span class="px-1.5 py-0.2 rounded bg-primary-container text-[10px] font-bold text-on-primary-container">NUEVO</span>
                </div>
                <span class="font-label-meta text-label-meta text-on-surface-variant">Publicado ahora mismo &bull; A través de SPOTLIGHT Ágora</span>
              </div>
            </div>

            <div class="flex items-center text-primary">
              ${starsHtml}
            </div>
          </div>

          <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-badge text-label-badge self-start">
            ${selectedMood}
          </span>

          <p class="font-body-md text-body-md text-on-surface">${comment}</p>

          <div class="pt-space-xs flex items-center justify-between font-label-meta text-label-meta text-on-surface-variant">
            <button type="button" class="btn-upvote flex items-center gap-1 hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[16px]">thumb_up</span>
              <span class="vote-count">1</span> persona encontró esto útil
            </button>
            <button type="button" class="hover:text-on-surface transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">reply</span> Responder (0)
            </button>
          </div>
        `;

        reviewsFeed.prepend(newCard);
        authorInput.value = '';
        commentInput.value = '';

        // Wire newly added upvote button
        wireUpvote(newCard.querySelector('.btn-upvote'));

        showToast('¡Tu reseña ha sido publicada en directo en el Ágora!', 'campaign');
      };
    }

    // 8. Upvote Microinteraction
    function wireUpvote(button) {
      if (!button) return;
      button.onclick = () => {
        const countSpan = button.querySelector('.vote-count');
        let current = parseInt(countSpan.textContent, 10) || 0;
        if (!button.classList.contains('text-primary')) {
          button.classList.add('text-primary');
          countSpan.textContent = current + 1;
          showToast('Voto de utilidad registrado', 'thumb_up');
        } else {
          button.classList.remove('text-primary');
          countSpan.textContent = Math.max(0, current - 1);
        }
      };
    }
    document.querySelectorAll('.btn-upvote').forEach(wireUpvote);

    // 9. Agora Filtering Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(f => {
          f.classList.remove('bg-secondary-container', 'text-on-secondary-container');
          f.classList.add('text-on-surface-variant');
        });
        btn.classList.add('bg-secondary-container', 'text-on-secondary-container');
        btn.classList.remove('text-on-surface-variant');
        showToast(`Filtro aplicado: ${btn.textContent.trim()}`, 'tune');
      };
    });

    // 10. Modal: Recommendation Preview
    const modalRec = document.getElementById('modal-rec');
    const modalRecTitle = document.getElementById('modal-rec-title');
    const modalRecMeta = document.getElementById('modal-rec-meta');
    const modalRecStreaming = document.getElementById('modal-rec-streaming');
    const btnCloseModalRec = document.getElementById('btn-close-modal-rec');
    const btnCloseModalRec2 = document.getElementById('btn-close-modal-rec-2');
    const btnOpenRecFull = document.getElementById('btn-open-rec-full');

    document.querySelectorAll('.btn-preview-rec').forEach(btn => {
      btn.onclick = () => {
        const film = btn.getAttribute('data-film');
        const dir = btn.getAttribute('data-director');
        const year = btn.getAttribute('data-year');
        const stream = btn.getAttribute('data-stream');

        modalRecTitle.textContent = film;
        modalRecMeta.textContent = `Dirigida por ${dir} \u2022 Año de estreno: ${year}`;
        modalRecStreaming.textContent = stream;

        modalRec.classList.remove('hidden');
      };
    });

    if (btnCloseModalRec) btnCloseModalRec.onclick = () => modalRec.classList.add('hidden');
    if (btnCloseModalRec2) btnCloseModalRec2.onclick = () => modalRec.classList.add('hidden');
    if (btnOpenRecFull) {
      btnOpenRecFull.onclick = () => {
        modalRec.classList.add('hidden');
        showToast('Navegando hacia el ensayo monográfico...', 'auto_stories');
      };
    }

  })();
