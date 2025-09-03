import { FunctionalSituation } from '../../pages/hub/FunctionalSituation'
import { UnikAPI } from '../../pages/as/UnikAPI'
import { OneAPI } from '../../pages/one/OneAPI'
import { test } from '../../fixtures/auth'
import data from '../../test-data/accounts.json'

async function validateStatus(
  as: UnikAPI, 
  one: OneAPI, 
  statusAS: 'A' | 'B' | 'C', 
  statusONE: 'ACTIVE' | 'BLOCKED' | 'CANCELED'
) {
  await as.checkAccountStatus(
    data.alforge.convenio, 
    data.alforge.cpf, 
    data.alforge.matricula, 
    statusAS
  );
  await one.checkAccountStatus(
    data.alforge.convenio, 
    data.alforge.oneEmployee, 
    statusONE
  );
}

async function testLockUnlock(action: 'L' | 'U', lockType: 'BLOQUEIO_FERIAS' | 'BLOQUEIO_INSS' | 'BLOQUEIO_AVISO_PREVIO', token: any, request: any) {
  const as = new UnikAPI();
  const one = new OneAPI();

  if (action === 'L') {
    await validateStatus(as, one, 'A', 'ACTIVE');

    const fs = new FunctionalSituation(token, request);
    await fs.lockAccount(
      data.alforge.idConvenio,
      data.alforge.convenio,
      data.alforge.cpf,
      data.alforge.matricula,
      lockType
    );

    await new Promise(r => setTimeout(r, 3000));
    await validateStatus(as, one, 'B', 'BLOCKED');

  } else if (action === 'U') {
    await validateStatus(as, one, 'B', 'BLOCKED');

    const fs = new FunctionalSituation(token, request);
    await fs.unlockAccount(
      data.alforge.idConvenio,
      data.alforge.convenio,
      data.alforge.cpf,
      data.alforge.matricula
    );

    await new Promise(r => setTimeout(r, 3000));
    await validateStatus(as, one, 'A', 'ACTIVE');
  }
}

const testLockTypes: ('BLOQUEIO_FERIAS' | 'BLOQUEIO_INSS' | 'BLOQUEIO_AVISO_PREVIO')[] = [
  'BLOQUEIO_FERIAS',
  'BLOQUEIO_INSS',
  'BLOQUEIO_AVISO_PREVIO'
];

testLockTypes.forEach(lockType => {
  test(`Bloqueio de ${lockType}`, async ({token, request}) => {
    await testLockUnlock('L', lockType, token, request);
  });

  test(`Desbloqueio de ${lockType}`, async ({token, request}) => {
    await testLockUnlock('U', lockType, token, request);
  });
});
