import { request, expect } from '@playwright/test';
import { url } from '../../fixtures/urls'

export class UnikAPI {
  constructor() {}

  async checkAccountStatus(
    convenio: string | Number,
    cpf: string,
    matricula: string,
    expectedStatus: 'A' | 'B' | 'C'
    ){
    const requestContext = await request.newContext()
    const response = await requestContext.get(
        url.as.infoConta(
          convenio, 
          cpf, 
          matricula)
      )
      expect(response.status(), 'Status code should be 200').toBe(200)
      const json = await response.json();
      expect(json.clienteStatus, `AS Account should be ${expectedStatus}`).toBe(expectedStatus)
  }
}
