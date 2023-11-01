const {
  getAllProducts,
  getVendorProducts,
  postProduct,
  putProduct,
  getProductById,
  deleteProductModel,
} = require("../models/productModels");
const asyncHandler = require("express-async-handler");

const allProducts = asyncHandler(async (req, res) => {
  const id = req.id;
  const role = req.role;
  if (role === 1) {
    const result = await getAllProducts();
    return res.status(200).json({
      status: 200,
      message: "All products:",
      data: result,
    });
  }
  const result = await getVendorProducts(id);
  return res.status(200).json({
    status: 200,
    message: "Your products:",
    data: result,
  });
});

const productById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await getProductById(id);
  return res.status(200).json({
    status: 200,
    message: `Product details having id: ${id}`,
    data: result,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const id = req.id;
  const role = req.role;
  const image = req.file;

  if (role !== 2) {
    return res.status(401).json({
      status: 403,
      message: "Your are not authorized to view this page",
    });
  }
  const data = {
    product_name: req.body.product_name,
    product_price: parseInt(req.body.product_price),
    product_image: req.file.filename,
    product_description: req.body.product_description,
    vendor_id: id,
  };

  const result = await postProduct(data);
  return res.status(200).json({
    status: 200,
    message: "Product created successfully!",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const vendor_id = req.id;
  const image = req.file;

  const product = await getProductById(id);

  if (Object.keys(product).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Product not available",
    });
  }

  if (product.vendor_id !== req.id) {
    return res.status(400).json({
      status: 400,
      message: "Not your product",
    });
  }

  const data = {
    product_name: req.body.product_name
      ? req.body.product_name
      : product.product_name,
    product_price: req.body.product_price
      ? req.body.product_price
      : product.product_price,
    product_image: image ? image.filename : product.product_image,
    product_description: req.body.product_description
      ? req.body.product_description
      : product.product_description,
  };

  const result = await putProduct(id, vendor_id, data);
  return res.status(200).json({
    status: 200,
    message: "Product details updated successfully!",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await getProductById(id);

  if (Object.keys(product).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "Product not available",
    });
  }

  if (product.vendor_id !== req.id) {
    return res.status(400).json({
      status: 400,
      message: "Not your product",
    });
  }

  const result = await deleteProductModel(id);
  return res.status(200).json({
    status: 200,
    message: "Product deleted successfully",
  });
});

module.exports = {
  allProducts,
  createProduct,
  updateProduct,
  productById,
  deleteProduct,
};
