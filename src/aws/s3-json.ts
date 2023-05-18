// import S3, { GetObjectRequest } from 'aws-sdk/clients/s3';
//
// const staticBucket = new S3();
//
// export const getJson = async (req: GetObjectRequest) => {
//   // ContentType assertion can automatically convert data? (TODO: expr);
//   const response = await staticBucket.getObject({ ...req, ResponseContentType: 'application/json' }).promise();
//   try {
//     const text = response.Body!.toString('utf-8');
//     return JSON.parse(text);
//   } catch {
//     throw new Error(`${req.Key} 올바른 JSON 파일이 아닙니다.`);
//   }
// };
//
// export const setJson = async (options: { Bucket: string; Key: string }, object: any) => {
//   try {
//     await staticBucket
//       .putObject({
//         ...options,
//         Body: JSON.stringify(object),
//         ContentType: 'application/json',
//         ACL: 'public-read',
//       })
//       .promise();
//   } catch (e) {
//     throw new Error('failed to upload json to S3');
//   }
// };
