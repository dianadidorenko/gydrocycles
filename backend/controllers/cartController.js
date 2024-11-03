import userModel from "../models/userModel.js";

// function for add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = { quantity: quantity || 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData;

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = { quantity };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

// function for get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
