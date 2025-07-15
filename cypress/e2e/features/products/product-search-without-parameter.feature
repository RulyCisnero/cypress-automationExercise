@JIRA:SCRUM-10 @negativo
Feature:  Product search without passing "product" parameter

# Caso negativo (-CN): Probar la API cuando no se pasa el parámetro "search_product"

Scenario:  Attempt to search without sending the 'search_product' parameter
  Given I visit the main page -CN
  When I click on the Products button -CN
  And I make a POST request to the search API without the 'search_product' parameter
  Then the response should return a 400 error with a message indicating the 'search_product' parameter is missing
