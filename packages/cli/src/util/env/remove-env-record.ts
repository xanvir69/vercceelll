import { Output } from '../output';
import Client from '../client';
import type { ProjectEnvVariable } from '@vercel-internals/types';

export default async function removeEnvRecord(
  output: Output,
  client: Client,
  projectId: string,
  env: ProjectEnvVariable
): Promise<void> {
  output.debug(`Removing Environment Variable ${env.key}`);

  const urlProject = `/v8/projects/${projectId}/env/${env.id}`;

  await client.fetch<ProjectEnvVariable>(urlProject, {
    method: 'DELETE',
  });
}
