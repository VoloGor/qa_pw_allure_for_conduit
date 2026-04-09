import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  deleteAllureResults: [
    async ({}, use) => {

      const allureResultsPath = path.join(process.cwd(), 'allure-results');
      
      if (fs.existsSync(allureResultsPath)) {
        fs.rmSync(allureResultsPath, { recursive: true, force: true });
        console.log('✓ allure-results folder deleted');
      }

      await use();
    },
    { scope: 'worker' },
  ],
});