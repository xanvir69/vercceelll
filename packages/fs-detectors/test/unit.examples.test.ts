import frameworkList from '@vercel/frameworks';
import { detectFramework } from '../src';
import { FixtureFilesystem } from './utils/fixture-filesystem';
import { getExamples } from '../../../examples/__tests__/test-utils';

describe('examples should be detected', () => {
  it.each(getExamples())(
    'should detect $exampleName',
    async ({ exampleName, examplePath }) => {
      const fs = new FixtureFilesystem(examplePath);
      const framework = await detectFramework({ fs, frameworkList });
      if (!framework) {
        throw new Error(`Framework not detected for example "${exampleName}".`);
      }

      if (exampleName === 'storybook') {
        // Storybook isn't really a "framework", in this case, it's really a
        // Next.js app
        expect(framework).toBe('nextjs');
      } else {
        expect(framework).toBe(exampleName);
      }
    }
  );
});
