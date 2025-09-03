import headerDefault from '../../test-data/headerDefault.json'
import { request, expect, APIRequestContext } from '@playwright/test';
import { pwApi, test } from 'pw-api-plugin';
import { url } from '../../fixtures/urls'

export class FunctionalSituation {
  constructor(private token: string, private request: APIRequestContext) {}

  async lockAccount(
    idConvenio: string | Number, 
    convenio: string | Number,
    cpf: string,
    matricula: string,
    lockType: 'BLOQUEIO_FERIAS' | 'BLOQUEIO_INSS' | 'BLOQUEIO_AVISO_PREVIO'
    ){
        headerDefault.Authorization = `Bearer ${this.token}`

        const response = await pwApi.post({request: this.request}, url.hub.bloqueioContas, {
          headers: headerDefault,
          data: {
            "contas": [
              {
                "idConvenio": String(idConvenio),
                "codigoConvenio": String(convenio),
                "cpf": cpf,
                "matricula": matricula,
                "data": { "tipoBloqueio": lockType }
              }
            ]
          }
        })

        expect(response.status(), 'Status code should be 200').toBe(200)
        const json = await response.json();
        expect(JSON.stringify(json), 'Response should contain lote_id').toContain('lote_id')
  }

  async unlockAccount(
    idConvenio: string | Number, 
    convenio: string | Number,
    cpf: string,
    matricula: string
    ){
        headerDefault.Authorization = `Bearer ${this.token}`

        const response = await pwApi.post({request: this.request}, url.hub.desbloqueioContas, {
          headers: headerDefault,
          data: {
            "contas": [
              {
                "idConvenio": idConvenio,
                "codigoConvenio": convenio,
                "cpf": cpf,
                "matricula": matricula
              }
            ]
          }
        })

        expect(response.status(), 'Status code should be 200').toBe(200)
        const json = await response.json();
        expect(JSON.stringify(json), 'Response should contain lote_id').toContain('lote_id')
  }
}
