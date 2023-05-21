import { glob } from '@vercel/build-utils';
import { dirname, join, relative } from 'path';
import { chdirAndReadConfig } from './utils';
import type { PrepareCache } from '@vercel/build-utils';

export const prepareCache: PrepareCache = async ({
  entrypoint,
  repoRootPath,
  workPath,
}) => {
  const root = repoRootPath || workPath;
  const mountpoint = dirname(entrypoint);
  const entrypointFsDirname = join(workPath, mountpoint);
  const packageJsonPath = join(entrypointFsDirname, 'package.json');
  const remixConfig = await chdirAndReadConfig(
    entrypointFsDirname,
    packageJsonPath
  );
  const [nodeModulesFiles, cacheDirFiles] = await Promise.all([
    // Cache `node_modules`
    glob('**/node_modules/**', root),

    // Cache the Remix "cacheDirectory" (typically `.cache`)
    glob(relative(root, join(remixConfig.cacheDirectory, '**')), root),
  ]);

  return { ...nodeModulesFiles, ...cacheDirFiles };
};
