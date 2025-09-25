// Array de tipos de entradas con precios
const tiposEntradas = [
  { tipo: "Popular", precio: 3000 },
  { tipo: "Platea", precio: 5000 },
  { tipo: "Palco", precio: 10000 }
];

// Variable global para el total
let total = 0;

// Función para elegir el tipo de entrada
function elegirTipoEntrada() {
  let mensaje = "Elegí el tipo de entrada:\n";
  tiposEntradas.forEach((entrada, index) => {
    mensaje += `${index + 1}. ${entrada.tipo} - $${entrada.precio}\n`;
  });

  let opcion = parseInt(prompt(mensaje));

  if (isNaN(opcion) || opcion < 1 || opcion > tiposEntradas.length) {
    
    return elegirTipoEntrada();
  }

  return tiposEntradas[opcion - 1];
}

// Función para pedir la cantidad
function pedirEntradas() {
  let cantidad = parseInt(prompt("¿Cuántas entradas querés comprar?"));

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("⚠️ Tenés que ingresar un número válido mayor a 0.");
    return pedirEntradas();
  }

  return cantidad;
}

// Función para calcular el total
function calcularTotal(cantidad, precioUnitario) {
  return cantidad * precioUnitario;
}

// Función principal del simulador
function iniciarSimulador() {
  alert("🎟 Bienvenido al simulador de compra de entradas");

  let tipoElegido = elegirTipoEntrada();
  let cantidad = pedirEntradas();

  total = calcularTotal(cantidad, tipoElegido.precio);

  let confirmar = confirm(
    `Vas a comprar ${cantidad} entradas tipo ${tipoElegido.tipo}.\n` +
    `Precio unitario: $${tipoElegido.precio}\n` +
    `Total a pagar: $${total}\n\n` +
    "¿Confirmás la compra?"
  );

  if (confirmar) {
    alert("✅ ¡Compra realizada con éxito!");
    console.log(`El usuario compró ${cantidad} entradas tipo ${tipoElegido.tipo} por un total de $${total}.`);
  } else {
    alert("❌ Compra cancelada.");
    console.log("El usuario canceló la compra.");
  }
}

// Ejecutar el simulador al cargar la página
iniciarSimulador();
