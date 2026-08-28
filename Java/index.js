function actualizarFechas() {
 // 01 Búsqueda directa por ID para la Fecha actual del sistema (MoodyCase)
 const contenedorCurrent = document.getElementById("Current-Date");
 if (contenedorCurrent) {
 const fechaActual = new Date();
 const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 let textoActual = fechaActual.toLocaleDateString('es-ES', opciones);
 contenedorCurrent.innerHTML = `Fecha actual: ${textoActual.charAt(0).toUpperCase() + textoActual.slice(1)}`;
 }

 // 02 Búsqueda directa por ID para la Fecha de actualización automática (MoodyCase)
 const contenedorUpdate = document.getElementById("Update-Date");
 if (contenedorUpdate) {
 const fechaMod = new Date(document.lastModified);
 const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 let textoMod = fechaMod.toLocaleDateString('es-ES', opciones);
 contenedorUpdate.innerHTML = `Fecha de actualización: ${textoMod.charAt(0).toUpperCase() + textoMod.slice(1)}`;
 }
}

document.addEventListener('DOMContentLoaded', () => {
 actualizarFechas();

 // 03 Lógica de Tooltips Dinámicos en la Raíz (Body)
 const wrappersTooltip = document.querySelectorAll('.CustomTooltipWrapper');
 
 wrappersTooltip.forEach(wrapper => {
 const textoTooltip = wrapper.getAttribute('data-tooltip');
 if (!textoTooltip) return;

 wrapper.addEventListener('mouseenter', () => {
 const tooltipEl = document.createElement('div');
 tooltipEl.className = 'DynamicTooltipElement';
 tooltipEl.textContent = textoTooltip;
 document.body.appendChild(tooltipEl);

 const rect = wrapper.getBoundingClientRect();
 tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
 tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 8}px`;

 wrapper._tooltipElement = tooltipEl;
 });

 wrapper.addEventListener('mouseleave', () => {
 if (wrapper._tooltipElement) {
 wrapper._tooltipElement.remove();
 wrapper._tooltipElement = null;
 }
 });
 });

 // 04 Lógica Pura y Directa por IDs para los Paneles Deslizantes, Footer y Pantalla Completa
 const enlacesPanel = document.querySelectorAll('.EnlacePanel');
 // 05 Selección unificada para incluir paneles laterales, de footer y pantalla completa
 const paneles = document.querySelectorAll('.SlidingPanel, .SlidingPanelFooter, .SlidingPanelFullScreen');
 const welcomeBox = document.querySelector('.WelcomeBox');

 enlacesPanel.forEach(enlace => {
 enlace.addEventListener('click', (e) => {
 e.preventDefault();
 
 // 06 Obtener el ID del destino directamente desde el atributo href (ej. "#Panel-Guia" -> "Panel-Guia")
 const idObjetivo = enlace.getAttribute('href').replace('#', '');
 const panelObjetivo = document.getElementById(idObjetivo);

 if (!panelObjetivo) return;

 // 07 Verificar si el panel objetivo ya está activo
 const estaActivo = panelObjetivo.classList.contains('active');

 // Cerrar todos los paneles primero (Exclusión mutua)
 paneles.forEach(p => p.classList.remove('active'));

 // 08 Si el panel existe y no estaba activo, activarlo usando su ID directo
 if (!estaActivo) {
 panelObjetivo.classList.add('active');
 if (welcomeBox) {
 welcomeBox.style.opacity = '0';
 welcomeBox.style.visibility = 'hidden';
 }
 } else {
 if (welcomeBox) {
 welcomeBox.style.opacity = '1';
 welcomeBox.style.visibility = 'visible';
 }
 }
 });
 });

 // 09 Lógica universal para cerrar los paneles al hacer clic en la 'X'
 const botonesCierre = document.querySelectorAll('[data-close-panel]');
 botonesCierre.forEach(boton => {
 boton.addEventListener('click', (e) => {
 e.preventDefault();
 // 10 Busca el contenedor padre ya sea de clase SlidingPanel, SlidingPanelFooter o SlidingPanelFullScreen
 const panelContenedor = boton.closest('.SlidingPanel, .SlidingPanelFooter, .SlidingPanelFullScreen');
 if (panelContenedor) {
 panelContenedor.classList.remove('active');
 }
 if (welcomeBox) {
 welcomeBox.style.opacity = '1';
 welcomeBox.style.visibility = 'visible';
 }
 });
 });
});