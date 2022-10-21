let inputCaloria = document.getElementById('caloria');
let inputPeso = document.getElementById('peso');
let textoCaloria = document.getElementById('texto-caloria');
let textoPeso = document.getElementById('texto-peso');

window.document.addEventListener('DOMContentLoaded', function () {
  mostrarElementos();
});

document
  .getElementById('formulario')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    await determinarElementosViables(
      parseInt(inputCaloria.value),
      parseInt(inputPeso.value),
    );
  });

async function determinarElementosViables(caloriaMinima = 0, pesoMaximo = 0) {
  let elementosViables = [];
  let sumaCaloria = 0,
    sumaPeso = 0;
  let elementos = await obtenerInfoJson();
}

async function mostrarElementos() {
  const elementos = await obtenerInfoJson();
  console.log(elementos);
  cargarInformacion(elementos);
}

async function obtenerInfoJson() {
  const respuesta = await fetch('http://localhost:5500/src/data/data.json');
  const data = await respuesta.json();
  return data.elementos;
}

function cambiarValor(e) {
  if (e.name == 'caloria') {
    textoCaloria.innerText = 0;

    textoCaloria.innerText =
      parseInt(e.value) == 0 || e.value == '' ? 0 : parseInt(e.value);
  } else {
    textoPeso.innerText = 0;
    textoPeso.innerText =
      parseInt(e.value) == 0 || e.value == '' ? 0 : parseInt(e.value);
  }
}

function cargarInformacion(array = []) {
  let lista = document.getElementById('lista-elementos');
  for (const key in array) {
    lista.innerHTML += `<li>
      ${array[key].elemento}
      <span>caloria: ${array[key].calorias}</span>
      <span>peso: ${array[key].peso}</span>
    </li>`;
  }
}
