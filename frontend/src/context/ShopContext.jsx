import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₴";
  const delivery_fee = 10500;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();


  const addToCart = async (itemId) => {
    if (!itemId) {
      toast.error("Select Product");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = { quantity: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, quantity: cartData[itemId].quantity },
          { headers: { token } }
        );
        toast.success("Товар добавлен в корзину");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = { ...cartData[itemId], quantity };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            quantity,
          },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        const quantity = cartItems[itemId].quantity || 0;
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.succes) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  // const makeFavorite = async (itemId) => {
  //   if (!itemId) {
  //     toast.error("Выберите товар");
  //     return;
  //   }

  //   if (token) {
  //     try {
  //       await axios.post(
  //         backendUrl + "/api/user/makeFavorite",
  //         { itemId },
  //         { headers: { token } }
  //       );
  //       toast.success("Товар добавлен в избранное");
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Ошибка добавления в избранное");
  //     }
  //   } else {
  //     toast.error("Необходимо войти в систему");
  //   }
  // };

  const makeFavorite = async (itemId, isFavorite) => {
    if (!itemId) {
      toast.error("Выберите товар");
      return;
    }

    if (token) {
      try {
        const endpoint = isFavorite
          ? "/api/user/removeFavorite"
          : "/api/user/makeFavorite";
        await axios.post(
          backendUrl + endpoint,
          { itemId },
          { headers: { token } }
        );

        if (isFavorite) {
          toast.success("Товар удален из избранного");
          setFavorites((prev) => prev.filter((id) => id !== itemId));
        } else {
          toast.success("Товар добавлен в избранное");
          setFavorites((prev) => [...prev, itemId]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Ошибка при изменении статуса товара в избранном");
      }
    } else {
      toast.error("Необходимо войти в систему");
    }
  };

  const listOfFavorites = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(
          backendUrl + "/api/user/listOfFavorites",
          { headers: { token } }
        );

        if (response.data.success) {
          return response.data.favorites;
        } else {
          toast.error(
            "Ошибка при получении избранного: " + response.data.message
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Ошибка при получении избранного: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    } else {
      toast.error("Необходимо войти в систему");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    makeFavorite,
    listOfFavorites,
    favorites,
    setFavorites,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
