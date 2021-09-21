import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export async function fetchString(client: S3Client, { Bucket, Key }: { Bucket: string; Key: string }) {
  return await client
    .send(new GetObjectCommand({ Bucket, Key }))
    .then(output => (output.Body == null ? '' : streamToString(output.Body as Readable)));
}

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}
