const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  validateFavoriteBody,
  isValidId,
} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.contactSchemaAdd), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactSchemaUpdate),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
