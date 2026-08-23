import { createRequire } from 'node:module';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
require('reflect-metadata');
const JavaScriptObfuscator = require('javascript-obfuscator');

const dir = fileURLToPath(new URL('../dist/assets/', import.meta.url));

const options = {
  compact: true,
  simplify: true,
  identifierNamesGenerator: 'hexadecimal',
  stringArray: true,
  stringArrayThreshold: 1,
  stringArrayEncoding: ['base64'],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  splitStrings: true,
  splitStringsChunkLength: 6,
  transformObjectKeys: true,
  numbersToExpressions: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  renameGlobals: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  target: 'browser'
};

for (const file of readdirSync(dir)) {
  if (!file.endsWith('.js')) continue;
  const path = `${dir}${file}`;
  const source = readFileSync(path, 'utf8');
  const code = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode();
  writeFileSync(path, code);
  console.log(`obfuscado: ${file}`);
}
