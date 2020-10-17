import { DynamoDB } from 'aws-sdk';
import { formatISO } from 'date-fns';

export const scan = async (params: DynamoDB.ScanInput): Promise<DynamoDB.ScanOutput> =>
  new Promise((resolve, reject) => {
    const dynamoDB = new DynamoDB({
      region: 'ap-northeast-2',
    });
    dynamoDB.scan(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

export const updateItem = async (params: DynamoDB.UpdateItemInput): Promise<DynamoDB.UpdateItemOutput> =>
  new Promise((resolve, reject) => {
    const dynamoDB = new DynamoDB({
      region: 'ap-northeast-2',
    });
    dynamoDB.updateItem(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

/* batch update test
(async (): Promise<void> => {
  const { Items } = await scan({
    TableName: 'post',
    ExpressionAttributeNames: {
      '#ID': 'id',
      '#UID': 'userId',
    },
    ProjectionExpression: '#ID, #UID',
  });

  for (const item of Items) {
    const id = item.id.S;
    const userId = item.userId.S;
    const result = await updateItem({
      TableName: 'post',
      ExpressionAttributeNames: {
        '#D': 'date',
      },
      ExpressionAttributeValues: {
        ':d': {
          S: formatISO(new Date(Number(id.split('-')[0])), { representation: 'date' }),
        },
      },
      Key: {
        userId: {
          S: userId,
        },
        id: {
          S: id,
        },
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #D = :d',
    });
  }
})();
*/
