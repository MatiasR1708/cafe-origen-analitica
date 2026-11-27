const catalogo = [
  { producto: "Origen Huila 500 g", precio: 42000 },
  { producto: "Origen Nariño 250 g", precio: 26000 },
  { producto: "Origen Sierra 500 g", precio: 45000 },
  { producto: "Prensa francesa", precio: 95000 },
  { producto: "Molino manual", precio: 120000 },
];
const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

function enteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarVentas(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n debe ser un entero mayor o igual a cero");
  }

  const ventas = [];
  const maxCliente = Math.max(1, Math.floor(n / 3));
  for (let i = 1; i <= n; i += 1) {
    const item = catalogo[enteroAleatorio(0, catalogo.length - 1)];
    const ciudad = ciudades[enteroAleatorio(0, ciudades.length - 1)];
    const cliente = enteroAleatorio(1, maxCliente);
    const dia = String(enteroAleatorio(1, 30)).padStart(2, "0");

    ventas.push({
      id: i,
      fecha: `2026-09-${dia}`,
      cliente: `C${String(cliente).padStart(2, "0")}`,
      producto: item.producto,
      ciudad,
      cantidad: enteroAleatorio(1, 5),
      precio: item.precio,
    });
  }
  return ventas;
}

module.exports = { generarVentas };
