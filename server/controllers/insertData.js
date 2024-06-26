const Product = require('../models/product');
const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');
const data = require('../../data/data2.json');
const slugify = require('slugify')
const categoryData = require('../../data/cate_brand');


const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.random().toString(36).split(2, 9),
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random()*5)
  });
}; 


const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json('Done');
});

// chen data cho productCategory
  const fn2 = asyncHandler(async (cate) => {
    await ProductCategory.create({
      title: cate?.cate,
      brand: cate?.brand,
    })
  })

  const insertProductCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let cate of categoryData) promises.push(fn2(cate));
    await Promise.all(promises);
    return res.json('Done');

});




module.exports = {
  insertProduct,
  insertProductCategory
};
