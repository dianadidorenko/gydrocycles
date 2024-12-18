import { useContext, useEffect, useState } from "react";
import { Trash } from "lucide-react";

import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.keys(cartItems)
        .map((itemId) => ({
          _id: itemId,
          quantity: cartItems[itemId]?.quantity || 0,
        }))
        .filter((item) => item.quantity > 0);
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "UAH",
    }).format(price);
  };

  return (
    <div className="py-[80px] px-[20px] lg:px-0">
      <Container>
        <h1 className="text-[20px] md:text-3xl mb-5">Ваша корзина</h1>
        <div>
          {cartData.length > 0 ? (
            cartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={item._id}
                  className="py-4 border-b text-main flex flex-col mdLg:flex-row justify-between items-center gap-10 mdlg:gap-4"
                >
                  <div className="flex flex-col items-center mdLg:items-start mdLg:flex-row gap-6">
                    <img
                      src={productData.image[0]}
                      className="max-w-[200px]"
                      alt={productData.name}
                    />
                    <div className="flex flex-col items-center mdLg:items-start gap-2">
                      <p className="text-[18px] md:text-[20px] font-medium text-center xsSm:text-left">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[25px]">
                        <p className="font-bold">
                          {formatPrice(productData.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(1, Number(e.target.value));
                      // Убедитесь, что newQuantity не NaN
                      if (!isNaN(newQuantity)) {
                        updateQuantity(item._id, newQuantity);
                      }
                    }}
                  />
                  <Trash
                    onClick={() => updateQuantity(item._id, 0)}
                    className="color-[#c9c9c9] hover:text-accent duration-300 cursor-pointer"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center py-8">
              <p>Ваша корзина пуста</p>
            </div>
          )}
        </div>

        {cartData.length > 0 && (
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end mt-[20px]">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-accent text-white px-[20px] py-[10px] uppercase"
                >
                  Перейти к оплате
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
