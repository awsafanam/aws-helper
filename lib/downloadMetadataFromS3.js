const AWS = require('aws-sdk');

function downloadMetadataFromS3({ bucket, folder, key }) {

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

    s3.headObject(s3Params, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve({...data.Metadata, size: data.ContentLength});
    });
  });
}

module.exports = downloadMetadataFromS3;
