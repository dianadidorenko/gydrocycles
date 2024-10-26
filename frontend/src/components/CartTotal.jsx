import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 text-sm mt-[30px]">
        <div className="flex justify-between">
          <p>Подитог</p>
          <p>
            {formatPrice(getCartAmount())}.00 {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Доставка</p>
          <p>
            {formatPrice(delivery_fee)}.00 {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Итого</b>
          <b>
            {formatPrice(getCartAmount()) === 0
              ? 0
              : formatPrice(getCartAmount() + delivery_fee)}
            .00 {currency}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
