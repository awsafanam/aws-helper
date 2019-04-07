const AWS = require('aws-sdk');

function getResourceMetadata({ id, tableName, data }) {

  return new Promise((resolve, reject) => {
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const dbParams = {
      Key: { id },
      TableName: tableName,
      ReturnConsumedCapacity: 'NONE'
    };

    dbClient.get(dbParams, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (!data.Item) {
        return reject(new Error('No item was found.'));
      }

      return resolve(data.Item);
    });
  });
}

module.exports = getResourceMetadata;
