const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puerta = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultadosDiv = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

//Objeto para guardar los valores seleccionados
const campos = {
  marcas: "",
  years: "",
  minimos: "",
  maximos: "",
  puertas: "",
  transmisiones: "",
  colores: "",
};

document.addEventListener("DOMContentLoaded", () => {
  showResults(autos);
  optionAño();
});

marca.addEventListener("change", (e) => {
  campos.marcas = e.target.value;
  fitrarResultado();
});
year.addEventListener("change", (e) => {
  campos.years = parseInt(e.target.value);
  fitrarResultado();
});
minimo.addEventListener("change", (e) => {
  campos.minimos = e.target.value;
  fitrarResultado();
});
maximo.addEventListener("change", (e) => {
  campos.maximos = e.target.value;
  fitrarResultado();
});
puerta.addEventListener("change", (e) => {
  campos.puertas = e.target.value;
  fitrarResultado();
});
transmision.addEventListener("change", (e) => {
  campos.transmisiones = e.target.value;
  fitrarResultado();
});
color.addEventListener("change", (e) => {
  campos.colores = e.target.value;
  fitrarResultado();
});

//Esta funcion tiene que tener como paramentro el objeto autos que se usa para mostrar los resultados
function showResults(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    //Destructuring the object
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const resultado = document.createElement("P");
    resultado.textContent = `${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision}`;
    resultadosDiv.appendChild(resultado);
  });
}

function optionAño() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.textContent = i;
    opcion.value = i;
    year.appendChild(opcion);
  }
}

//funcion para filtrar por marcas
//Usar filter y hacer una HOF
//Se pueden encadenar varias funciones para filtrar diferentes elementos
function fitrarResultado() {
  const resultadoMarcas = autos
    .filter(filterMarcas)
    .filter(filterYear)
    .filter(filterMinimo)
    .filter(filterMaximo)
    .filter(filterPuertas)
    .filter(filterTransmision)
    .filter(filterColor);
  //showResults se tiene que mandar llamar hasta que se seleccione una opcion
  //Se le tiene que pasar como argumento el resultado de filter
  if (resultadoMarcas.length == 0) {
    noResultados();
  } else {
    showResults(resultadoMarcas);
  }
}

function noResultados() {
  limpiarHTML();
  const noResultados = document.createElement("DIV");
  noResultados.classList.add("alerta", "error");
  noResultados.textContent = "No hay resultados, por favor intenta de nuevo";
  resultadosDiv.appendChild(noResultados);
}
//funcion que se tomara como parametro en el filter
function filterMarcas(carro) {
  //console.log(carro);
  if (campos.marcas) {
    return carro.marca === campos.marcas;
  }
  return carro;
}
function filterYear(carro) {
  if (campos.years) {
    return carro.year === campos.years;
  }
  return carro;
}
function filterMinimo(carro) {
  if (campos.minimos) {
    return carro.precio >= campos.minimos;
  }
  return carro;
}
function filterMaximo(carro) {
  if (campos.maximos) {
    return carro.precio <= campos.maximos;
  }
  return carro;
}
function filterPuertas(carro) {
  if (campos.puertas) {
    return carro.puertas === parseInt(campos.puertas);
  }
  return carro;
}
function filterTransmision(carro) {
  if (campos.transmisiones) {
    return carro.transmision === campos.transmisiones;
  }
  return carro;
}
function filterColor(carro) {
  if (campos.colores) {
    return carro.color === campos.colores;
  }
  return carro;
}
function limpiarHTML() {
  while (resultadosDiv.firstChild) {
    resultadosDiv.removeChild(resultadosDiv.firstChild);
  }
}
