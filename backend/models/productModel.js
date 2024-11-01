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
  category: { type: String },
  subCategory: { type: String },
  relation: { type: Array },
  country: { type: String },
  seats: { type: String },
  power: { type: String },
  enginePower: { type: String },
  engineType: { type: String },
  maxSpeed: { type: String },
  year: { type: String },
  brand: { type: String },
  model: { type: String },
  availability: { type: String },
  promotionType: { type: String },
  popular: { type: Boolean },
  storeInfo: { type: [storeInfoSchema] },
  image: { type: [String] },
  date: { type: Number, required: true },
});
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
