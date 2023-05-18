// import { S3 } from 'aws-sdk';
declare const S3: any;

import axios, { AxiosResponse } from 'axios';
import { Stream, PassThrough } from 'stream';

const staticBucket = new S3();
const client = axios.create();

interface CopyFileArgument {
  fileUrl: string;
  fileName: string;
  bucket: string;
}

const uploadFromStream = (
  fileResponse: AxiosResponse,
  fileName: string,
  bucket: string
  // ): { passThrough: PassThrough; promise: Promise<S3.ManagedUpload.SendData> } => {
): { passThrough: PassThrough; promise: Promise<any> } => {
  const passThrough = new PassThrough();
  const promise = staticBucket
    .upload({
      Bucket: bucket,
      Key: fileName,
      ContentType: 'image/jpeg',
      ContentLength: fileResponse.headers['content-length'],
      ACL: 'public-read',
      Body: passThrough,
    })
    .promise();
  return { passThrough, promise };
};

const downloadFile = async (fileUrl: string): Promise<AxiosResponse<Stream>> => {
  return client.get(fileUrl, {
    responseType: 'stream',
  });
};

// Returns the location of file
export const passThroughS3 = async (args: CopyFileArgument): Promise<string> => {
  const responseStream = await downloadFile(args.fileUrl);

  const { passThrough, promise } = uploadFromStream(responseStream, args.fileName, args.bucket);

  responseStream.data.pipe(passThrough);

  return promise
    .then(result => {
      return result.Location;
    })
    .catch(e => {
      throw e;
    });
};
