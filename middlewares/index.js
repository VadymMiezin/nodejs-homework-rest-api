const { validateBody, validateFavoriteBody } = require("./validateBody");
const isValidId = require("./isValidId");
const auth = require("./auth");

module.exports = {
  validateBody,
  validateFavoriteBody,
  isValidId,
  auth,
};
