const AWS = require('aws-sdk');

function updateS3Metadata({ bucket, key, expires, metadata}) {

  const source = encodeURIComponent(bucket + '/' + key);
  
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const s3Params = {
      ACL: 'public-read',
      Bucket: bucket,
      Key: key,
      CacheControl: 'public, max-age=' + expires,
      CopySource: source,
      Metadata: metadata,
      MetadataDirective: 'REPLACE'
    };

    s3.copyObject(s3Params, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(metadata);
    });
  });
}

module.exports = updateS3Metadata;
