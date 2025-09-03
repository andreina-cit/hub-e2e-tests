import { request, expect } from '@playwright/test';
import { url } from '../../fixtures/urls'

export class OneAPI {
  constructor() {}

  async checkAccountStatus(
    convenio: string | Number,
    employee: string | Number,
    expectedStatus: 'ACTIVE' | 'BLOCKED' | 'CANCELED'
    ){
    const requestContext = await request.newContext()
    const response = await requestContext.get(
        url.one.infoConta(
            convenio,
            employee
        )
      )
      expect(response.status(), 'Status code should be 200').toBe(200)
      const json = await response.json();
      expect(json.status, `ONE Account should be ${expectedStatus}`).toBe(expectedStatus)
  }
}