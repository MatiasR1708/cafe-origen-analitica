const ventas = require("./datos");
console.log("Registros:", ventas.length);
console.log("Primero:", ventas[0]);
console.log("Ultimo:", ventas[ventas.length -1]);
console.log("Producto del registro en la posicion 4:", ventas[3].producto);
console.table(ventas);
