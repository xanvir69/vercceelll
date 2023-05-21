process.env.NEXT_TELEMETRY_DISABLED = '1';

const path = require('path');
const fs = require('fs-extra');
const builder = require('../../');
const {
  createRunBuildLambda,
} = require('../../../../test/lib/run-build-lambda');

const runBuildLambda = createRunBuildLambda(builder);

jest.setTimeout(360000);

it('Should build the static-files test on legacy', async () => {
  const {
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'legacy-static-files'));
  expect(output['static/test.txt']).toBeDefined();
});

it('Should build the static-files test', async () => {
  const {
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'static-files'));
  expect(output['static/test.txt']).toBeDefined();
});

it('Should build the public-files test', async () => {
  const {
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'public-files'));
  expect(output['robots.txt']).toBeDefined();
  expect(output['generated.txt']).toBeDefined();
});

it('Should build the serverless-config example', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'serverless-config'));

  expect(output.index).not.toBeDefined();
  expect(output.goodbye).not.toBeDefined();
  expect(output.__NEXT_PAGE_LAMBDA_0).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();

  const contents = await fs.readdir(workPath);

  expect(contents.some(name => name === 'next.config.js')).toBeTruthy();
  expect(
    contents.some(name =>
      name.includes('next.config.__vercel_builder_backup__')
    )
  ).toBeTruthy();
});

it('Should build the serverless-config-monorepo-missing example', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(
    path.join(__dirname, 'serverless-config-monorepo-missing')
  );

  expect(output['nested/index']).not.toBeDefined();
  expect(output['nested/goodbye']).not.toBeDefined();
  expect(output['nested/__NEXT_PAGE_LAMBDA_0']).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();

  const contents = await fs.readdir(path.join(workPath, 'nested'));

  expect(contents.some(name => name === 'next.config.js')).toBeTruthy();
});

it('Should build the serverless-config-monorepo-present example', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(
    path.join(__dirname, 'serverless-config-monorepo-present')
  );

  expect(output['nested/index']).not.toBeDefined();
  expect(output['nested/goodbye']).not.toBeDefined();
  expect(output['nested/__NEXT_PAGE_LAMBDA_0']).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();

  const contents = await fs.readdir(path.join(workPath, 'nested'));

  expect(contents.some(name => name === 'next.config.js')).toBeTruthy();
  expect(
    contents.some(name =>
      name.includes('next.config.__vercel_builder_backup__')
    )
  ).toBeTruthy();
});

it('Should build the serverless-config-async example', async () => {
  let error = null;

  try {
    await runBuildLambda(path.join(__dirname, 'serverless-config-async'));
  } catch (err) {
    error = err;
  }

  expect(error).toBe(null);
});

it('Should build the serverless-config-promise example', async () => {
  let error = null;

  try {
    await runBuildLambda(path.join(__dirname, 'serverless-config-promise'));
  } catch (err) {
    error = err;
  }

  expect(error).toBe(null);
});

it('Should build the serverless-config-object example', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'serverless-config-object'));

  expect(output['index']).toBeDefined();
  expect(output.goodbye).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app-.*\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error-.*\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();

  const contents = await fs.readdir(workPath);

  expect(contents.some(name => name === 'next.config.js')).toBeTruthy();
  expect(
    contents.some(name =>
      name.includes('next.config.__vercel_builder_backup__')
    )
  ).toBeFalsy();
});

it('Should build the serverless-no-config example', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'serverless-no-config'));

  expect(output['index']).toBeDefined();
  expect(output.goodbye).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app-.*\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error-.*\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();

  const contents = await fs.readdir(workPath);

  expect(contents.some(name => name === 'next.config.js')).toBeFalsy();
  expect(
    contents.some(name =>
      name.includes('next.config.__vercel_builder_backup__')
    )
  ).toBeFalsy();
});

it('Should invoke build command with serverless-no-config', async () => {
  const {
    workPath,
    buildResult: { output },
  } = await runBuildLambda(path.join(__dirname, 'serverless-no-config-build'));

  expect(output['index']).toBeDefined();
  const filePaths = Object.keys(output);
  const serverlessError = filePaths.some(filePath => filePath.match(/_error/));
  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app-.*\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error-.*\.js$/)
  );
  const hasBuildFile = await fs.pathExists(
    path.join(__dirname, 'serverless-no-config-build'),
    '.next',
    'world.txt'
  );

  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();
  expect(serverlessError).toBeTruthy();
  expect(hasBuildFile).toBeTruthy();

  const contents = await fs.readdir(workPath);

  expect(contents.some(name => name === 'next.config.js')).toBeFalsy();
  expect(
    contents.some(name =>
      name.includes('next.config.__vercel_builder_backup__')
    )
  ).toBeFalsy();
});

