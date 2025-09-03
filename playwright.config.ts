import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests', // Diretório onde os testes estão localizados
  timeout: 30000, // Tempo máximo para cada teste (30 segundos)
  expect: {
    timeout: 5000, // Timeout para expectativas
  },
  retries: 2, // Número de tentativas para testes com falha
  reporter: 'html', // Relatório em formato HTML
  use: {
    baseURL: 'http://localhost:3000', // URL base usada em testes
    headless: true, // Define se os navegadores devem rodar sem interface
    viewport: { width: 1280, height: 720 }, // Tamanho da janela do navegador
    actionTimeout: 0, // Timeout para ações individuais
    trace: 'on-first-retry', // Cria rastros para falhas no primeiro retry 
    screenshot: 'on',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
