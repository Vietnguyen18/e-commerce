const e = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Cannot create new product",
  });
});

// Get Product
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});

// Get Products Filtering , sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  // Filtering
  const queries = { ...req.query }; // Destructure and copy query object
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((e) => delete queries[e]);

  // Format operators for Mongoose syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );
  const formattedQueries = JSON.parse(queryString);

  // Filter product
  if (queries?.title)
    formattedQueries.title = { $regex: queries.title, $options: "i" };
    if(queries?.category) formattedQueries.category = { $regex: queries.category, $options: 'i'}
  let queryCommand = Product.find(formattedQueries);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  //limit: số object lấy về 1 gọi api
  // skip: 2
  // 1 2 3 ... 10 (sẽ bỏ 2 số đầu)
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  try {
    const [products, counts] = await Promise.all([
      queryCommand.then((response) => response),
      Product.find(formattedQueries).countDocuments(),
    ]);

    res.status(200).json({
      success: products.length > 0,
      counts,
      products,
    });
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ success: false, message: "Failed to get products" });
  }
});

// Delete & Update
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    productData: updatedProduct ? updatedProduct : "Cannot updated Product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    productData: deletedProduct ? deletedProduct : "Cannot deleted Product",
  });
});

//Rating
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");
  const productRating = await Product.findById(pid);
  const alreadyRating = productRating?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  console.log(alreadyRating);
  if (alreadyRating) {
    //update star & comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    //add star & comment
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: { star, comment, postedBy: _id },
        },
      },
      { new: true }
    );
    console.log(response);
  }
  //Sum ratings
  const updatedProduct = await Product.findById(pid);
  const ratingsCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce((sum, e) => sum + e.star, 0);
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingsCount) / 10;
  await updatedProduct.save();

  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

// Images
const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((e) => e.path) } } },
    { new: true }
  );
  console.log(req.response);
  return res.status(200).json({
    status: true ? true : false,
    uploadImagesProduct: response ? response : "Cannot uploat images product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
