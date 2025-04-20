# features/productos/buscar_producto.feature
# También se puede probar con:
# - Blue Top
# - Men Tshirt
# - Winter Top

Feature: Búsqueda de productos

  Scenario: Buscar un producto por nombre
    Given que visito la página principal -BP
    When hago clic en el botón de Productos
    And ingreso "Polo" en el campo de búsqueda
    And hago clic en el botón de buscar
    When debería ver el título de productos buscados
    When deberían visualizarse los productos relacionados con la búsqueda
