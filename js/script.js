
function cambio_mapa() {
    const texto = document.getElementById("texto_info_extra")
    const img = document.getElementById("gas")
    const mapa = document.getElementById("mapa_med")
    const div_info = document.getElementById("info_extra")

    if (mapa) {
        mapa.addEventListener("mouseover", () => {
            if (texto) texto.style.display = "none"
            if (img) img.style.display = "none"
            if (div_info) {
                div_info.style.border = "none"
                div_info.style.boxShadow = "none"
            }
        });

        mapa.addEventListener("mouseout", () => {
            if (texto) texto.style.display = "block"
            if (img) img.style.display = "block"
            if (div_info) {
                div_info.style.border = "solid 2px #059669"
                div_info.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)"
            }
        })
    }
}

function redirigir_inicio() {
    setTimeout(() => {
        window.location.href = "index.html";
    }, 5000);
}

// ============================================
// VALIDACIÓN: Formulario de Bicicletas/Micromovilidad
// ============================================
function envio_formulario_bicicleta(evento) {
    evento.preventDefault();

    const form = document.getElementById("formulario");

    if (form && form.checkValidity()) {
        // Mostrar confetti si está disponible
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        alert('¡Bienvenido a nuestra comunidad! Juntos ayudamos al mundo 🌱');
        form.reset();
    } else {
        alert('Por favor completa todos los campos requeridos.');
    }
}

// ============================================
// VALIDACIÓN: Formulario de Información
// ============================================
function validar_formulario_informacion(evento) {
    evento.preventDefault();

    const form = evento.target;

    if (form.checkValidity()) {
        alert('¡Información enviada con éxito! Gracias por registrarte en Portal Electrolineras.');
        // Redirigir a MovilidadElectrica.html
        window.location.href = 'MovilidadElectrica.html';
    } else {
        alert('Por favor completa todos los campos requeridos.');
    }
}

// ============================================
// VALIDACIÓN: Cuestionario de Movilidad Eléctrica
// ============================================
function validar_cuestionario(evento) {
    evento.preventDefault();

    const form = evento.target;

    if (form.checkValidity()) {
        alert('¡Gracias por compartir tu experiencia! Tu feedback es muy valioso para mejorar la movilidad eléctrica en Antioquia.');
        form.reset();
    } else {
        alert('Por favor completa todos los campos requeridos antes de enviar.');
    }
}

function preguntar_moto() {
    const moto = document.getElementById("moto")
    const pregunta = document.getElementById("preguntar_moto")

    if (!moto || !pregunta) return;

    if (window.matchMedia("(max-width: 600px)").matches) {
        pregunta.style.display = "flex";
        return;
    }

    moto.addEventListener("mouseover", () => {
        pregunta.style.display = "flex"
    })
    moto.addEventListener("mouseleave", () => {
        pregunta.style.display = "none"
    })
}

// ============================================
// INICIALIZACIÓN AUTOMÁTICA DE VALIDACIONES
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    // Funciones de UI
    cambio_mapa();
    preguntar_moto();

    // Auto-detectar y asignar validaciones a formularios
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Detectar tipo de formulario por ID o atributos
        const formId = form.id;
        const formAction = form.getAttribute('action');

        // Formulario de información (redirige a MovilidadElectrica.html)
        if (formAction && formAction.includes('MovilidadElectrica.html')) {
            form.addEventListener('submit', validar_formulario_informacion);
        }
        // Formulario de bicicletas/micromovilidad
        else if (formId === 'formulario' && document.getElementById('nombre') && document.getElementById('email')) {
            // Ya tiene el onclick en el botón, no necesita listener adicional
        }
        // Cuestionario (tiene múltiples selects)
        else if (document.getElementById('tipo_vehiculo') || document.getElementById('experiencia')) {
            form.addEventListener('submit', validar_cuestionario);
        }
    });
});