const analitica = require("./analitica");
const { generarVentas } = require("./generador");

const tamaños = [100, 1000, 10000, 100000];
const resultados = [];
for (const n of tamaños) {
  const ventas = generarVentas(n);
  const total = { ops: 0 };
  const mayor = { ops: 0 };
  const ciudad = { ops: 0 };
  const constante = { ops: 0 };
  analitica.totalVendidoInstrumentada(ventas, total);
  analitica.ventaMayorInstrumentada(ventas, mayor);
  analitica.totalPorCiudadInstrumentada(ventas, ciudad);
  analitica.primeraVentaInstrumentada(ventas, constante);
  resultados.push({ n, totalVendido: total.ops, ventaMayor: mayor.ops, totalPorCiudad: ciudad.ops, primeraVenta: constante.ops });
}
console.table(resultados);

const datosDia1 = require("./datos");
console.log("Clientes recurrentes (datos Día 1):", analitica.clientesRecurrentes(datosDia1));

const cinco = datosDia1.slice(0, 5);
const ventasDiezMil = generarVentas(10000);
console.log("Comparación ciudad con 10.000 ventas:", analitica.totalCiudadCadena(ventasDiezMil, "Medellín"), analitica.totalCiudadUnaPasada(ventasDiezMil, "Medellín"));

const tamañosTiempo = [1000, 2000, 4000, 8000, 16000];
for (const n of tamañosTiempo) {
  const ventas = generarVentas(n);
  console.time(`clientesRecurrentes n=${n}`);
  analitica.clientesRecurrentes(ventas);
  console.timeEnd(`clientesRecurrentes n=${n}`);
}
