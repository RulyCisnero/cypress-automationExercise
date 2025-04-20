## 📊 Cypress Automation Project

Proyecto de automatización de pruebas funcionales y de API sobre el sitio [https://automationexercise.com](https://automationexercise.com) usando **Cypress + TypeScript**.

---

### 📌 Contenido

- [Tecnologías](#tecnologías)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Tests Implementados](#tests-implementados)
- [Usuarios](#usuarios)
- [Buenas Prácticas Aplicadas](#buenas-prácticas-aplicadas)
- [Mejoras Futuras](#mejoras-futuras)

---

### 🚀 Tecnologías

- [Cypress](https://www.cypress.io/) - Framework de testing end-to-end
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript con tipado estático
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Lenguaje base del proyecto
- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript

---

### ⚙ Cómo Ejecutar

```bash
npm install
npx cypress open   # Para correr con la UI
npx cypress run    # Para correr en headless
```

---

### ✅ Tests Implementados

- ✅ Registro de usuario (formulario + validación API + visibilidad de cuenta)
- ✅ Login con credenciales válidas e inválidas
- ✅ Eliminación de usuario desde la UI y desde la API
- ✅ Validaciones cruzadas: respuesta API + DOM visible
- ✅ Uso de `beforeEach` para limpieza del entorno

---

### 👤 Usuarios

Se utilizan usuarios mockeados desde `fixtures/user.json` o pasados como parámetros según el caso.

---

### 🧐 Buenas Prácticas Aplicadas

- Uso de comandos personalizados para mantener DRY el código
- Separación por Page Object Model para facilitar el mantenimiento
- Validación cruzada (UI + API)
- Uso de tipado con TypeScript para robustez
- Separación de tests por partes para mejor legibilidad

---

### 🔮 Mejoras Futuras

- Integración con CI/CD (GitHub Actions)
- Reportes HTML de resultados (Mochawesome, Allure, etc)
- Agregar tags a los tests (`@regression`, `@smoke`, etc.)
- Inclusión de pruebas negativas
- Validación visual con Percy o similar

---

###

