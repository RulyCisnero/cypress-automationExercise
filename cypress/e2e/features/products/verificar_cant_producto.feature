@smoke
Feature: Feature name

    Feature Description: Verificar cantidad del producto en el carrito

  Scenario: El usuario selecciona una cantidad específica de un producto y la verifica en el carrito
    Given  que visito la página de inicio -VP
    When  hago clic en 'Ver producto' de un producto
    Then debería ver los detalles del producto
    When aumento la cantidad a 4
    And hago clic en el botón 'Agregar al carrito' y me redirecciona a carrito
    Then debería ver el producto con la cantidad correcta en el carrito
