@smoke
Feature: Búsqueda de productos

  Scenario Outline: Buscar distintos productos por nombre
    Given que visito la página principal -BP
    When hago clic en el botón de Productos
    And ingreso "<producto>" en el campo de búsqueda
    And hago clic en el botón de buscar
    Then debería ver el título de productos buscados
    Then deberían visualizarse los productos relacionados con la búsqueda de "<producto>"
 
    Examples:
      | producto     |
      | Polo         |
      | Blue Top     |
      | Men Tshirt   |
      | Winter Top   |