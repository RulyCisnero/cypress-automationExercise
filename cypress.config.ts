import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
//import allureWriter from '@shelex/cypress-allure-plugin/writer';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


export default defineConfig({
  env: {
    TAGS: "not @ignore",
    stepDefinitions: "cypress/e2e/features/steps/*.ts",
    allure: true,
    allureReuseAfterSpec: true,
    allureAddVideoOnPass: true, // Opcional: añade video aunque el test pase
    allureAttachRequests: true  // Opcional: adjunta solicitudes HTTP
  },
  e2e: {
    async setupNodeEvents(on, config) {
      // Configuración de Allure
      allureWriter(on, config);

      // Configuración de Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Opcional: Adjuntar screenshots automáticamente
      on('after:screenshot', (details) => {
        if (details.testFailure) {
          allureWriter.addAttachment('Screenshot on failure', details.path, 'image/png');
        }
      });

      return config;
    },
    specPattern: [
      'cypress/e2e/features/**/*.feature',
       'cypress/e2e/UI-Tests/**',
    ],
    baseUrl: "https://www.automationexercise.com/",
    excludeSpecPattern: [
      'cypress/e2e/Api-Test/**/*',
      'cypress/e2e/UI-Tests/PruebaPom.cy.ts',
    ],
    screenshotOnRunFailure: true,
    video: false // Recomendado para Allure
  }
});