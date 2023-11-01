const asyncHandler = require("express-async-handler");
const { getCategories, patchCategories } = require("../models/categoryModels");

const allCategories = asyncHandler(async (req, res) => {
  const data = await getCategories();
  return res.status(200).json({
    status: 200,
    message: "All Categories:",
    data: data,
  });
});

const updateCategories = asyncHandler(async (req, res) => {
  const image = req.file;
  const response = await patchCategories(
    parseInt(req.params.id),
    image.filename
  );
  return res.status(200).json({
    status: 200,
    message: "asd",
    data: response,
  });
});

module.exports = {
  allCategories,
  updateCategories,
};
