const copyResourceMetadata = require('./lib/copyResourceMetadata.js');
const downloadFromS3 = require('./lib/downloadFromS3.js');
const downloadStreamFromS3 = require('./lib/downloadStreamFromS3.js');
const downloadMetadataFromS3 = require('./lib/downloadMetadataFromS3.js');
const getResourceMetadata = require('./lib/getResourceMetadata.js');
const setResourceMetadata = require('./lib/setResourceMetadata.js');
const updateResourceExpirationDateTime = require('./lib/updateResourceExpirationDateTime.js');
const uploadStreamToS3 = require('./lib/uploadStreamToS3.js');
const updateS3Metadata = require('./lib/updateS3Metadata.js');

module.exports = {
  copyResourceMetadata,
  downloadFromS3,
  downloadStreamFromS3,
  downloadMetadataFromS3,
  getResourceMetadata,
  setResourceMetadata,
  updateResourceExpirationDateTime,
  uploadStreamToS3,
  updateS3Metadata
};
