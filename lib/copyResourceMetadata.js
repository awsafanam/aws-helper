const getResourceMetadata = require('./getResourceMetadata.js');
const setResourceMetadata = require('./setResourceMetadata.js');

function copyResourceMetadata({ sourceImageId, destImageId, tableName }) {
  return getResourceMetadata({
    id: sourceImageId,
    tableName
  })
    .then((data) => setResourceMetadata({
      id: destImageId,
      data,
      tableName
    }));
}

module.exports = copyResourceMetadata;
