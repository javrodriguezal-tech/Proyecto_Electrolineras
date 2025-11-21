// Charts Preview - Navigation and Rendering
document.addEventListener('DOMContentLoaded', function () {
    // Verificar que Chart.js esté cargado
    if (typeof Chart === 'undefined') {
        console.error('Chart.js no está cargado');
        return;
    }

    // Datos de los gráficos (copiados de portal_analisis.html)
    const dataParqueMotorizado = {
        labels: ['Carros BEV', 'Motos Eléctricas', 'Flotas/Comercial/Taxi'],
        quantities: [4500, 1800, 300]
    };

    const dataMarcasBEV = {
        labels: ['BYD', 'Kia', 'Volvo', 'Chevrolet', 'BMW', 'Renault', 'Otras'],
        quantities: [2500, 450, 300, 250, 150, 100, 750]
    };

    const dataComparacion = {
        labels: ['Carro BEV (SUV/Compacto)', 'Híbrido (PHEV - Modo EV)', 'Flota/Comercial', 'Moto Eléctrica', 'Patineta Eléctrica', 'Bicicleta Eléctrica'],
        consumo: [18, 16, 25, 4, 1, 0.5],
        costoDomestico: [17100, 15200, 23750, 3800, 950, 475],
        costoPublico: [22734, 20208, 31575, 5052, 1263, 632]
    };

    // Colores
    const primaryColor = 'rgba(5, 150, 105, 1)';
    const secondaryColor = 'rgba(52, 211, 153, 1)';
    const accentColor = 'rgba(16, 185, 129, 1)';

    // Crear gráficos
    const charts = [];

    // Gráfico 1: Pie Chart (AJUSTADO PARA SER MÁS PEQUEÑO)
    charts[0] = new Chart(document.getElementById('previewChart1'), {
        type: 'pie',
        data: {
            labels: dataParqueMotorizado.labels,
            datasets: [{
                label: 'Cantidad (Estimada)',
                data: dataParqueMotorizado.quantities,
                backgroundColor: [primaryColor, secondaryColor, accentColor],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2, // Esto hace el gráfico más ancho y menos alto
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.raw.toLocaleString()} unidades`
                    }
                }
            }
        }
    });

    // Gráfico 2: Bar Chart (Market Share)
    charts[1] = new Chart(document.getElementById('previewChart2'), {
        type: 'bar',
        data: {
            labels: dataMarcasBEV.labels,
            datasets: [{
                label: 'Unidades Estimadas',
                data: dataMarcasBEV.quantities,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `Unidades: ${context.raw.toLocaleString()}`
                    }
                }
            }
        }
    });

    // Gráfico 3: Line/Area Chart (Costos)
    charts[2] = new Chart(document.getElementById('previewChart3'), {
        type: 'line',
        data: {
            labels: dataComparacion.labels,
            datasets: [
                {
                    label: 'Carga Doméstica (~$950/kWh)',
                    data: dataComparacion.costoDomestico,
                    backgroundColor: 'rgba(5, 150, 105, 0.4)',
                    borderColor: primaryColor,
                    tension: 0.3,
                    fill: true,
                },
                {
                    label: 'Carga Pública (~$1.263/kWh)',
                    data: dataComparacion.costoPublico,
                    backgroundColor: 'rgba(52, 211, 153, 0.4)',
                    borderColor: secondaryColor,
                    tension: 0.3,
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Costo (COP)' },
                    ticks: { callback: (value) => value.toLocaleString() }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`
                    }
                }
            }
        }
    });

    // Gráfico 4: Bar Chart (Consumo)
    charts[3] = new Chart(document.getElementById('previewChart4'), {
        type: 'bar',
        data: {
            labels: dataComparacion.labels,
            datasets: [{
                label: 'Consumo (kWh/100 km)',
                data: dataComparacion.consumo,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Consumo (kWh)' }
                },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw} kWh/100 km`
                    }
                }
            }
        }
    });

    // Navegación entre gráficos
    const navButtons = document.querySelectorAll('.chart-nav-btn');
    const chartContainers = document.querySelectorAll('.chart-container');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const chartIndex = this.getAttribute('data-chart');

            // Actualizar botones activos
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'white';
                btn.style.color = 'var(--accent)';
            });
            this.classList.add('active');
            this.style.background = 'var(--accent)';
            this.style.color = 'white';

            // Mostrar/ocultar contenedores de gráficos
            chartContainers.forEach(container => {
                if (container.getAttribute('data-chart-id') === chartIndex) {
                    container.style.display = 'block';
                    // Actualizar el gráfico para que se renderice correctamente
                    charts[chartIndex].update();
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });

    // Efecto hover en botones
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(16, 185, 129, 0.1)';
            }
        });
        button.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.background = 'white';
            }
        });
    });
});
