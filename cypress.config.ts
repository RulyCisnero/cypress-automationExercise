import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  // 🔧 ESTA es la posición correcta del TAGS por defecto (afuera del bloque `e2e`)
  env: {
    TAGS: "not @ignore" // Esto hace que por defecto se salten tests ignorados
  },
  e2e: {
    // 👇 ES ASÍ como se declara setupNodeEvents de forma async
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // 💡 Reportes con mochawesome 
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    // Archivos que se consideran tests
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.ts"
    ],

    // Ruta base del sitio que estás testeando
    baseUrl: "https://www.automationexercise.com/",

    // Excluir ejemplos por defecto
    excludeSpecPattern: ["**/examples/**"],

    // 📋 Configuración del reporter mochawesome 
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true
    },

    // 🔍 Ruta a los step definitions de tus features
    env: {
      stepDefinitions: "cypress/e2e/features/steps/**/*.ts"
    }
  }
});
