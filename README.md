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
- [🛠 Integraciones](#Integraciones)
- [✅ Tests Implementados](#tests-implementados)
- [👤 Usuarios](#usuarios)
- [🧠 Buenas Prácticas Aplicadas](#buenas-prácticas-aplicadas)
- [🛠 CI/CD (GitHub Actions)](#CI/CD-(GitHub-Actions))
- [✍ Autor](#Autor)

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
  <img src="https://img.shields.io/badge/jira-blue?style=for-the-badge&logo=jira&logoColor=white" />
</p>

| Herramienta        | Propósito                                        |
| ------------------ | ------------------------------------------------ |
| **Cypress**        | Testing End-to-End                               |
| **TypeScript**     | Tipado estático y robustez del código            |
| **Cucumber**       | Sintaxis Gherkin para pruebas legibles           |
| **Allure**         | Reportes visuales con historial                  |
| **GitHub Actions** | CI/CD: ejecución automática + subida de reportes |
| **Jira**           | Gestión de historias de usuario y trazabilidad   |
| **Mochawesome**    | Reporte HTML alternativo                         |


---

### ⚙ Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Correr Cypress con interfaz gráfica
npx cypress open

# Correr tests en headless mode (CLI)
npx cypress run

# Correr tests E2E
npm run test:features

# Generar Allure Report
npm run generate-allure-report
npm run open-allure-report
```

### 🧪 Comandos de Test
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

### 📄 Reportes

📌 Allure Report (CI)

✅ Reporte generado automáticamente por GitHub Actions
🔗 <a href="https://rulycisnero.github.io/cypress-automationExercise/">Reportes de las features con tags=@Smoke, ignorando las features que no tienen el tag</a>
🔗 <a href="https://rulycisnero.github.io/cypress-automationExercise/products/">Reporte Epica Products</a>


📌 Mochawesome (local)
Merge: npm run report:merge
HTML: npm run report:generate

### 🛠 Integraciones
☁ GitHub Actions
Cada push activa un workflow de CI que:
Corre los tests marcados con tags.
Genera y publica el reporte Allure.
Comenta automáticamente los issues de Jira con el resultado del test.

🔗 Integración con Jira
Cada feature contiene un tag @JIRA:AEQ-6 que vincula los tests con historias del proyecto real (AEQ = Automation Exercise QA).
✔ El script comment-to-jira.js detecta los tags y comenta automáticamente en los tickets asociados.
🛠 Configurado mediante secretos: JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL.



📌 Jira Software Cloud
Se extraen automáticamente los tags del tipo @JIRA:AEQ-7 de los .feature y se publica un comentario con el enlace al reporte Allure.
```bash
  @JIRA:AEQ-7 @smoke @owner:Ruly @severity:critical
  Feature: Agregar producto al carrito
```
🎯 Esto permite rastrear qué test se ejecutó para cada historia de usuario.

✅ Tests Implementados
Registro de usuario (formulario + validación API)
Login con credenciales válidas e inválidas
Eliminación de usuario desde la UI y desde la API
Navegación en productos y categorías
Agregar productos al carrito
Checkout y validación final
Validaciones cruzadas: respuesta API + visibilidad DOM


👤 Usuarios
Los usuarios se mockean desde fixtures/user.json o se pasan como parámetros por configuración.


### 🧠 Buenas Prácticas Aplicadas
Estructura modular con Page Object Model
Comandos personalizados (commands.ts) para lógica reutilizable
Agrupación de tests por tags (@smoke, @regression, etc.)
Separación de tests (features/, Ui-Tests/)
Tipado fuerte con TypeScript
CI/CD en GitHub Actions + comentarios Jira

### 🛠 CI/CD (GitHub Actions)
Corre tests automáticamente en push/pull request

Filtra por tags (@smoke)

Publica Allure Report en GitHub Pages

Comenta los resultados en tickets de Jira (AEQ-X)


### ✍ Autor
Desarrollado por Raul Cisnero, con fines educativos y profesionales.
📫 raulecisnero@gmail.com
🔗 LinkedIn
