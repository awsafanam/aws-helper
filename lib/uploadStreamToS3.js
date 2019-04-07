const { PassThrough } = require('readable-stream');
const AWS = require('aws-sdk');
const imageSize = require('probe-image-size');

function uploadStreamToS3({ bucket, folder, key, body, metadata }) {

  let fileKey;
  if(folder) {
    fileKey = `${folder}/${key}`;
  } else {
    fileKey = key
  }
  // eslint-disable-next-line max-statements
  return new Promise((resolve, reject) => {
    const parseStream = new PassThrough();
    const s3Stream = new PassThrough();
    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: bucket,
      Key: fileKey,
      Body: s3Stream,
      Metadata: metadata
    };
    const s3Options = {
      partSize: 5 * 1024 * 1024,
      queueSize: 1
    };
    let contentLength = 0;
    let dimensions;

    // Try to find dimensions of the image (if applicable)
    imageSize(parseStream)
      .then(({ width, height }) => {
        dimensions = {
          width,
          height
        };

        // Destroy the stream once we're done
        parseStream.destroy();
      })
      .catch(() => {
        // Destroy the stream once we're done
        parseStream.destroy();
      });

    // Send the original data to the two new streams while maintaining proper backpressure
    body.pipe(s3Stream);
    body.pipe(parseStream);

    s3.upload(s3Params, s3Options, (err) => {

      if (err) {
        return reject(err);
      }

      const output = {
        contentLength
      };

      if (dimensions) {
        output.dimensions = dimensions;
      }

      return resolve(output);
    })
    .on('httpUploadProgress', ({ total }) => {
      if (total) {
        contentLength = total;
      }
    });
  });
}

module.exports = uploadStreamToS3;
