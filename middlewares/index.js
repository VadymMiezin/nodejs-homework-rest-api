const { validateBody, validateFavoriteBody } = require("./validateBody");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  validateBody,
  validateFavoriteBody,
  isValidId,
  auth,
  upload,
};
