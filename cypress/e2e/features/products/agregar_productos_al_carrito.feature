@smoke
Feature: Agregar productos al carrito

  Scenario: El usuario agrega dos productos al carrito desde la página de productos
    Given que visito la página de inicio para productos
    When hago clic en el botón de productos para productos
    And agrego el primer producto al carrito para productos
    And hago clic en el botón 'Continuar comprando' para productos
    And agrego el segundo producto al carrito para productos
    And hago clic en el botón 'Ver carrito' para productos
    When debería ver ambos productos en el carrito para productos
    #Y sus precios, cantidades y precios totales deben ser correctos
