const _ = require('lodash');
const AWS = require('aws-sdk');

function downloadStreamFromS3({ bucket, folder, key }) {

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
    const request = s3.getObject(s3Params);
    const body = request.createReadStream();

    // Listen to errors on the stream to prevent AWS from rethrowing it
    body.on('error', (err) => reject(err));

    request.on('error', (err, { error }) => reject(error || err));
    request.on('httpHeaders', (statusCode, headers) => {
      const metadata = _.reduce(headers, (memo, value, prop) => {

        // Extract meta headers
        if (prop.startsWith('x-amz-meta-')) {
          return Object.assign(memo, {
            [prop.replace('x-amz-meta-', '')]: value
          });
        }

        // Ignore all other headers
        return memo;
      }, {});

      if (statusCode === 200) {
        resolve({
          metadata,
          body
        });
      } else {
        const err = new Error(`S3 responded with a ${statusCode} status code`);

        err.statusCode = statusCode;

        reject(err);
      }
    });
  });
}

module.exports = downloadStreamFromS3;
