@smoke
Feature: Visualización de productos

  Scenario: Verificar todos los productos y la página de detalle de producto
    Given que visito la página principal
    When hago clic en el botón de productos
    Then debería ser redirigido a la página de todos los productos
    And debería ver la lista de productos
    When hago clic en 'Ver producto' del primer producto
    Then debería ser redirigido a la página de detalle del producto
    And debería ver los detalles del producto como: nombre, categoría, precio, disponibilidad, condición y marca
    