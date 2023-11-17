import { Command } from 'commander';
import * as process from 'process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { useCrypto } from './crypto';

function bootstrap({ name, description, version }: any) {
  const program = (new Command())
    .name(name)
    .version(version)
    .description(description);

  // crypto
  useCrypto(program);

  return program.parseAsync(process.argv);
}

const packagePath = resolve(__dirname, '..', 'package.json');
const packageJson = readFileSync(packagePath, 'utf-8');

bootstrap(JSON.parse(packageJson));
