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
let destinoAnoNuevo;
let eventoAlcanzado = false;

function iniciarCuentaAtras() {
  const ahora = dayjs();
  const proximoAno = ahora.year() + 1;
  // Fijamos la fecha de destino al 1 de enero del año que viene a las 00:00:00
  destinoAnoNuevo = dayjs(`${proximoAno}-01-01T00:00:00`);
  
  document.getElementById('fecha-evento').textContent = `Destino: ${destinoAnoNuevo.format('D [de] MMMM [de] YYYY, HH:mm')}`;
}

function descomponerDuracion(milisegundos) {
  const duracion = dayjs.duration(milisegundos);
  return {
    // asDays() devuelve días totales, usamos Math.floor para quitar decimales
    dias: Math.floor(duracion.asDays()), 
    horas: duracion.hours(),
    minutos: duracion.minutes(),
    segundos: duracion.seconds()
  };
}

function actualizarCuentaAtras() {
  if (eventoAlcanzado) return;

  const ahora = dayjs();
  const diferenciaMs = destinoAnoNuevo.diff(ahora);

  const estadoEvento = document.getElementById('estado-evento');
  const contadorP = document.getElementById('contador');

  if (diferenciaMs <= 0) {
    eventoAlcanzado = true;
    contadorP.textContent = '0 días, 0 horas, 0 minutos y 0 segundos';
    estadoEvento.textContent = '¡El evento ha llegado!';
    return;
  }

  const { dias, horas, minutos, segundos } = descomponerDuracion(diferenciaMs);
  contadorP.textContent = `Faltan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos para Año Nuevo`;
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

