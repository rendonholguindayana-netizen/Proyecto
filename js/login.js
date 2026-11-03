
    // Estado global de la aplicación
    let currentAuthMode = 'login'; // 'login' | 'register'
    let currentSocialProvider = '';
    let pendingNavDestination = '';
    let toastTimeout = null;

    // 1. ALTERNANCIA REACTIVA DE PESTAÑAS
    function switchAuthTab(mode) {
      currentAuthMode = mode;
      const tabLoginBtn = document.getElementById('tab-login-btn');
      const tabRegisterBtn = document.getElementById('tab-register-btn');
      const registerNameFields = document.getElementById('register-name-fields');
      const registerConfirmPwd = document.getElementById('register-confirm-password-wrapper');
      const registerTaste = document.getElementById('register-taste-module');
      const registerTerms = document.getElementById('register-terms-wrapper');
      const rememberWrapper = document.getElementById('remember-device-wrapper');
      const quickPresetsWrapper = document.getElementById('quick-presets-wrapper');
      const submitBtnText = document.getElementById('submit-btn-text');
      const forgotPwdLink = document.getElementById('forgot-password-link');
      const formFullName = document.getElementById('form-fullname');
      const formUsername = document.getElementById('form-username');
      const formConfirmPassword = document.getElementById('form-confirm-password');

      if (mode === 'login') {
        // Estilo de pestañas
        tabLoginBtn.className = 'flex-1 py-3 px-4 rounded-md font-label-prominent text-label-prominent transition-all duration-200 text-center flex items-center justify-center gap-2 bg-surface-container-lowest shadow-sm text-on-surface border border-outline-variant/30';
        tabRegisterBtn.className = 'flex-1 py-3 px-4 rounded-md font-label-prominent text-label-prominent transition-all duration-200 text-center flex items-center justify-center gap-2 text-outline hover:text-on-surface';

        // Visibilidad de campos
        registerNameFields.classList.add('hidden');
        registerConfirmPwd.classList.add('hidden');
        registerTaste.classList.add('hidden');
        registerTerms.classList.add('hidden');
        rememberWrapper.classList.remove('hidden');
        quickPresetsWrapper.classList.remove('hidden');
        forgotPwdLink.classList.remove('hidden');

        // Requerimientos
        formFullName.required = false;
        formUsername.required = false;
        formConfirmPassword.required = false;

        // Texto del botón
        submitBtnText.textContent = 'Acceder a la Plataforma SPOTLIGHT';
        showToast('Modo Ingreso', 'Introduce tus credenciales o usa el Acceso Rápido.', 'info');
      } else {
        // Modo Registro
        tabRegisterBtn.className = 'flex-1 py-3 px-4 rounded-md font-label-prominent text-label-prominent transition-all duration-200 text-center flex items-center justify-center gap-2 bg-surface-container-lowest shadow-sm text-on-surface border border-outline-variant/30';
        tabLoginBtn.className = 'flex-1 py-3 px-4 rounded-md font-label-prominent text-label-prominent transition-all duration-200 text-center flex items-center justify-center gap-2 text-outline hover:text-on-surface';

        // Visibilidad de campos
        registerNameFields.classList.remove('hidden');
        registerConfirmPwd.classList.remove('hidden');
        registerTaste.classList.remove('hidden');
        registerTerms.classList.remove('hidden');
        rememberWrapper.classList.add('hidden');
        quickPresetsWrapper.classList.add('hidden');
        forgotPwdLink.classList.add('hidden');

        // Requerimientos
        formFullName.required = true;
        formUsername.required = true;
        formConfirmPassword.required = true;

        // Botón principal
        submitBtnText.textContent = 'Crear Cuenta en SPOTLIGHT';
        showToast('Registro de Miembro', 'Completa tus datos y preferencias de cine.', 'info');
      }
    }

    // 2. ACCESO RÁPIDO CON 1 CLIC (PRESETS)
    function selectRole(role) {
      if (currentAuthMode !== 'login') {
        switchAuthTab('login');
      }
      const emailInput = document.getElementById('form-email');
      const pwdInput = document.getElementById('form-password');

      if (role === 'admin') {
        emailInput.value = 'admin@spotlight.cine';
        pwdInput.value = 'admin2024!';
        showToast('Credenciales Staff', 'Credenciales de Administrador cargadas.', 'info');
      } else if (role === 'critic') {
        emailInput.value = 'sofia@spotlight.cine';
        pwdInput.value = 'critica2024!';
        showToast('Credenciales Staff', 'Credenciales de Crítica Editorial cargadas.', 'info');
      } else {
        emailInput.value = 'lucas@cinemateca.org';
        pwdInput.value = 'cinefilo2024!';
        showToast('Credenciales Cinéfilo', 'Credenciales de Cinéfilo cargadas.', 'info');
      }
    }

    // 3. MOSTRAR / OCULTAR CONTRASEÑA
    function togglePasswordVisibility(fieldId, iconId) {
      const field = document.getElementById(fieldId);
      const icon = document.getElementById(iconId);
      if (!field || !icon) return;

      if (field.type === 'password') {
        field.type = 'text';
        icon.textContent = 'visibility_off';
        showToast('Contraseña visible', 'El texto de la contraseña ahora es visible.', 'info');
      } else {
        field.type = 'password';
        icon.textContent = 'visibility';
        showToast('Contraseña oculta', 'El texto de la contraseña está protegido.', 'info');
      }
    }

    // 4. MODAL RECUPERAR CONTRASEÑA
    function openRecoverModal() {
      const currentEmail = document.getElementById('form-email').value;
      const recoverEmailInput = document.getElementById('recover-email');
      if (currentEmail && currentEmail.includes('@')) {
        recoverEmailInput.value = currentEmail;
      }
      document.getElementById('recover-modal').classList.remove('hidden');
    }

    function closeRecoverModal() {
      document.getElementById('recover-modal').classList.add('hidden');
    }

    function handleRecoverSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('recover-email').value;
      const btn = document.getElementById('recover-btn-submit');
      const origText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span> Enviando...`;

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = origText;
        closeRecoverModal();
        showToast('Enlace de Recuperación Enviado', `Se despachó un enlace de restablecimiento seguro a ${email}. Válido por 15 minutos.`, 'success');
      }, 700);
    }

    // 5. SUBMIT PRINCIPAL CON VALIDACIÓN Y SPINNER
    function handleUnifiedFormSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('unified-submit-btn');
      const spinner = document.getElementById('submit-spinner');
      const btnText = document.getElementById('submit-btn-text');
      const email = document.getElementById('form-email').value.trim();
      const password = document.getElementById('form-password').value;

      if (!email) {
        showToast('Validación', 'Por favor ingresa un correo electrónico válido.', 'error');
        return;
      }
      if (!password) {
        showToast('Validación', 'Por favor introduce tu contraseña.', 'error');
        return;
      }

      if (currentAuthMode === 'register') {
        const confirmPwd = document.getElementById('form-confirm-password').value;
        const termsAccepted = document.getElementById('reg-terms').checked;
        const fullName = document.getElementById('form-fullname').value.trim();

        if (password !== confirmPwd) {
          showToast('Error de Validación', 'Las contraseñas no coinciden. Por favor revísalas.', 'error');
          return;
        }
        if (!termsAccepted) {
          showToast('Manifiesto Requerido', 'Debes apoyar el Manifiesto Humano de SPOTLIGHT para registrarte.', 'error');
          return;
        }

        // Proceso de Registro
        spinner.classList.remove('hidden');
        btnText.textContent = 'Creando expediente cinéfilo...';
        btn.disabled = true;

        setTimeout(() => {
          spinner.classList.add('hidden');
          btnText.textContent = '¡Cuenta Creada con Éxito!';
          btn.disabled = false;
          openWelcomeModal(fullName || 'Cinéfilo', 'register');
        }, 800);

      } else {
        // Proceso de Login
        spinner.classList.remove('hidden');
        btnText.textContent = 'Autenticando credenciales...';
        btn.disabled = true;

        setTimeout(() => {
          spinner.classList.add('hidden');
          btnText.textContent = '¡Acceso Concedido!';
          btn.disabled = false;
          
          let userName = 'Cinéfilo';
          if (email.includes('admin')) userName = 'Administrador Staff';
          else if (email.includes('sofia')) userName = 'Sofía Morales';
          else if (email.includes('lucas')) userName = 'Lucas Cinemateca';

          openWelcomeModal(userName, 'login');
        }, 800);
      }
    }

    // 5b. MODAL DE BIENVENIDA / ACCESO
    function openWelcomeModal(userName, action) {
      const modal = document.getElementById('welcome-success-modal');
      const title = document.getElementById('welcome-modal-title');
      const desc = document.getElementById('welcome-modal-desc');

      if (action === 'register') {
        title.textContent = `¡Bienvenido a SPOTLIGHT, ${userName}!`;
        desc.textContent = 'Tu membresía cinéfila ha sido registrada con éxito. Tu biblioteca y filtros de streaming ya están configurados.';
      } else {
        title.textContent = `¡Bienvenido a SPOTLIGHT, ${userName}!`;
        desc.textContent = 'Has ingresado con éxito mediante autenticación segura. Tu sesión está activa.';
      }

      modal.classList.remove('hidden');
      showToast('Autenticación Exitosa', `Sesión iniciada como ${userName}.`, 'success');
    }

    function closeWelcomeModal() {
      document.getElementById('welcome-success-modal').classList.add('hidden');
      const btnText = document.getElementById('submit-btn-text');
      btnText.textContent = currentAuthMode === 'login' ? 'Acceder a la Plataforma SPOTLIGHT' : 'Crear Cuenta en SPOTLIGHT';
    }

    function simulateRedirect(destination) {
      closeWelcomeModal();
      showToast('Redirección en Progreso', `Cargando el entorno de ${destination}...`, 'info');
      setTimeout(() => {
        showToast('Navegación Completada', `Te encuentras en: ${destination}.`, 'success');
      }, 1200);
    }

    // 6. BOTONES DE AUTENTICACIÓN SOCIAL
    function openSocialModal(provider) {
      currentSocialProvider = provider;
      const modal = document.getElementById('social-modal');
      const title = document.getElementById('social-modal-title');
      const subtitle = document.getElementById('social-modal-subtitle');
      const icon = document.getElementById('social-modal-icon');

      title.textContent = `Conectar con ${provider}`;
      if (provider === 'Letterboxd') {
        icon.textContent = 'movie';
        subtitle.textContent = 'Sincronizaremos tus reseñas, calificaciones (1-5 estrellas) y tu watchlist existente.';
      } else if (provider === 'Google') {
        icon.textContent = 'public';
        subtitle.textContent = 'Autenticación con tu Cuenta de Google One Tap y verificación de correo segura.';
      } else {
        icon.textContent = 'terminal';
        subtitle.textContent = 'Autenticación biométrica con Apple ID mediante Touch ID / Face ID.';
      }

      modal.classList.remove('hidden');
    }

    function closeSocialModal() {
      document.getElementById('social-modal').classList.add('hidden');
    }

    function confirmSocialAuth() {
      closeSocialModal();
      showToast('Sincronización Exitosa', `Se vinculó correctamente la cuenta de ${currentSocialProvider}. Redirigiendo a tu cartelera...`, 'success');
    }

    // 7. BOTONES VOLVER Y STAFF
    function triggerNavigation(destination) {
      pendingNavDestination = destination;
      const modal = document.getElementById('nav-confirm-modal');
      const title = document.getElementById('nav-modal-title');
      const msg = document.getElementById('nav-modal-message');
      const icon = document.getElementById('nav-modal-icon');

      if (destination === 'catalog') {
        title.textContent = 'Volver al Catálogo Público';
        msg.textContent = '¿Deseas regresar a la cartelera pública de películas y estrenos sin guardar cambios pendientes?';
        icon.textContent = 'arrow_back';
      } else {
        title.textContent = 'Acceso Directo Staff';
        msg.textContent = '¿Acceder a la consola editorial SPOTLIGHT para curadores y administradores?';
        icon.textContent = 'shield_person';
      }

      modal.classList.remove('hidden');
    }

    function closeNavModal() {
      document.getElementById('nav-confirm-modal').classList.add('hidden');
    }

    function executeNavigationAction() {
      closeNavModal();
      if (pendingNavDestination === 'catalog') {
        showToast('Navegando', 'Redirigiendo a la cartelera del Catálogo Público...', 'info');
      } else {
        selectRole('admin');
        showToast('Consola Staff', 'Cargando entorno de administración SPOTLIGHT...', 'success');
      }
    }

    function showSecurityInfo() {
      showToast('Certificación de Seguridad', 'Canal protegido mediante TLS 1.3 con clave criptográfica de 256 bits y verificación humana.', 'info');
    }

    function showManifestoModal() {
      showToast('Manifiesto SPOTLIGHT', '“El arte cinematográfico se honra a través de la experiencia subjetiva, crítica y humana.”', 'info');
    }

    // 8. TARJETA IZQUIERDA: MODAL FICHA DE PELÍCULA
    function openMovieDetailModal() {
      document.getElementById('movie-detail-modal').classList.remove('hidden');
      showToast('Ficha Técnica Abierta', 'Explorando detalles y premios de Anatomía de una Caída.', 'info');
    }

    function closeMovieDetailModal() {
      document.getElementById('movie-detail-modal').classList.add('hidden');
    }

    // PILLS SELECCIÓN DE STREAMING Y MOOD
    function toggleSelection(btn) {
      const isActive = btn.classList.contains('bg-secondary-container');
      if (isActive) {
        btn.classList.remove('bg-secondary-container', 'text-on-secondary-container', 'border-secondary');
        btn.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant/30');
        showToast('Preferencia Desactivada', `Se eliminó "${btn.textContent.trim()}" de tus filtros preferentes.`, 'info');
      } else {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant/30');
        btn.classList.add('bg-secondary-container', 'text-on-secondary-container', 'border-secondary');
        showToast('Preferencia Guardada', `"${btn.textContent.trim()}" añadido a tu radar cinematográfico.`, 'success');
      }
    }

    // 9. SISTEMA TOAST DINÁMICO
    function showToast(title, message, type = 'success') {
      const toast = document.getElementById('auth-toast');
      const toastTitle = document.getElementById('toast-title');
      const toastMessage = document.getElementById('toast-message');
      const toastIcon = document.getElementById('toast-icon');

      if (toastTimeout) clearTimeout(toastTimeout);

      toastTitle.textContent = title;
      toastMessage.textContent = message;

      // Reset classes
      toast.className = 'absolute top-6 right-6 left-6 sm:left-auto sm:w-96 p-4 rounded-lg shadow-2xl transition-all duration-300 z-50 flex items-start gap-3 border-l-4 pointer-events-auto';

      if (type === 'success') {
        toast.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border-primary');
        toastIcon.textContent = 'check_circle';
        toastIcon.className = 'material-symbols-outlined text-2xl text-primary flex-shrink-0';
      } else if (type === 'info') {
        toast.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border-secondary');
        toastIcon.textContent = 'info';
        toastIcon.className = 'material-symbols-outlined text-2xl text-secondary flex-shrink-0';
      } else if (type === 'error') {
        toast.classList.add('bg-error-container', 'text-on-error-container', 'border-error');
        toastIcon.textContent = 'warning';
        toastIcon.className = 'material-symbols-outlined text-2xl text-error flex-shrink-0';
      }

      toast.classList.remove('hidden');

      toastTimeout = setTimeout(() => {
        closeToast();
      }, 4500);
    }

    function closeToast() {
      const toast = document.getElementById('auth-toast');
      if (toast) toast.classList.add('hidden');
    }

    // Tecla ESC para cerrar modales activos
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeRecoverModal();
        closeWelcomeModal();
        closeSocialModal();
        closeMovieDetailModal();
        closeNavModal();
        closeToast();
      }
    });
  