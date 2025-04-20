# language: es
Característica: Visualización de productos

  Escenario: Verificar todos los productos y la página de detalle de producto
    Dado que visito la página principal
    Cuando hago clic en el botón de productos
    Entonces debería ser redirigido a la página de todos los productos
    Y debería ver la lista de productos
    Cuando hago clic en 'Ver producto' del primer producto
    Entonces debería ser redirigido a la página de detalle del producto
    Y debería ver los detalles del producto como: nombre, categoría, precio, disponibilidad, condición y marca
    