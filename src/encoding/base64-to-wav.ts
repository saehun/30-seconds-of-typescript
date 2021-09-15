import { PathLike } from 'fs';
import * as fs from 'fs/promises';

export async function base64ToWav(path: PathLike, data: string) {
  await fs.writeFile(path, Buffer.from(data, 'base64'));
}
