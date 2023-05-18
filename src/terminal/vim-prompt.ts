import * as tmp from 'tmp';
import * as fs from 'fs';
import execa from 'execa';
const JSON5 = require('json5');

export async function vimPrompt(data: any = {}): Promise<any> {
  const template = JSON.stringify(data, null, 2);
  const { name, removeCallback } = tmp.fileSync({ postfix: '.json' });
  try {
    fs.writeFileSync(name, template, { encoding: 'utf-8' });
    await execa('vi', [name], { stdio: 'inherit' });
    const result = fs.readFileSync(name, 'utf-8');
    return JSON5.parse(result);
  } finally {
    removeCallback();
  }
}
