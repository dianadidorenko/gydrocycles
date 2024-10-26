import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";

const Orders = () => {
  const {
    // backendUrl, token,
    products,
    currency,
  } = useContext(ShopContext);

  //   const [orderData, setOrderData] = useState([]);

  //   const loadOrderData = async () => {
  //     try {
  //       if (!token) {
  //         return null;
  //       }

  //       const response = await axios.post(
  //         backendUrl + "/api/order/userorders",
  //         {},
  //         { headers: { token } }
  //       );

  //       if (response.data.success) {
  //         let allOredersItem = [];

  //         response.data.orders.map((order) => {
  //           order.items.map((item) => {
  //             item["status"] = order.status;
  //             item["payment"] = order.payment;
  //             item["paymentMethod"] = order.paymentMethod;
  //             item["date"] = order.date;
  //             allOredersItem.push(item);
  //           });
  //         });

  //         setOrderData(allOredersItem.reverse());
  //       }
  //     } catch (error) {}
  //   };

  //   useEffect(() => {
  //     loadOrderData();
  //   }, [token]);

  return (
    <Container>
      <div className="border-t- pt-16">
        <div className="text-2xl">
          <h2>Мои заказы</h2>
        </div>

        <div>
          {products.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image[0]}
                  className="w-16 sm:w-20"
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base">
                    <p className="text-lg">
                      {item.price} {currency}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-end">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  // onClick={loadOrderData}
                  className="bprder px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Отследить заказ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Orders;
