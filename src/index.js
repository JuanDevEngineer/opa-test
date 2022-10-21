let inputCaloria = document.getElementById('caloria');
let inputPeso = document.getElementById('peso');
let textoCaloria = document.getElementById('texto-caloria');
let textoPeso = document.getElementById('texto-peso');
let noInformacionResult = document.getElementById('no-informacion');

window.document.addEventListener('DOMContentLoaded', function () {
  mostrarElementos();
  noInformacionResult.style.display = 'block';
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

async function determinarElementosViables(caloriaMinima, pesoMaximo) {
  if (
    caloriaMinima == 0 ||
    isNaN(caloriaMinima) ||
    pesoMaximo == 0 ||
    isNaN(pesoMaximo)
  ) {
    alert('Los campos son obligatorios');
    return;
  }
  let elementosViables = [];
  let sumaCaloria = 0,
    sumaPeso = 0;
  const elementos = await obtenerInfoJson();

  for (let i = 0; i < elementos.length; i++) {
    let auxPeso = sumaPeso;
    let auxCaloria = sumaCaloria;

    sumaPeso += elementos[i].peso;

    if (sumaPeso <= pesoMaximo || sumaCaloria >= caloriaMinima) {
      elementosViables.push(elementos[i]);
      continue;
    } else {
      sumaPeso = auxPeso;
      sumaCaloria = auxCaloria;
    }

    sumaCaloria += elementos[i].calorias;
  }

  noInformacionResult.style.display = 'none';
  cargarInformacion(elementosViables, 'lista-elementos-viables');
}

async function mostrarElementos() {
  const elementos = await obtenerInfoJson();
  cargarInformacion(elementos, 'lista-elementos');
}

async function obtenerInfoJson() {
  const respuesta = await fetch('http://localhost:5000/elementos');
  const data = await respuesta.json();
  return data;
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

function cargarInformacion(array = [], input) {
  let lista = document.getElementById(input);
  if (array.length == 0) {
    noInformacionResult.style.display = 'block';
    lista.innerHTML = `<li>No hay información</li>`;
    return;
  } else {
    for (const key in array) {
      lista.innerHTML += `<li>
        ${array[key].elemento}
        <span>caloria: ${array[key].calorias}</span>
        <span>peso: ${array[key].peso}</span>
      </li>`;
    }
  }
}
