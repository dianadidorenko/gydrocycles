import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Функция добавления товара
const addProduct = async (req, res) => {
  try {
    const { name } = req.body;

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

// function for updating product
const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const {
    name,
    code,
    price,
    priceStart,
    priceDiscount,
    category,
    subCategory,
    relation,
    country,
    seats,
    power,
    enginePower,
    engineType,
    maxSpeed,
    year,
    brand,
    model,
    availability,
    promotionType,
    popular,
    storeInfo,
  } = req.body;

  const existingProduct = await productModel.findById(productId);
  if (!existingProduct) {
    return res.status(404).json({ success: false, message: "Товар не найден" });
  }

  existingProduct.name = name;
  existingProduct.code = code;
  existingProduct.price = price;
  existingProduct.priceStart = priceStart;
  existingProduct.priceDiscount = priceDiscount;
  existingProduct.category = category;
  existingProduct.subCategory = subCategory;
  existingProduct.relation = JSON.parse(relation);
  existingProduct.country = country;
  existingProduct.seats = seats;
  existingProduct.power = power;
  existingProduct.enginePower = enginePower;
  existingProduct.engineType = engineType;
  existingProduct.maxSpeed = maxSpeed;
  existingProduct.year = year;
  existingProduct.brand = brand;
  existingProduct.model = model;
  existingProduct.availability = availability;
  existingProduct.promotionType = promotionType;
  existingProduct.popular = popular;
  existingProduct.storeInfo = JSON.parse(storeInfo);

  // const images = req.files;

  // if (images) {
  //   const updatedImages = await Promise.all(
  //     [images.image1, images.image2, images.image3, images.image4].map(
  //       async (file, index) => {
  //         if (file) {
  //           try {
  //             const result = await cloudinary.uploader.upload(file[0].path, {
  //               resource_type: "image",
  //             });
  //             return result.secure_url;
  //           } catch (uploadError) {
  //             console.error("Ошибка загрузки изображения:", uploadError);
  //             throw new Error("Ошибка загрузки изображения");
  //           }
  //         } else {
  //           return existingProduct.image[index];
  //         }
  //       }
  //     )
  //   );

  //   existingProduct.image = updatedImages.filter((url) => url !== undefined);

  // Обрабатываем изображения
  const images = req.files;
  if (images) {
    const updatedImages = await Promise.all(
      [images.image1, images.image2, images.image3, images.image4].map(
        async (file, index) => {
          if (file) {
            // Удаляем старое изображение из Cloudinary, если оно существует
            if (existingProduct.image[index]) {
              const publicId = getPublicIdFromUrl(existingProduct.image[index]);
              await cloudinary.uploader.destroy(publicId);
            }

            // Загружаем новое изображение
            try {
              const result = await cloudinary.uploader.upload(file[0].path, {
                resource_type: "image",
              });
              return result.secure_url;
            } catch (uploadError) {
              console.error("Ошибка загрузки изображения:", uploadError);
              throw new Error("Ошибка загрузки изображения");
            }
          } else {
            // Оставляем старое изображение, если новое не передано
            return existingProduct.image[index];
          }
        }
      )
    );

    existingProduct.image = updatedImages.filter((url) => url !== undefined);
  }

  await existingProduct.save();
  return res.status(200).json({ success: true, product: existingProduct });
};

// // function for removing product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (!product) {
      return res
        .status(404)
        .json({ succes: false, message: "Товар не найден" });
    }
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ succes: true, message: "Товар удалён" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// function for removing image
const removeImage = async (req, res) => {
  const { productId, imageUrl } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден" });
    }

    // Удаляем изображение из Cloudinary
    const publicId = imageUrl.split("/").pop().split(".")[0]; // извлекаем public_id
    await cloudinary.uploader.destroy(publicId);

    // Обновляем массив изображений в базе данных
    product.image = product.image.filter((img) => img !== imageUrl);
    await product.save();

    res.status(200).json({ success: true, message: "Изображение удалено" });
  } catch (error) {
    console.error("Ошибка удаления изображения:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка удаления изображения" });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ succes: false, message: "Товар не найден" });
    }

    res.json({ succes: true, product });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  updateProduct,
  removeProduct,
  removeImage,
  singleProduct,
};
