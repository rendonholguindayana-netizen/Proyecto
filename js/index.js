
    // 1. GESTIÓN DEL MENÚ DE USUARIO DROPDOWN
    const userMenuBtn = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const userContainer = document.getElementById('user-menu-container');

    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = userMenuBtn.getAttribute('aria-expanded') === 'true';
        userMenuBtn.setAttribute('aria-expanded', !isExpanded);
        userDropdown.classList.toggle('hidden');
      });

      // Cerrar al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!userContainer.contains(e.target)) {
          userDropdown.classList.add('hidden');
          userMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 2. MODAL DE BÚSQUEDA RÁPIDA (⌘K)
    const searchModal = document.getElementById('search-modal');
    const headerSearchTrigger = document.getElementById('header-search-trigger');
    const headerKbdBtn = document.getElementById('header-kbd-btn');
    const searchModalInput = document.getElementById('search-modal-input');

    function openSearchModal() {
      searchModal.classList.remove('hidden');
      setTimeout(() => searchModalInput?.focus(), 100);
    }

    function closeSearchModal() {
      searchModal.classList.add('hidden');
    }

    headerSearchTrigger?.addEventListener('click', openSearchModal);
    headerKbdBtn?.addEventListener('click', openSearchModal);

    // Atajo de teclado global: Command+K o Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchModal.classList.contains('hidden')) {
          openSearchModal();
        } else {
          closeSearchModal();
        }
      }
      if (e.key === 'Escape') {
        document.querySelectorAll('#search-modal, #surprise-modal, #quiz-modal').forEach(m => m.classList.add('hidden'));
      }
    });

    // Filtro reactivo en modal de búsqueda
    if (searchModalInput) {
      searchModalInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const items = document.querySelectorAll('#search-results-list a');
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }

    // 3. MODAL "SORPRÉNDEME"
    const surpriseBtn = document.getElementById('btn-surprise-me');
    const surpriseModal = document.getElementById('surprise-modal');
    const btnRollAgain = document.getElementById('btn-roll-again');
    const surpriseSpinner = document.getElementById('surprise-spinner');

    const randomRecommendations = [
      {
        title: "El Ojo del Vórtice",
        mood: "🤯 Mindfuck / Misterio",
        score: "4.8 / 5.0",
        meta: "Denis Villeneuve • 2h 18m • 2024",
        synopsis: "Una atmósfera asfixiante donde el tiempo no es lineal, sino una espiral de recuerdos manipulados. Imperdible en Max.",
        platform: "Max (HBO)"
      },
      {
        title: "Las Sombras de Shinjuku",
        mood: "🕯️ Tensión Nocturna",
        score: "4.9 / 5.0",
        meta: "Neon Noir • 1h 54m • 2024",
        synopsis: "Un detective insomne desmantela un sindicato algorítmico en las noches de lluvia de Tokio.",
        platform: "Netflix"
      },
      {
        title: "La Herencia Toscanini",
        mood: "😂 Risas sin Pensar",
        score: "4.7 / 5.0",
        meta: "Serie • 8 Episodios • 2024",
        synopsis: "Diálogos afiladísimos al estilo Succession pero con el encanto caótico de una familia italiana en verano.",
        platform: "Apple TV+"
      },
      {
        title: "Antes de que Olvide Tu Voz",
        mood: "😭 Llorar a Gusto",
        score: "4.6 / 5.0",
        meta: "Drama Poético • 1h 42m • 2023",
        synopsis: "Una oda sublime a los amores truncados por el tiempo. Prepara pañuelos para una experiencia demoledora.",
        platform: "Filmin"
      },
      {
        title: "Dune: Parte Dos",
        mood: "⚡ Adrenalina Pura",
        score: "4.8 / 5.0",
        meta: "Sci-Fi Épico • 2h 46m • 2024",
        synopsis: "La escala descomunal del desierto y la guerra santa estelar que redefine el cine de gran formato.",
        platform: "Max (HBO)"
      }
    ];

    function rollRandomMovie() {
      if (surpriseSpinner) surpriseSpinner.classList.add('animate-spin');
      const randomItem = randomRecommendations[Math.floor(Math.random() * randomRecommendations.length)];

      setTimeout(() => {
        document.getElementById('surprise-title').textContent = randomItem.title;
        document.getElementById('surprise-mood').textContent = randomItem.mood;
        document.getElementById('surprise-score').innerHTML = `<span class="material-symbols-outlined text-[16px] text-primary-container" style="font-variation-settings: 'FILL' 1;">star</span> ${randomItem.score}`;
        document.getElementById('surprise-meta').textContent = randomItem.meta;
        document.getElementById('surprise-synopsis').textContent = randomItem.synopsis;
        document.getElementById('surprise-platform').textContent = randomItem.platform;
        if (surpriseSpinner) surpriseSpinner.classList.remove('animate-spin');
      }, 200);
    }

    surpriseBtn?.addEventListener('click', () => {
      rollRandomMovie();
      surpriseModal.classList.remove('hidden');
    });

    btnRollAgain?.addEventListener('click', rollRandomMovie);

    // 4. MODAL QUIZ "QUÉ VER HOY"
    const navBtnQuiz = document.getElementById('nav-btn-quiz');
    const bannerBtnQuiz = document.getElementById('banner-btn-quiz');
    const quizModal = document.getElementById('quiz-modal');
    const quizStep1 = document.getElementById('quiz-step-1');
    const quizStep2 = document.getElementById('quiz-step-2');
    const quizStep3 = document.getElementById('quiz-step-3');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');

    function openQuiz() {
      quizModal.classList.remove('hidden');
      resetQuiz();
    }

    function resetQuiz() {
      quizStep1.classList.remove('hidden');
      quizStep1.classList.add('flex');
      quizStep2.classList.add('hidden');
      quizStep2.classList.remove('flex');
      quizStep3.classList.add('hidden');
      quizStep3.classList.remove('flex');
    }

    navBtnQuiz?.addEventListener('click', openQuiz);
    bannerBtnQuiz?.addEventListener('click', openQuiz);
    btnRestartQuiz?.addEventListener('click', resetQuiz);

    // Navegación entre pasos del quiz
    document.querySelectorAll('#quiz-step-1 .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        quizStep1.classList.add('hidden');
        quizStep1.classList.remove('flex');
        quizStep2.classList.remove('hidden');
        quizStep2.classList.add('flex');
      });
    });

    document.querySelectorAll('#quiz-step-2 .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        quizStep2.classList.add('hidden');
        quizStep2.classList.remove('flex');
        quizStep3.classList.remove('hidden');
        quizStep3.classList.add('flex');
      });
    });

    // Cerrar modales genérico
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (targetId) {
          document.getElementById(targetId)?.classList.add('hidden');
        }
      });
    });

    // Cerrar clicando el backdrop
    [searchModal, surpriseModal, quizModal].forEach(modal => {
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    // 5. RESALTADO ACTIVO DE ENLACES SEGÚN SCROLL
    const sections = [
      {id: 'seccion-animo', path: 'por-estado-de-ánimo'},
      {id: 'seccion-feed', path: 'explorar-reseñas'},
      {id: 'seccion-plataformas', path: 'top-plataformas'},
      {id: 'seccion-comunidad', path: 'comunidad-&-críticas'}
    ];

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('nav a.nav-link').forEach(link => {
              if (link.getAttribute('data-path') === sec.path) {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('text-on-surface-variant');
              } else {
                link.classList.remove('text-primary', 'font-bold');
                link.classList.add('text-on-surface-variant');
              }
            });
          }
        }
      });
    });

    // Mood Filter Chip Toggle
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        moodBtns.forEach(b => {
          b.classList.remove('bg-primary-container', 'text-on-primary-fixed');
          b.classList.add('bg-surface-container-lowest', 'text-on-surface');
        });
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface');
        btn.classList.add('bg-primary-container', 'text-on-primary-fixed');
      });
    });

    // Platform Tab Selector
    const platformTabs = document.querySelectorAll('.platform-tab');
    platformTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        platformTabs.forEach(t => {
          t.classList.remove('bg-surface-container-lowest', 'text-on-surface');
          t.classList.add('bg-surface-container-lowest/60', 'text-on-surface-variant');
        });
        tab.classList.remove('bg-surface-container-lowest/60', 'text-on-surface-variant');
        tab.classList.add('bg-surface-container-lowest', 'text-on-surface');
      });
    });

    // Feed Tabs
    const feedTabs = document.querySelectorAll('.feed-tab-btn');
    feedTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        feedTabs.forEach(b => {
          b.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
          b.classList.add('text-on-surface-variant');
        });
        btn.classList.remove('text-on-surface-variant');
        btn.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      });
    });

    // Interactive Star Rating Widget
    const starBtns = document.querySelectorAll('#interactive-star-rating .star-rate');
    const starLabel = document.getElementById('star-rate-label');
    starBtns.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-val'));
        starLabel.textContent = val.toFixed(1) + ' / 5.0';
        starBtns.forEach((s, idx) => {
          if (idx < val) {
            s.classList.remove('text-surface-container-high');
            s.classList.add('text-primary-container');
          } else {
            s.classList.remove('text-primary-container');
            s.classList.add('text-surface-container-high');
          }
        });
      });
    });

    // Express review submit feedback
    const expressForm = document.getElementById('express-review-form');
    if (expressForm) {
      expressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = expressForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> Reseña Publicada con Éxito!';
        btn.classList.add('bg-secondary-container');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-secondary-container');
          expressForm.reset();
        }, 2500);
      });
    }
  