import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Функция добавления товара
const addProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      price,
      priceStart,
      priceDiscount,
      brand,
      model,
      availability,
      promotionType,
      category,
      subCategory,
      country,
      seats,
      power,
      enginePower,
      engineType,
      popular,
      maxSpeed,
      year,
      relation,
      storeInfo,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      code,
      price,
      priceStart,
      priceDiscount,
      brand,
      model,
      availability,
      promotionType,
      category,
      subCategory,
      country,
      seats,
      power,
      enginePower,
      engineType,
      popular: popular === "true" ? true : false,
      maxSpeed,
      year,
      relation: JSON.parse(relation || "[]"),
      storeInfo: JSON.parse(storeInfo || "[]"),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ succes: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

export default addProduct;

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ succes: true, products });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ succes: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.json({ succes: true, product });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
