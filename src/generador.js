const catalogo = [
    {producto:"Origen Huila 500g", precio: 42000},
    {producto:"Origen Nariño 250g", precio: 26000},
    {producto:"Origen Sierra 500g", precio:45000},
    {producto:"Prensa francesa", precio: 95000},
    {producto:"Molino manual", precio: 120000}
];

const ciudades =[ "Medellin", "Cali", "Pereira", "Bogota"]

function azarEnter (min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function generarVentas(n){
    const ventas = [];
    const maxCliente = Math.max(1, Math.floor(n/3));
    for (i=1; i<=n; i++){
        const item = CATALOGO [azarEntre(0, CATALOGO.length - 1)];
        const ciudad = CIUDADES [azarEntre(0, ciudades.length)]
        const numClientes = azarEntre (1, maxCliente);
        const dia = String (azarEntre(1, 30)) .padStart(2, "0");
        const mes = String (azarEntre(9, 12)) .padStart(2, "0");

        ventas.push({
            id: i,
            fecha: `2026-${mes}-${dia}`,
            cliente: `Ç${String(numClientes).padStart (2, "0")}`,
            producto: item.producto,
            cuidad: ciudad,
            cantidad: azarEntre(1,5),
            precio: item.precio
        });
    }
    return ventas;
}

module.exports = {generarVentas }