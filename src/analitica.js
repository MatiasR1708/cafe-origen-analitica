function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) total += valorVenta(venta);
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) unidades += venta.cantidad;
  return unidades;
}

function ventaMayor(ventas) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) mayor = venta;
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let cantidadVentasValidas = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      cantidadVentasValidas += 1;
    }
  }
  if (cantidadVentasValidas === 0) return 0;
  return total / cantidadVentasValidas;
}

function normalizar(texto) {
  return texto.trim().toLowerCase();
}

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  const ciudadBuscada = normalizar(ciudad);
  for (const venta of ventas) {
    if (normalizar(venta.ciudad) === ciudadBuscada) total += valorVenta(venta);
  }
  return total;
}

function totalVendidoM(ventas) {
  return ventas.reduce((total, venta) => total + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((total, venta) => total + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const ciudadBuscada = normalizar(ciudad);
  return ventas
    .filter((venta) => normalizar(venta.ciudad) === ciudadBuscada)
    .reduce((total, venta) => total + valorVenta(venta), 0);
}

function mostrarNombreCiudad(ciudad) {
  const normalizada = normalizar(ciudad);
  return normalizada.charAt(0).toLocaleUpperCase("es-CO") + normalizada.slice(1);
}

function totalPorCiudad(ventas) {
  return ventas.reduce((totales, venta) => {
    const ciudad = mostrarNombreCiudad(venta.ciudad);
    totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
    return totales;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((totales, venta) => {
    totales[venta.producto] = (totales[venta.producto] || 0) + venta.cantidad;
    return totales;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const valoresPorProducto = ventas.reduce((totales, venta) => {
    totales[venta.producto] = (totales[venta.producto] || 0) + valorVenta(venta);
    return totales;
  }, {});

  return [...Object.entries(valoresPorProducto)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([producto, valor]) => ({ producto, valor }));
}

function ventasDelDia(ventas, fecha) {
  const ventasDia = ventas.filter((venta) => venta.fecha === fecha);
  return {
    fecha,
    cantidadVentas: ventasDia.length,
    totalVendido: totalVendidoM(ventasDia),
    unidadesVendidas: unidadesVendidasM(ventasDia),
    ticketPromedio: ticketPromedio(ventasDia),
  };
}

function totalVendidoInstrumentada(ventas, contador) {
  let total = 0;
  for (const venta of ventas) {
    contador.ops += 1;
    total += valorVenta(venta);
  }
  return total;
}

function ventaMayorInstrumentada(ventas, contador) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (let i = 1; i < ventas.length; i += 1) {
    contador.ops += 1;
    if (valorVenta(ventas[i]) > valorVenta(mayor)) mayor = ventas[i];
  }
  return mayor;
}

function totalPorCiudadInstrumentada(ventas, contador) {
  const totales = {};
  for (const venta of ventas) {
    contador.ops += 1;
    const ciudad = mostrarNombreCiudad(venta.ciudad);
    totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
  }
  return totales;
}

function primeraVenta(ventas) {
  return ventas.length > 0 ? ventas[0] : null;
}

function primeraVentaInstrumentada(ventas, contador) {
  contador.ops += 1;
  return primeraVenta(ventas);
}

function clientesRecurrentes(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i += 1) {
    for (let j = i + 1; j < ventas.length; j += 1) {
      if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

function totalCiudadCadena(ventas, ciudad) {
  const buscada = normalizar(ciudad);
  return ventas
    .map((venta) => ({ venta, ciudad: normalizar(venta.ciudad) }))
    .filter((item) => item.ciudad === buscada)
    .map((item) => valorVenta(item.venta))
    .reduce((total, valor) => total + valor, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
  const buscada = normalizar(ciudad);
  let total = 0;
  for (const venta of ventas) {
    if (normalizar(venta.ciudad) === buscada) total += valorVenta(venta);
  }
  return total;
}

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  totalVendidoInstrumentada,
  ventaMayorInstrumentada,
  totalPorCiudadInstrumentada,
  primeraVenta,
  primeraVentaInstrumentada,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
};
