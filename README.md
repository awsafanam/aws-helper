# AWS Helper

A collection of common helper functions for AWS JS SDK.

## Functions
*  copyResourceMetadata
*  downloadFromS3
*  downloadStreamFromS3
*  downloadMetadataFromS3
*  getResourceMetadata
*  setResourceMetadata
*  updateResourceExpirationDateTime
*  uploadStreamToS3
*  updateS3Metadata

## Dependencies

The Image Resize Core is built using Node.js and various supporting packages:

* [aws-sdk](https://www.npmjs.org/package/aws-sdk) - The official AWS SDK is used for all interactions with DynamoDB, S3 and Lambda. Since images and archives are stored in S3, this is essentially used for every API request.
* [lodash](https://www.npmjs.org/package/lodash) - Lodash is a collection of helper methods which is primarily used for input validation as it has lots of tools for type validation.
* [probe-image-size](https://www.npmjs.org/package/probe-image-size) - Determines the width and height of an image. Used to provide the `dimensions` property on the /imageEditors and /images APIs.
* [readable-stream](https://www.npmjs.org/package/readable-stream) - Node.js streams, but in a module. This allows us to work with a consistent stream API (node.js 8 streams in this case) while in any node environment.
