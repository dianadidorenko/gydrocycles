import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   city: "",
  //   country: "",
  //   phone: "",
  // });

  // const onChageHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormData((data) => ({ ...data, [name]: value }));
  // };

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let orderItems = [];

  //     for (const items in cartItems) {
  //       for (const item in cartItems[items]) {
  //         if (cartItems[items][item] > 0) {
  //           const itemInfo = structuredClone(
  //             products.find((product) => product._id === items)
  //           );
  //           if (itemInfo) {
  //             itemInfo.size = item;
  //             itemInfo.quantity = cartItems[items][item];
  //             orderItems.push(itemInfo);
  //           }
  //         }
  //       }
  //     }

  //     let orderData = {
  //       address: formData,
  //       items: orderItems,
  //       amount: getCartAmount(),
  //     };

  //     switch (method) {
  //       // API calls for COD
  //       case "cod":
  //         const response = await axios.post(
  //           backendUrl + "/api/order/place",
  //           orderData,
  //           { headers: { token } }
  //         );

  //         if (response.data.success) {
  //           setCartItems({});
  //           navigate("/orders");
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //         break;

  //       case "stripe":
  //         const responseStripe = await axios.post(
  //           backendUrl + "/api/order/stripe",
  //           orderData,
  //           { headers: { token } }
  //         );

  //         if (responseStripe.data.success) {
  //           const { session_url } = responseStripe.data;
  //           window.location.replace(session_url);
  //         } else {
  //           toast.error(responseStripe.data.message);
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <Container>
      <form
        // onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
      >
        {/* --------- Left Side ---------  */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <h2>Информация о доставке</h2>
          <div className="flex gap-3">
            <input
              type="text"
              // onChange={onChageHandler}
              name="firstName"
              // value={formData.firstName}
              required
              placeholder="Имя"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              // onChange={onChageHandler}
              name="lastName"
              // value={formData.lastName}
              required
              placeholder="Фамилия"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            type="email"
            // onChange={onChageHandler}
            name="email"
            // value={formData.email}
            required
            placeholder="И-мейл"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <div className="flex gap-3">
            <input
              type="text"
              // onChange={onChageHandler}
              name="city"
              // value={formData.city}
              required
              placeholder="Город"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              // onChange={onChageHandler}
              name="country"
              // value={formData.country}
              required
              placeholder="Страна"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            type="number"
            // onChange={onChageHandler}
            name="phone"
            // value={formData.phone}
            required
            placeholder="Телефон"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/* --------- Right Side ---------  */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <h2>Метод оплаты</h2>
            {/* --------- Payment Method Selection--------- */}
            <div className="flex gap-3 flex-col xl:flex-row ">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  Наличными при доставке
                </p>
              </div>
            </div>

            <div className="w-full text-center mt-8">
              <button
                type="submit"
                onClick={() => navigate("/orders")}
                className="bg-accent text-white px-16 py-3 text-sm"
              >
                Разместить заказ
              </button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default PlaceOrder;
