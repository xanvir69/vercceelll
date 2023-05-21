const fs = require('fs');
const { join } = require('path');

const {
  testDeployment,
} = require('../../../test/lib/deployment/test-deployment.js');

jest.setTimeout(12 * 60 * 1000);

const fixturesPath = join(__dirname, 'fixtures');
const exampleAbsolute = (name: string) =>
  join(__dirname, '..', '..', '..', 'examples', name);

// eslint-disable-next-line no-restricted-syntax
for (const fixture of fs.readdirSync(fixturesPath)) {
  // eslint-disable-next-line no-loop-func
  it(`should build ${fixture}`, async () => {
    await expect(
      testDeployment(join(fixturesPath, fixture))
    ).resolves.toBeDefined();
  });
}

it(`should build remix example`, async () => {
  const example = exampleAbsolute('remix');
  await expect(testDeployment(example)).resolves.toBeDefined();
});
