const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  validateFavoriteBody,
  isValidId,
  auth,
} = require("../../middlewares");
const schemas = require("../../models/contact");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, isValidId, ctrl.getById);

router.post("/", auth, validateBody(schemas.contactSchemaAdd), ctrl.add);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(schemas.contactSchemaUpdate),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", auth, isValidId, ctrl.remove);

module.exports = router;
