document.addEventListener('DOMContentLoaded', () => {
    const stationsGrid = document.getElementById('stations-grid');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalInfo = document.getElementById('modal-info');
    const modalClose = document.getElementById('modal-close');

    const typeFilter = document.getElementById('typeFilter');
    const municipioFilter = document.getElementById('municipioFilter');

    let allStations = [];

    // Datos embebidos para funcionar sin servidor (file://)
    const estacionesData = [{ "ID_Electrolinera": "ELN001", "Nombre_Estacion": "E.S. ESSO Los Álamos", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 52 # 65-07", "Tipologia_Carga": "Rápida DC / Lenta AC", "Nivel_Carga": "Nivel 3 / Nivel 2", "Tipo_Tomacorriente": "CCS1 y Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 3, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago (EPM)", "Operador": "EPM / Terpel" }, { "ID_Electrolinera": "ELN002", "Nombre_Estacion": "CC Viva Envigado", "Municipio": "Envigado", "Direccion_Exacta (Aprox.)": "Carrera 48 # 26 Sur-87", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 4, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "EPM / CC" }, { "ID_Electrolinera": "ELN003", "Nombre_Estacion": "E.S. Terpel La 33", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Avenida 33 # 78-315", "Tipologia_Carga": "Carga Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS Combo 1", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 2, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago (Voltex)", "Operador": "Terpel (Voltex)" }, { "ID_Electrolinera": "ELN004", "Nombre_Estacion": "CC Oviedo (Celsia)", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 43A # 6 Sur-15", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "Celsia / CC" }, { "ID_Electrolinera": "ELN005", "Nombre_Estacion": "Universidad EAFIT", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 49 # 7 Sur-50", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Restringido", "Costo_Tarifa": "Convenio", "Operador": "Celsia / U." }, { "ID_Electrolinera": "ELN006", "Nombre_Estacion": "CC Los Molinos", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 82A # 35-15", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "EPM / CC" }, { "ID_Electrolinera": "ELN007", "Nombre_Estacion": "CC Mayorca (Carga Rápida)", "Municipio": "Sabaneta", "Direccion_Exacta (Aprox.)": "Diagonal 49 # 49-65", "Tipologia_Carga": "Carga Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS Combo 1", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 1, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Pago (Voltex)", "Operador": "Terpel (Voltex)" }, { "ID_Electrolinera": "ELN008", "Nombre_Estacion": "Ciudad del Río - MAMM", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Calle 20 # 52-69", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario Museo", "Costo_Tarifa": "Varía", "Operador": "EPM / MAMM" }, { "ID_Electrolinera": "ELN009", "Nombre_Estacion": "CC San Fernando Plaza", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 43A # 1-50", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "Celsia / CC" }, { "ID_Electrolinera": "ELN010", "Nombre_Estacion": "Unicentro Medellín", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Carrera 66B # 34A-76", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "EPM / CC" }, { "ID_Electrolinera": "ELN011", "Nombre_Estacion": "E.S. Texaco Niquía", "Municipio": "Bello", "Direccion_Exacta (Aprox.)": "Autopista Norte (Vía a Niquía)", "Tipologia_Carga": "Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS Combo 1", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 1, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago (Voltex)", "Operador": "Terpel (Voltex)" }, { "ID_Electrolinera": "ELN012", "Nombre_Estacion": "E.S. Terpel Garota", "Municipio": "Sabaneta", "Direccion_Exacta (Aprox.)": "Carrera 48 # 41A Sur - 146", "Tipologia_Carga": "Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS Combo 1", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago (Voltex)", "Operador": "Terpel (Voltex)" }, { "ID_Electrolinera": "ELN013", "Nombre_Estacion": "CC Florida Parque Comercial", "Municipio": "Bello", "Direccion_Exacta (Aprox.)": "Diagonal 55 # 34-67", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "EPM / CC" }, { "ID_Electrolinera": "ELN014", "Nombre_Estacion": "E.S. Voltex Autopista Sur", "Municipio": "Itagüí", "Direccion_Exacta (Aprox.)": "Autopista Sur (Cerca Induamérica)", "Tipologia_Carga": "Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS Combo 1", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago (Voltex)", "Operador": "Terpel (Voltex)" }, { "ID_Electrolinera": "ELN006", "Nombre_Estacion": "CC Santafé Medellín", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Cra 43A # 7-50", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 3, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "EPM" }, { "ID_Electrolinera": "ELN007", "Nombre_Estacion": "E.S. Primax La 80", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Av 80 # 45-10", "Tipologia_Carga": "Rápida DC / Lenta AC", "Nivel_Carga": "Nivel 3 / Nivel 2", "Tipo_Tomacorriente": "CCS1 y Tipo 2", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 2, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago", "Operador": "Primax" }, { "ID_Electrolinera": "ELN008", "Nombre_Estacion": "Bulevar Niza", "Municipio": "Bogotá", "Direccion_Exacta (Aprox.)": "Av Suba # 127D-50", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 1 (J1772)", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 4, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Gratuito", "Operador": "Codensa" }, { "ID_Electrolinera": "ELN009", "Nombre_Estacion": "Parque la 93", "Municipio": "Bogotá", "Direccion_Exacta (Aprox.)": "Cra 11A # 93A-10", "Tipologia_Carga": "Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS1", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 2, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago", "Operador": "Enel X" }, { "ID_Electrolinera": "ELN010", "Nombre_Estacion": "Terminal Norte Bogotá", "Municipio": "Bogotá", "Direccion_Exacta (Aprox.)": "Autonorte # 175-20", "Tipologia_Carga": "Rápida DC / Lenta AC", "Nivel_Carga": "Nivel 3 / Nivel 2", "Tipo_Tomacorriente": "CCS1 y Tipo 2", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 5, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago", "Operador": "Enel X" }, { "ID_Electrolinera": "ELN011", "Nombre_Estacion": "Universidad de Antioquia", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Calle 67 # 53-108", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario Campus", "Costo_Tarifa": "Gratuito", "Operador": "UdeA" }, { "ID_Electrolinera": "ELN012", "Nombre_Estacion": "CC Unicentro Bogotá", "Municipio": "Bogotá", "Direccion_Exacta (Aprox.)": "Cl 127 # 15-36", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 6, "Horario_Disponible": "Horario CC", "Costo_Tarifa": "Pago", "Operador": "Enel X" }, { "ID_Electrolinera": "ELN013", "Nombre_Estacion": "Parque Explora", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Cra 52 # 73-75", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 7.4, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario Parque", "Costo_Tarifa": "Gratuito", "Operador": "EPM" }, { "ID_Electrolinera": "ELN014", "Nombre_Estacion": "Centro Internacional Bogotá", "Municipio": "Bogotá", "Direccion_Exacta (Aprox.)": "Cl 28 # 13A-15", "Tipologia_Carga": "Rápida DC", "Nivel_Carga": "Nivel 3", "Tipo_Tomacorriente": "CCS1", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 1, "Horario_Disponible": "24 horas", "Costo_Tarifa": "Pago", "Operador": "Codensa" }, { "ID_Electrolinera": "ELN015", "Nombre_Estacion": "Museo del Metro Medellín", "Municipio": "Medellín", "Direccion_Exacta (Aprox.)": "Cl 44 # 46-30", "Tipologia_Carga": "Carga Lenta AC", "Nivel_Carga": "Nivel 2", "Tipo_Tomacorriente": "Tipo 2", "Potencia_Max_kW": 50.0, "Cantidad_Puntos": 2, "Horario_Disponible": "Horario Metro", "Costo_Tarifa": "Gratuito", "Operador": "Metro de Medellín" }];

    allStations = estacionesData;
    populateFilters(estacionesData);
    renderStations(estacionesData);
    setupEventListeners();

    // Populate filter dropdowns dynamically
    function populateFilters(stations) {
        // Get unique municipalities
        const municipios = [...new Set(stations.map(s => s.Municipio))].sort();
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio;
            option.textContent = municipio;
            municipioFilter.appendChild(option);
        });

        // Get unique charge types
        const tipos = [...new Set(stations.map(s => s.Tipologia_Carga))].sort();
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            typeFilter.appendChild(option);
        });
    }

    // Setup event listeners for filters
    function setupEventListeners() {

        typeFilter.addEventListener('change', applyFilters);
        municipioFilter.addEventListener('change', applyFilters);
    }

    // Apply all filters
    function applyFilters() {
        const selectedType = typeFilter.value;
        const selectedMunicipio = municipioFilter.value;

        const filtered = allStations.filter(station => {

            // Type filter
            const matchesType = selectedType === 'all' ||
                station.Tipologia_Carga === selectedType;

            // Municipality filter
            const matchesMunicipio = selectedMunicipio === 'all' ||
                station.Municipio === selectedMunicipio;

            return matchesType && matchesMunicipio;
        });

        renderStations(filtered);
    }

    function renderStations(stations) {
        stationsGrid.innerHTML = '';

        if (stations.length === 0) {
            stationsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 2rem;">No se encontraron estaciones con los filtros seleccionados.</p>';
            return;
        }

        stations.forEach(station => {
            const card = document.createElement('div');
            card.className = 'station-card';
            card.innerHTML = `
                <h3>${station.Nombre_Estacion}</h3>
                <p><strong>Municipio:</strong> ${station.Municipio}</p>
                <p><strong>Dirección:</strong> ${station['Direccion_Exacta (Aprox.)']}</p>
                <div class="meta">
                    <span class="badge">${station.Tipologia_Carga}</span>
                    <span>${station.Operador}</span>
                </div>
            `;

            card.addEventListener('click', () => openModal(station));
            stationsGrid.appendChild(card);
        });
    }

    function openModal(station) {
        // Set modal content
        modalImg.src = 'Estaciones decarga.png';

        modalInfo.innerHTML = `
            <h2>${station.Nombre_Estacion}</h2>
            <p><strong>ID:</strong> ${station.ID_Electrolinera}</p>
            <p><strong>Municipio:</strong> ${station.Municipio}</p>
            <p><strong>Dirección:</strong> ${station['Direccion_Exacta (Aprox.)']}</p>
            <p><strong>Tipología:</strong> ${station.Tipologia_Carga}</p>
            <p><strong>Nivel de Carga:</strong> ${station.Nivel_Carga}</p>
            <p><strong>Tipo Tomacorriente:</strong> ${station.Tipo_Tomacorriente}</p>
            <p><strong>Potencia Máx:</strong> ${station.Potencia_Max_kW} kW</p>
            <p><strong>Cantidad Puntos:</strong> ${station.Cantidad_Puntos}</p>
            <p><strong>Horario:</strong> ${station.Horario_Disponible}</p>
            <p><strong>Costo:</strong> ${station.Costo_Tarifa}</p>
            <p><strong>Operador:</strong> ${station.Operador}</p>
        `;

        modal.setAttribute('aria-hidden', 'false');
    }

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
    }
});
