import { spawnSync } from 'node:child_process';

const run = (args) => spawnSync(process.execPath, args, { stdio: 'inherit' });
const build = run(['./scripts/build-github.mjs']);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const publish = run([
  './node_modules/gh-pages/bin/gh-pages.js',
  '--dist',
  'out',
  '--repo',
  'https://github.com/CraftoGamerz/Assignment-Cover.git',
  '--branch',
  'gh-pages',
  '--dotfiles',
  '--nojekyll',
  '--message',
  'Deploy assignment cover generator',
]);

process.exit(publish.status ?? 1);
