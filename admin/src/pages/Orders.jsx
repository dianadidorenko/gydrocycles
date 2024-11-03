import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package } from "lucide-react";

import { backendUrl, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Заказы</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid items-start grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_0.5fr] lg:grid-cols-[0.5fr_3fr_1fr_0.5fr] gap-x-[10px] gap-y-6 border-2 border-gray-200 p-4 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <Package size={40} />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} x {item.quantity}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} x {item.quantity}
                      </p>
                    );
                  }
                })}
              </div>

              <p className="text-sm sm:text-[15px] font-bold py-2">
                {order.amount} {currency}
              </p>

              <p className="my-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.city + ", " + order.address.country}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Товары: {order.items.length}
              </p>
              <p className="mt-3">Метод: {order.paymentMethod}</p>
              <p>Платеж: {order.payment ? "Оплачен" : "В процессе"}</p>
              <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="p-2 font-semibold border rounded"
            >
              <option value="Заказ размещен">Заказ размещен</option>
              <option value="Упаковывается">Упаковывается</option>
              <option value="Отгружается">Отгружается</option>
              <option value="Доставляется">Доставляется</option>
              <option value="Доставлен">Доставлен</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
