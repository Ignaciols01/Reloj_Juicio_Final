'use strict';

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.locale('es');

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13() {

}

function calcularEdad() {

}

function mostrarEdad() {

}

function procesarFormularioEdad() {

}

function iniciarEdad() {

}

// ==================================================
// PUNTO 2: CUENTA ATRÁS
// ==================================================

function descomponerDuracion() {

}

function actualizarCuentaAtras() {

}

function iniciarCuentaAtras() {

}

// ==================================================
// PUNTO 3: ZONAS HORARIAS
// ==================================================

function actualizarZonasHorarias() {

}

// ==================================================
// INICIO Y ACTUALIZACIÓN COMÚN
// ==================================================

function actualizarRelojes() {
  actualizarCuentaAtras();
  actualizarZonasHorarias();
}

iniciarEdad();
iniciarCuentaAtras();

// Ejecutamos la función nada más empezar y creamos un intervalo
actualizarRelojes();
// Un intervalo permite ejecutar una función cada x segundos (1000ms == 1seg)
setInterval(actualizarRelojes, 1000);

