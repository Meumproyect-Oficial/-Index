// 1. Declaración de Variables Globales
let deferredPrompt;
const btnInstalar = document.getElementById('Btn-Instalar-Pantalla');
const btnGuardar = document.getElementById('Btn-Guardar-Tarjetero');

// 2. Registro del Service Worker
if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js')
 .then((reg) => console.log('Service Worker registrado con éxito.', reg.scope))
 .catch((err) => console.error('Error al registrar el Service Worker:', err));
 });
}

// 3. Captura del Evento Nativo de Instalación
window.addEventListener('beforeinstallprompt', (e) => {
 e.preventDefault();
 deferredPrompt = e;
 if (btnInstalar) {
 btnInstalar.style.cursor = 'pointer';
 }
});

// 4. Lógica del Botón: Instalar en Pantalla
if (btnInstalar) {
 btnInstalar.addEventListener('click', (e) => {
 e.preventDefault();
 
 if (deferredPrompt) {
 deferredPrompt.prompt();
 deferredPrompt.userChoice.then((choiceResult) => {
 if (choiceResult.outcome === 'accepted') {
 console.log('El usuario aceptó instalar MeumProyect.');
 } else {
 console.log('El usuario rechazó la instalación.');
 }
 deferredPrompt = null;
 });
 } else {
 alert('La tarjeta digital ya está instalada o tu entorno no cumple con los requisitos para crear el acceso directo.');
 }
 });
}

// 5. Lógica del Botón: Guardar en Tarjetero (Función Pendiente)
if (btnGuardar) {
 btnGuardar.addEventListener('click', (e) => {
 e.preventDefault();
 alert('La aplicación del tarjetero digital estará disponible próximamente.');
 });
}

// 6. Escucha de Confirmación de Instalación
window.addEventListener('appinstalled', () => {
 console.log('MeumProyect fue instalada con éxito en el dispositivo.');
 deferredPrompt = null;
});