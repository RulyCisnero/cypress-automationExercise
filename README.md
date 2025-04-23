<div align="center">
  <img src="https://raw.githubusercontent.com/RulyCisnero/cypress-automationExercise/main/Portada/banner-cypress.png" alt="Cypress Automation Project" width="100%" />
</div>

## 📊 Cypress Automation Project

Proyecto de automatización de pruebas funcionales y de API sobre el sitio [https://automationexercise.com](https://automationexercise.com) usando **Cypress + TypeScript**.

---

### 📌 Contenido

- [🚀 Tecnologías](#-tecnologías)
- [⚙ Cómo Ejecutar](#-cómo-ejecutar)
- [🧪 Comandos de Test](#comandos-de-test)
- [📄 Reportes](#reportes)
- [✅ Tests Implementados](#tests-implementados)
- [👤 Usuarios](#usuarios)
- [🧠 Buenas Prácticas Aplicadas](#buenas-prácticas-aplicadas)
- [🔮 Mejoras Futuras](#mejoras-futuras)
- [✍ Autor](#autor)

---

### 🚀 Tecnologías

<p align="left">
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white" />
  <img src="https://img.shields.io/badge/Allure-FF4088?style=for-the-badge&logo=allure&logoColor=white" />
  <img src="https://img.shields.io/badge/Mochawesome-007ACC?style=for-the-badge" />
</p>

---

### ⚙ Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Correr Cypress con interfaz gráfica
npx cypress open

# Correr tests en headless mode (CLI)
npx cypress run
```
🧪 Comandos de Test
```bash
"scripts": {
      "test:cy": "npx cypress run",
      "test:ui": "npx cypress run --env allure=true --config specPattern=cypress/e2e/UI-Tests/**/*.cy.ts",
      "test:features": "npx cypress run --env allure=true --config specPattern=cypress/e2e/features/**/*.feature",
      "test:all": "npm run test:ui && npm run test:features",

      "test:smoke": "npx cypress run --env TAGS=@smoke,allure=true --config specPattern=cypress/e2e/features/**/*.feature",
      "test:sanity": "npx cypress run --env TAGS=@sanity,allure=true --config specPattern=cypress/e2e/features/**/*.feature",
      "test:regression": "npx cypress run --env TAGS=@regression,allure=true --config specPattern=cypress/e2e/features/**/*.feature",

      "report:merge": "del cypress\\reports\\merged-report.json 2>nul && mochawesome-merge cypress/reports/mochawesome/.jsons/*.json > cypress/reports/merged-report.json",
      "report:generate": "marge cypress/reports/merged-report.json --reportDir cypress/reports/final --reportFilename report.html --inline",
      "report": "npm run test:all && npm run report:merge && npm run report:generate",
      "clean:mochawesome": "rimraf cypress/reports/mochawesome && rimraf cypress/reports/merged-report.json && rimraf cypress/reports/final",

      
      "generate-local-report":"allure generate --single-file allure-results",
      "generate-allure-report": "allure generate allure-results --clean -o allure-report",
      "open-allure-report": "allure open allure-report",
      "test-with-allure": "npm run test && npm run generate-allure-report && npm run open-allure-report",
      
      "clean:reports": "rimraf cypress/reports/*.json && rimraf cypress/reports/*.html && rimraf cypress/reports/mochawesome/.jsons",
      
      "clean:allure": "rimraf allure-results allure-report",
      "clean:cypress": "rimraf cypress/screenshots cypress/videos",
      "clean:all": "npm run clean:allure && npm run clean:cypress"
    }
```

📄 Reportes
Allure Report

Generación: npm run generate-allure-report
Visualización: npm run open-allure-report

Mochawesome Report (opcional):
Merge: npm run report:merge
Generar HTML: npm run report:generate


✅ Tests Implementados
Registro de usuario (formulario + validación API)
Login con credenciales válidas e inválidas
Eliminación de usuario desde la UI y desde la API
Validaciones cruzadas: respuesta API + visibilidad DOM


👤 Usuarios
Los usuarios se mockean desde fixtures/user.json o se pasan como parámetros por configuración.


🧠 Buenas Prácticas Aplicadas
Comandos personalizados (commands.ts) para lógica reutilizable
Estructura modular con Page Object Model
Agrupación de tests por tags (@smoke, @regression, etc.)
Separación de tests (features/, Ui-Tests/)
Tipado fuerte con TypeScript

🔮 Mejoras Futuras
Integración con CI/CD (GitHub Actions)
Validación visual con Percy u otras herramientas
Evidencias automáticas (PDFs, screenshots)
Notificaciones por Slack o Email post ejecución

✍ Autor
Desarrollado por Raul Cisnero, con fines educativos y profesionales.
