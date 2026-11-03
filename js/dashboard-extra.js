
    window.openCreateModal = function () {
      const titleEl = document.getElementById("modal-movie-title");
      if (titleEl) titleEl.textContent = "Nueva Obra Cinematográfica";
      const idEl = document.getElementById("movie-id");
      if (idEl) idEl.value = "";
      const form = document.getElementById("form-movie");
      if (form) form.reset();
      const posterInput = document.getElementById("movie-poster");
      if (posterInput) posterInput.value = "";
      const modal = document.getElementById("modal-movie");
      if (modal) modal.classList.remove("hidden");
    };

    window.closeMovieModal = function () {
      const modal = document.getElementById("modal-movie");
      if (modal) modal.classList.add("hidden");
    };

    window.handleSaveMovie = function (e) {
      if (e) e.preventDefault();
      const id = document.getElementById("movie-id").value;
      const title = document.getElementById("movie-title").value.trim();
      const director = document.getElementById("movie-director").value.trim();
      const type = document.getElementById("movie-type").value;
      const platform = document.getElementById("movie-platform").value;
      const score = parseFloat(document.getElementById("movie-score").value || 8.5).toFixed(1);
      const mood = document.getElementById("movie-mood").value;
      const status = document.getElementById("movie-status").value;
      const synopsis = document.getElementById("movie-synopsis").value.trim();
      const posterInput = document.getElementById("movie-poster");
      const poster = posterInput ? posterInput.value.trim() : "";

      if (!title || !director) {
        showToast("Por favor completa el título y director", "warning");
        return;
      }

      const isNew = !id;
      const movieObj = {
        id: id || `mov-${Date.now()}`,
        title,
        director,
        type,
        platform,
        score,
        mood,
        status,
        synopsis,
        poster
      };

      if (isNew) {
        catalogData.unshift(movieObj);
      } else {
        const idx = catalogData.findIndex(m => m.id === id);
        if (idx !== -1) catalogData[idx] = movieObj;
      }

      closeMovieModal();
      filterCatalog();

      const firstRow = document.querySelector("#catalog-table-body tr:first-child");
      if (firstRow && isNew) {
        firstRow.classList.add("bg-secondary-container/50", "transition-all", "duration-700");
        setTimeout(() => {
          firstRow.classList.remove("bg-secondary-container/50");
        }, 2500);
      }

      const metricCatalog = document.getElementById("metric-catalog-count");
      if (metricCatalog) {
        metricCatalog.textContent = catalogData.length;
      }

      showToast("¡Obra cinematográfica subida con éxito al catálogo de SPOTLIGHT!", "success");
    };
  