const _ = require('lodash');
const AWS = require('aws-sdk');

function downloadFromS3({ bucket, folder, key }) {

  let fileKey;
  if(folder) {
    fileKey = `${folder}/${key}`;
  } else {
    fileKey = key
  }
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: bucket,
      Key: fileKey
    };
    s3.getObject(s3Params, (err, response) => {
      if(err) reject(err);
      else resolve({body: response.Body});
    });
  });
}

module.exports = downloadFromS3;
