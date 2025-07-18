import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

// Allure writer
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require('fs');

export default defineConfig({
  projectId: 'xo3wtp',
  pageLoadTimeout: 20000, // ✅ Espera hasta 20 segundos a que cargue la página
  viewportWidth: 1920,    // ✅ Resolución estándar de escritorio (FullHD)
  viewportHeight: 1080,
  retries: process.env.CI ? 2 : 0, // ✅ Reintenta los tests solo en CI
	screenshotsFolder: 'cypress/screenshots',  // ✅ Carpeta personalizada para guardar screenshots
	screenshotOnRunFailure: true,  // ✅ Toma screenshot solo si el test falla

  env: {
    TAGS: 'not @ignore',
    stepDefinitions: 'cypress/e2e/features/steps/*.ts',
    allure: true,
    allureReuseAfterSpec: true,
    allureAddVideoOnPass: true,
    allureAttachRequests: true
  },
  e2e: {
    // Enable video recording and screenshots
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',

    async setupNodeEvents(on, config) {
      // Initialize Allure plugin
      allureWriter(on, config);

      // Initialize Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      // Attach screenshots to Allure on test failure
      on('after:screenshot', (details) => {
        if (details.testFailure && fs.existsSync(details.path)) {
          allureWriter.addAttachment(
            'Screenshot on Failure',
            fs.readFileSync(details.path),
            'image/png'
          );
        }
      });

      return config;
    },

    specPattern: [
      'cypress/e2e/features/**/*.feature',
      'cypress/e2e/UI-Tests/**'
    ],
    baseUrl: 'https://www.automationexercise.com/',
    excludeSpecPattern: ['cypress/e2e/Api-Test/**/*']
  }
});
