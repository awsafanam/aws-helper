const AWS = require('aws-sdk');

function setResourceMetadata({ id, tableName, data }) {

  return new Promise((resolve, reject) => {
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const dbParams = {
      Item: Object.assign({}, data, { id }),
      TableName: tableName,
      ReturnValues: 'NONE'
    };

    dbClient.put(dbParams, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

module.exports = setResourceMetadata;
