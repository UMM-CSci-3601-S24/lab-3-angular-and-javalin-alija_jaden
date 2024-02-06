import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      // implement node event listeners here
      require('./cypress/plugins/index.ts').default(on, config);
    },
  },
});
