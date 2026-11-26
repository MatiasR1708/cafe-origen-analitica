const ventas = require("./datos");
const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM,
} = require("./analitica");

function comparar(nombre, resultadoCiclo, resultadoMetodo) {
  const iguales = resultadoCiclo === resultadoMetodo;
  console.log(`${iguales ? "OK" : "DIFERENTE"} ${nombre}: ciclo=${resultadoCiclo}, método=${resultadoMetodo}`);
}

comparar("totalVendido", totalVendido(ventas), totalVendidoM(ventas));
comparar("unidadesVendidas", unidadesVendidas(ventas), unidadesVendidasM(ventas));
comparar(
  "ventasPorCiudad (Medellín con minúscula y espacio)",
  ventasPorCiudad(ventas, "medellín "),
  ventasPorCiudadM(ventas, "medellín "),
);