// eslint-disable-next-line jest/no-disabled-tests
it.skip('Should not exceed function limit for large dependencies (server build)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  const {
    buildResult: { output },
  } = await runBuildLambda(
    path.join(__dirname, '../fixtures/00-test-limit-server-build')
  );
  console.log = origLog;

  expect(output['index']).toBeDefined();
  expect(output['api/chrome']).toBeDefined();
  expect(output['api/chrome-1']).toBeDefined();
  expect(output['api/firebase']).toBeDefined();
  expect(output['api/firebase-1']).toBeDefined();
  expect(output['gssp']).toBeDefined();
  expect(output['gssp-1']).toBeDefined();
  const filePaths = Object.keys(output);

  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app-.*\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error-.*\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();

  const lambdas = new Set();

  filePaths.forEach(filePath => {
    if (output[filePath].type === 'Lambda') {
      lambdas.add(output[filePath]);
    }
  });
  expect(lambdas.size).toBe(3);

  // this assertion is unstable as `next-server`'s size can change up and down
  // on canary so skipping to prevent random failures.
  // expect(logs).toContain(
  //   'Warning: Max serverless function size of 50 MB compressed or 250 MB uncompressed almost reached'
  // );

  expect(logs).toContain('node_modules/chrome-aws-lambda/bin');
});

// eslint-disable-next-line jest/no-disabled-tests
it.skip('Should not exceed function limit for large dependencies (shared lambda)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  const {
    buildResult: { output },
  } = await runBuildLambda(
    path.join(__dirname, '../fixtures/00-test-limit-shared-lambdas')
  );
  console.log = origLog;

  expect(output['index']).toBeDefined();
  expect(output['__NEXT_API_LAMBDA_0']).toBeDefined();
  expect(output['__NEXT_API_LAMBDA_1']).toBeDefined();
  expect(output['__NEXT_API_LAMBDA_2']).not.toBeDefined();
  expect(output['__NEXT_PAGE_LAMBDA_0']).toBeDefined();
  expect(output['__NEXT_PAGE_LAMBDA_1']).not.toBeDefined();

  const filePaths = Object.keys(output);

  const hasUnderScoreAppStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_app-.*\.js$/)
  );
  const hasUnderScoreErrorStaticFile = filePaths.some(filePath =>
    filePath.match(/static.*\/pages\/_error-.*\.js$/)
  );
  expect(hasUnderScoreAppStaticFile).toBeTruthy();
  expect(hasUnderScoreErrorStaticFile).toBeTruthy();

  const lambdas = new Set();

  filePaths.forEach(filePath => {
    if (output[filePath].type === 'Lambda') {
      lambdas.add(output[filePath]);
    }
  });
  expect(lambdas.size).toBe(3);

  expect(logs).toContain(
    'Warning: Max serverless function size of 50 MB compressed or 250 MB uncompressed almost reached'
  );
  expect(logs).toContain('node_modules/chrome-aws-lambda/bin');
});

it('Should provide lambda info when limit is hit (server build)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  try {
    await runBuildLambda(
      path.join(__dirname, 'test-limit-exceeded-server-build')
    );
  } catch (err) {
    console.error(err);
  }
  console.log = origLog;

  expect(logs).toContain(
    'Max serverless function size was exceeded for 2 functions'
  );
  expect(logs).toContain(
    'Max serverless function size of 50 MB compressed or 250 MB uncompressed reached'
  );
  expect(logs).toContain(`Serverless Function's page: api/both.js`);
  expect(logs).toMatch(
    /Large Dependencies.*?Uncompressed size.*?Compressed size/
  );
  expect(logs).toMatch(
    /node_modules\/chrome-aws-lambda\/bin.*?\d{2}.*?MB.*?\d{2}.*?MB/
  );
  expect(logs).toMatch(/node_modules\/@firebase\/firestore.*?\d{1}.*?MB/);
  expect(logs).toMatch(/big-image-1/);
  expect(logs).toMatch(/big-image-2/);
});

it('Should provide lambda info when limit is hit (shared lambdas)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  try {
    await runBuildLambda(
      path.join(__dirname, 'test-limit-exceeded-shared-lambdas')
    );
  } catch (err) {
    console.error(err);
  }
  console.log = origLog;

  expect(logs).toContain(
    'Max serverless function size was exceeded for 1 function'
  );
  expect(logs).toContain(
    'Max serverless function size of 50 MB compressed or 250 MB uncompressed reached'
  );
  expect(logs).toContain(`Serverless Function's page: api/both.js`);
  expect(logs).toMatch(
    /Large Dependencies.*?Uncompressed size.*?Compressed size/
  );
  expect(logs).toMatch(
    /node_modules\/chrome-aws-lambda\/bin.*?\d{2}.*?MB.*?\d{2}.*?MB/
  );
  expect(logs).toMatch(/node_modules\/@firebase\/firestore.*?\d{1}.*?MB/);
});

