import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Pencil, Trash } from "lucide-react";

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
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } }
        );
        if (response.data.succes) {
          toast.success(response.data.message);
          fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка удаления товара");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const navigate = useNavigate();

  const getProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/single/${productId}`
      );
      if (response.data.succes) {
        navigate(`/product/update/${productId}`, {
          state: { product: response.data.product },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка загрузки товара");
    }
  };

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
            <div className="flex items-center justify-center">
              <p
                onClick={() => removeProduct(item._id)}
                className="p-1 flex items-center justify-center text-right md:text-center cursor-pointer text-md border rounded-full w-[30px] mx-auto hover:border-accent duration-300"
              >
                <Trash size={16} />
              </p>
              <p
                onClick={() => getProduct(item._id)}
                className="p-1 flex items-center justify-center text-right md:text-center cursor-pointer text-md border rounded-full w-[30px] mx-auto hover:border-accent duration-300"
              >
                <Pencil size={16} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
