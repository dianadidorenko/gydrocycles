import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.succes) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        {
          id,
        },
        { headers: { token } }
      );

      if (response.data.succes) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Список товаров</p>
      <div className="flex flex-col gap-2">
        {/* --------- List Table Title ---------  */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Фото</b>
          <b>Название</b>
          <b>Категория</b>
          <b>Цена</b>
          <b className="text-center">Действие</b>
        </div>
        {/* ---------Product List ---------  */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item.image[0]} className="w-14" alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category || item.subCategory}</p>
            <p>
              {item.price || item.priceDiscount}
              {currency}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-md border rounded-full w-[30px] mx-auto hover:border-accent duration-300"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
