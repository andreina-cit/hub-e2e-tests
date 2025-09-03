import 'dotenv/config'
export const url = {
  hub: {
    auth: `${process.env.HUB_URL_AUTH}/oauth2/v1/token`,
    bloqueioContas: `${process.env.HUB_URL_APICONTAS}/bloqueio`,
    desbloqueioContas: `${process.env.HUB_URL_APICONTAS}/desbloqueio`,
  },
  one: {  
    infoConta: (convenio: string | Number, employee: string | Number) => 
      `${process.env.ONE_URL_API}/business_clients/${convenio}/employees/${employee}`,
  },
  as: {
    infoConta: (convenio: string | Number, cpf: string, matricula: string) => 
      `${process.env.AS_URL_API}/financas/convenio/${convenio}/pessoa/${cpf}/matricula/${matricula}/limites`,
    portalAS: `${process.env.AS_URL_PORTAL}/Controle?manipulador=Login`
  },
  };