it('Should provide lambda info when limit is hit for internal pages (server build)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  try {
    await runBuildLambda(
      path.join(__dirname, 'test-limit-exceeded-internal-files-server-build')
    );
  } catch (err) {
    console.error(err);
  }
  console.log = origLog;

  expect(logs).toContain(
    'Max serverless function size of 50 MB compressed or 250 MB uncompressed reached'
  );
  // expect(logs).toContain(`Serverless Function's page: api/firebase.js`);
  expect(logs).toContain(`Serverless Function's page: api/chrome.js`);
  expect(logs).toContain(`Serverless Function's page: api/both.js`);
  expect(logs).toMatch(
    /Large Dependencies.*?Uncompressed size.*?Compressed size/
  );
  expect(logs).toMatch(
    /node_modules\/chrome-aws-lambda\/bin.*?\d{2}.*?MB.*?\d{2}.*?MB/
  );
  expect(logs).toMatch(/node_modules\/@firebase\/firestore.*?\d{1}.*?MB/);
  expect(logs).toMatch(/public\/big-image-1\.jpg/);
  expect(logs).toMatch(/public\/big-image-2\.jpg/);
});

it('Should provide lambda info when limit is hit (uncompressed)', async () => {
  let logs = '';

  const origLog = console.log;

  console.log = function (...args) {
    logs += args.join(' ');
    origLog(...args);
  };

  try {
    await runBuildLambda(
      path.join(__dirname, 'test-limit-exceeded-404-static-files')
    );
  } catch (err) {
    console.error(err);
  }
  console.log = origLog;

  expect(logs).toContain(
    'Max serverless function size was exceeded for 1 function'
  );
  expect(logs).toContain(
    'Max serverless function size of 50 MB compressed or 250 MB uncompressed reached'
  );
  expect(logs).toContain(`Serverless Function's page: api/hello.js`);
  expect(logs).toMatch(
    /Large Dependencies.*?Uncompressed size.*?Compressed size/
  );
  expect(logs).toMatch(/data\.txt/);
  expect(logs).toMatch(/\.next\/server\/pages/);
});

it('Should de-dupe correctly when limit is close (uncompressed)', async () => {
  const origLog = console.log;
  const origError = console.error;
  const caughtLogs = [];

  console.log = function (...args) {
    caughtLogs.push(args.join(' '));
    origLog.apply(this, args);
  };
  console.error = function (...args) {
    caughtLogs.push(args.join(' '));
    origError.apply(this, args);
  };

  const {
    buildResult: { output },
  } = await runBuildLambda(
    path.join(__dirname, 'test-limit-large-uncompressed-files')
  );

  console.log = origLog;
  console.error = origError;

  expect(output['index']).toBeDefined();
  expect(output['another']).toBeDefined();
  expect(output['api/hello']).toBeDefined();
  expect(output['api/hello-1']).toBeDefined();
  expect(output['api/hello-2']).toBeDefined();
  expect(output['api/hello-3']).toBeDefined();
  expect(output['api/hello-4']).toBeDefined();
  expect(output['_app']).not.toBeDefined();
  expect(output['_error']).not.toBeDefined();
  expect(output['_document']).not.toBeDefined();

  expect(output['index'] === output['another']).toBe(true);
  expect(output['index'] !== output['api/hello']).toBe(true);
  expect(output['api/hello'] === output['api/hello-1']).toBe(true);
  expect(output['api/hello'] === output['api/hello-2']).toBe(true);
  expect(output['api/hello'] === output['api/hello-3']).toBe(true);
  expect(output['api/hello'] === output['api/hello-4']).toBe(true);

  expect(
    caughtLogs.some(log =>
      log.includes('WARNING: Unable to find source file for page')
    )
  ).toBeFalsy();

  const lambdas = new Set();
  let totalLambdas = 0;

  for (const item of Object.values(output)) {
    if (item.type === 'Lambda') {
      totalLambdas += 1;
      lambdas.add(item);
    } else if (item.type === 'Prerender') {
      lambdas.add(item.lambda);
      totalLambdas += 1;
    }
  }
  expect(lambdas.size).toBe(2);
  expect(lambdas.size).toBeLessThan(totalLambdas);
});
