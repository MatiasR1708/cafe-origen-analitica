# Rendimiento del motor v0.2

## Medición de operaciones (10.000 ventas)

| Función | Qué hace | Tiempo | Espacio | Evidencia |
|---|---|---:|---:|---|
| valorVenta | Multiplica cantidad por precio | O(1) | O(1) | Una multiplicación |
| totalVendido / totalVendidoM | Suma valores | O(n) | O(1) | 10.000 visitas |
| unidadesVendidas / unidadesVendidasM | Suma unidades | O(n) | O(1) | Un recorrido |
| ventaMayor | Busca máximo | O(n) | O(1) | 9.999 comparaciones |
| ticketPromedio | Suma y cuenta ventas válidas | O(n) | O(1) | Un recorrido |
| ventasPorCiudad / ventasPorCiudadM | Suma una ciudad normalizada | O(n) | O(1) | Un recorrido; la versión M crea un resultado temporal del filtro |
| ventasDelDia | Filtra un día y calcula su resumen | O(n) | O(n) | El filtro crea el arreglo de ese día |
| totalPorCiudad | Agrupa valores | O(n) | O(c), c ciudades | 10.000 visitas, cuatro grupos |
| unidadesPorProducto | Agrupa unidades | O(n) | O(p), p productos | Un acumulador por producto |
| topProductosPorValor | Acumula y ordena productos | O(n + p log p) | O(p) | Objeto y arreglo de productos |
| primeraVenta | Accede al primer registro | O(1) | O(1) | 1 acceso |
| clientesRecurrentes | Compara pares e incluye búsqueda en resultados | O(n²) base; O(n³) peor caso con `includes` | O(n) | 4.000 datos aleatorios: 61.985 ms |
| totalCiudadCadena | Normaliza, filtra, calcula y suma | O(n) | O(n) | Cuatro recorridos y tres arreglos intermedios |
| totalCiudadUnaPasada | Suma ciudad en un recorrido | O(n) | O(1) | Un recorrido y sin arreglos intermedios |

Las operaciones de las funciones lineales se multiplican aproximadamente por 10 cuando n pasa de 100 a 1.000, luego a 10.000 y 100.000. `primeraVenta` permanece en una operación. La comparación con 10.000 ventas dio el mismo total para ambas versiones de ciudad.

## Tiempos de clientes recurrentes

| n | Tiempo observado |
|---:|---:|
| 1.000 | 4.561 ms |
| 2.000 | 16.204 ms |
| 4.000 | 61.985 ms |
| 8.000 | 280.143 ms |
| 16.000 | 1.116 s |

Las medidas varían por el azar del generador y el equipo. Para proyección, usando el último punto: 100.000 ventas ≈ 1.116 × (100.000/16.000)^2 = 43.6 s; 1.000.000 ≈ 1.116 × (1.000.000/16.000)^2 = 4.36 h. La segunda cifra es una extrapolación aproximada, no una medición.

## Riesgos

1. `clientesRecurrentes`: mayor riesgo; compara pares y `includes` recorre los clientes recurrentes encontrados. En el peor caso, esa búsqueda añade otro factor proporcional a n.
2. `totalCiudadCadena`: tiempo lineal, pero crea tres arreglos proporcionales al tamaño de entrada.
3. Agrupaciones como `totalPorCiudad`, `unidadesPorProducto` y `topProductosPorValor`: tiempo lineal esperado y memoria proporcional a la cantidad de grupos/productos.
4. Los recorridos simples y `totalCiudadUnaPasada`: tiempo lineal y memoria adicional constante.
5. `primeraVenta`: tiempo y memoria constantes.

## Plan de optimización

`clientesRecurrentes` repite búsquedas de cliente y vuelve a comparar pares. Se puede guardar el número de compras por cliente en un objeto diccionario durante un solo recorrido y luego seleccionar los clientes con más de una compra. Esto reduce el trabajo esperado a O(n), con memoria O(cantidad de clientes). La mejora queda como propuesta y no está implementada.

## Decisión para el total por ciudad

La cadena es legible y expresa cada transformación por separado, pero recorre los datos varias veces y conserva arreglos temporales. Se deja `totalCiudadUnaPasada` como opción del motor cuando importa reducir memoria; ambas son O(n) en tiempo porque las constantes (cuatro recorridos frente a uno) se omiten en Big O.
