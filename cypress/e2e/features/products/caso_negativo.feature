@negativo
Feature: Búsqueda de productos sin pasar el parámetro "producto"

# Caso negativo (-CN): Probar la API cuando no se pasa el parámetro "search_product"

Scenario: Intentar realizar una búsqueda sin enviar el parámetro "search_product"
  Given que visito la página principal -CN
  When hago clic en el botón de Productos -CN
  And realizo una solicitud POST a la API de búsqueda sin pasar el parámetro 'search_product'
  Then la respuesta debe ser un error 400 con un mensaje indicando que el parámetro 'search_product' está ausente
