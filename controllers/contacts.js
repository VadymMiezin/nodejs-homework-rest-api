const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  console.log(favorite);
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner, favorite: favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name");

  res.json(contacts);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.findById(
    { owner },
    req.params.contactId,
    "-createdAt -updatedAt"
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const { email, phone } = req.body;
  const contactEmail = await Contact.findOne({ email });
  const contactPhone = await Contact.findOne({ phone });

  if (contactEmail) {
    throw HttpError(409, `Contact with email ${email} already exists`);
  }
  if (contactPhone) {
    throw HttpError(409, `Contact with number ${phone} already exists`);
  }

  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  if (!newContact) {
    throw HttpError(404, "Unable to add contact");
  }

  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(result);
};

const updateFavorite = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
