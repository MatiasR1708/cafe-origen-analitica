const ventas = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica");

const pesos = (valor) => valor.toLocaleString("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

console.log("\nCAFÉ ORIGEN | REPORTE DE VENTAS\n");

console.log("1. RESUMEN GENERAL");
const mayor = ventaMayor(ventas);
console.table([
  { Indicador: "Ventas registradas", Resultado: ventas.length },
  { Indicador: "Total vendido", Resultado: pesos(totalVendido(ventas)) },
  { Indicador: "Unidades vendidas", Resultado: unidadesVendidas(ventas) },
  { Indicador: "Ticket promedio por compra válida", Resultado: pesos(ticketPromedio(ventas)) },
  { Indicador: "Venta de mayor valor", Resultado: mayor ? `${pesos(mayor.cantidad * mayor.precio)} (registro #${mayor.id})` : "Sin ventas" },
]);

console.log("2. VENTAS POR CIUDAD");
const ciudades = Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
  Ciudad: ciudad,
  "Total vendido": pesos(total),
}));
console.table(ciudades);

console.log("3. UNIDADES POR PRODUCTO");
const productos = Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
  Producto: producto,
  Unidades: unidades,
}));
console.table(productos);

console.log("4. TOP 3 PRODUCTOS POR VALOR");
console.table(topProductosPorValor(ventas, 3).map(({ producto, valor }, indice) => ({
  Puesto: indice + 1,
  Producto: producto,
  "Valor generado": pesos(valor),
})));

console.log("5. RESUMEN POR DÍA");
for (const fecha of ["2026-09-01", "2026-09-07"]) {
  const resumen = ventasDelDia(ventas, fecha);
  console.log(`${fecha}: ${resumen.cantidadVentas} ventas, ${resumen.unidadesVendidas} unidades, total ${pesos(resumen.totalVendido)}, ticket promedio ${pesos(resumen.ticketPromedio)}.`);
}
