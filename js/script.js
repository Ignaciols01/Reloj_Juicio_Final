'use strict';

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.locale('es');

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13(fechaInicio, fechaFin) {
  let contador = 0;
  // Nos situamos en el día 13 del mes y año de nacimiento
  let actual = fechaInicio.date(13); 
  
  // Si ese día 13 ya pasó antes de nacer, saltamos al mes siguiente
  if (actual.isBefore(fechaInicio, 'day')) {
    actual = actual.add(1, 'month');
  }

  // Bucle comprobando mes a mes si el día 13 es viernes (día 5 en dayjs)
  while (actual.isBefore(fechaFin) || actual.isSame(fechaFin, 'day')) {
    if (actual.day() === 5) { 
      contador++;
    }
    actual = actual.add(1, 'month');
  }
  return contador;
}

function calcularEdad(fechaNacimiento) {
  const ahora = dayjs();
  
  // Diferencias totales e independientes usando .diff()
  const dias = ahora.diff(fechaNacimiento, 'day');
  const horas = ahora.diff(fechaNacimiento, 'hour');
  const segundos = ahora.diff(fechaNacimiento, 'second');
  
  // Formatear el día de la semana (ej: "lunes")
  const diaSemana = fechaNacimiento.format('dddd');
  const numViernes = contarViernes13(fechaNacimiento, ahora);
  
  return { dias, horas, segundos, diaSemana, numViernes };
}

function mostrarEdad(datos, instante) {
  // toLocaleString() formatea los números grandes con puntos (ej: 1.000.000)
  document.getElementById('dias-edad').textContent = datos.dias.toLocaleString('es-ES');
  document.getElementById('horas-edad').textContent = datos.horas.toLocaleString('es-ES');
  document.getElementById('segundos-edad').textContent = datos.segundos.toLocaleString('es-ES');
  document.getElementById('dia-semana').textContent = datos.diaSemana;
  document.getElementById('viernes').textContent = datos.numViernes;
  document.getElementById('instante-calculo').textContent = `Calculado el: ${instante.format('DD/MM/YYYY HH:mm:ss')}`;
  
  document.getElementById('resultado-edad').hidden = false;
  document.getElementById('error-edad').textContent = '';
  document.getElementById('nacimiento').setAttribute('aria-invalid', 'false');
}

function mostrarError(input, errorElement, resultElement, mensaje) {
  errorElement.textContent = mensaje;
  input.setAttribute('aria-invalid', 'true');
  resultElement.hidden = true;
}

function procesarFormularioEdad(evento) {
  evento.preventDefault();
  const inputNacimiento = document.getElementById('nacimiento');
  const errorP = document.getElementById('error-edad');
  const resultadoDiv = document.getElementById('resultado-edad');
  
  const valor = inputNacimiento.value;
  if (!valor) {
    mostrarError(inputNacimiento, errorP, resultadoDiv, 'Por favor, introduce una fecha válida.');
    return;
  }

  // Forzamos las 00:00 del día en la hora local actual
  const fechaNacimiento = dayjs(valor).startOf('day'); 
  const ahora = dayjs();

  if (!fechaNacimiento.isValid() || fechaNacimiento.isAfter(ahora)) {
    mostrarError(inputNacimiento, errorP, resultadoDiv, 'La fecha no puede ser en el futuro.');
    return;
  }

  const datos = calcularEdad(fechaNacimiento);
  mostrarEdad(datos, ahora);
}

function iniciarEdad() {
  document.getElementById('form-edad').addEventListener('submit', procesarFormularioEdad);
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

