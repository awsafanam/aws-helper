const AWS = require('aws-sdk');

function updateResourceExpirationDateTime({ id, tableName, expirationDateTime }) {

  return new Promise((resolve, reject) => {
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const dbParams = {
      Key: { id },
      TableName: tableName,
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: 'SET expirationDateTime = :expiration',
      ExpressionAttributeValues: {
        ':expiration': expirationDateTime
      }
    };

    dbClient.update(dbParams, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

module.exports = updateResourceExpirationDateTime;
