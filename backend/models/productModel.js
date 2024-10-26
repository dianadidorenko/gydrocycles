import mongoose from "mongoose";

const storeInfoSchema = new mongoose.Schema({
  storeNumber: { type: Number },
  availabilityStore: { type: String },
  availabilityQuantity: { type: Number },
});

const productSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  price: { type: Number },
  priceStart: { type: Number },
  priceDiscount: { type: Number },
  brand: { type: String },
  model: { type: String },
  availability: { type: String },
  promotionType: { type: String },
  category: { type: String },
  subCategory: { type: String },
  country: { type: String },
  seats: { type: Number },
  power: { type: Number },
  enginePower: { type: Number },
  engineType: { type: String },
  popular: { type: Boolean },
  maxSpeed: { type: Number },
  year: { type: Number },
  storeInfo: { type: [storeInfoSchema] },
  relation: { type: Array },
  image: { type: Array },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
