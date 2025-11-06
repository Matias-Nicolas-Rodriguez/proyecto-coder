// --- Cargar precios desde JSON ---
let tiposEntradas = [];

fetch("./js/entradas.json")
  .then((res) => res.json())
  .then((data) => {
    tiposEntradas = data;
    iniciarSimulador();
  })
  .catch(() => {
    console.error("Error al cargar precios de entradas.");
  });

// --- Función principal ---
function iniciarSimulador() {
  const selectTipo = document.getElementById("tipoEntrada");
  const inputCantidad = document.getElementById("cantidad");
  const btnCalcular = document.getElementById("btnCalcular");
  const resultadoDiv = document.getElementById("resultado");

  // Cargar última compra guardada
  mostrarUltimaCompra(resultadoDiv);

  btnCalcular.addEventListener("click", () => {
    const tipoSeleccionado = selectTipo.value;
    const cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad) || cantidad <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cantidad inválida",
        text: "Ingresá una cantidad válida de entradas."
      });
      return;
    }

    const entrada = tiposEntradas.find((e) => e.tipo === tipoSeleccionado);
    const total = entrada.precio * cantidad;

    // Mostrar resultado
    resultadoDiv.innerHTML = `
      <p>🎟 Compraste <strong>${cantidad}</strong> entradas tipo <strong>${entrada.tipo}</strong>.</p>
      <p>Precio unitario: $${entrada.precio}</p>
      <p><strong>Total a pagar: $${total}</strong></p>
      <button id="btnGuardar" class="btn btn-success mt-3">Guardar compra</button>
      <button id="btnVaciar" class="btn btn-secondary mt-3 ms-2">Vaciar compras</button>
    `;

    // Botón guardar compra
    document.getElementById("btnGuardar").addEventListener("click", () => {
      guardarCompra(entrada.tipo, cantidad, total);
      Swal.fire({
        icon: "success",
        title: "Compra guardada",
        text: `Se registró tu compra de ${cantidad} entradas tipo ${entrada.tipo}.`
      });
    });

    // Botón vaciar compras
    document.getElementById("btnVaciar").addEventListener("click", () => {
      localStorage.removeItem("compras");
      resultadoDiv.innerHTML = "";
      Swal.fire({
        icon: "info",
        title: "Carrito vaciado",
        text: "Se eliminaron todas las compras guardadas."
      });
    });
  });
}

// --- Guardar compra en localStorage ---
function guardarCompra(tipo, cantidad, total) {
  const compra = { tipo, cantidad, total };
  const compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.push(compra);
  localStorage.setItem("compras", JSON.stringify(compras));
}

// --- Mostrar última compra ---
function mostrarUltimaCompra(resultadoDiv) {
  const compras = JSON.parse(localStorage.getItem("compras"));
  if (compras && compras.length > 0) {
    const ultima = compras[compras.length - 1];
    resultadoDiv.innerHTML = `
      <p>🕓 Última compra: ${ultima.cantidad} entradas tipo ${ultima.tipo} por $${ultima.total}</p>
    `;
  }
}
