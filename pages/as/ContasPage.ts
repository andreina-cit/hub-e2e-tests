import { Page, expect } from '@playwright/test';
import 'dotenv/config';
import { url } from '../../fixtures/urls';

export class ContasPage {
  constructor(private page: Page) {}

  async login() {
    const login = process.env.AS_LOGIN;
    const password = process.env.AS_PASSWORD;
    const portalAS = url.as.portalAS

    if (!login || !password) {
      throw new Error('Missing CLIENT_ID ou CLIENT_SECRET in .env')
    }
    await this.page.goto('');
    await this.page.locator('[name="login"]').fill(login);
    await this.page.locator('[name="senha"]').fill(password);
    await this.page.locator('input[name="button"]').click();
    await this.page.locator('#contas_mais').click();
  }

  async filterAccount(
    cpf: string,
    matricula: string,
    expectedStatus: '******' | 'Conta Bloqueada' | 'Conta Cancelada'
  ) {
    await this.page.locator('a[href*="CadastroConta"][href*="listar"]').click();
    await this.page.waitForTimeout(5000)
    await this.page.locator('#cpfFiltro').fill(cpf);
    await this.page.locator('#campoAux1').fill(matricula);
    await this.page.locator('input[type="image"][src*="botaoFiltrar.gif"]').click();

    const td = this.page.locator('td[width="105"]').filter({ hasText: expectedStatus });
    await td.waitFor({ state: 'visible', timeout: 10000 });
    await expect(td).toContainText(expectedStatus, { timeout: 30000 });
  }
}
