import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Plus, CircleCheck } from "lucide-react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  assets,
  subCategoriesSelect,
  сategoriesSelect,
} from "../assets/assets";

const UpdateProduct = ({ token }) => {
  const { productId } = useParams();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [relation, setRelation] = useState([]);
  const [country, setCountry] = useState("");
  const [seats, setSeats] = useState("");
  const [power, setPower] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [engineType, setEngineType] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("");
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [availability, setAvailability] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [popular, setPopular] = useState(false);
  const [storeInfo, setStoreInfo] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          backendUrl + `/api/product/single/${productId}`,
          {
            headers: { token },
          }
        );

        if (response.data.succes || response.data.success) {
          const { product } = response.data;

          console.log(product);

          setImage1(product.image[0] || null);
          setImage2(product.image[1] || null);
          setImage3(product.image[2] || null);
          setImage4(product.image[3] || null);

          setName(product.name);
          setCode(product.code);
          setPrice(product.price);
          setPriceStart(product.priceStart);
          setPriceDiscount(product.priceDiscount);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setRelation(product.relation || []);
          setCountry(product.country);
          setSeats(product.seats);
          setPower(product.power);
          setEnginePower(product.enginePower);
          setEngineType(product.engineType);
          setMaxSpeed(product.maxSpeed);
          setYear(product.year);
          setBrand(product.brand);
          setModel(product.model);
          setAvailability(product.availability);
          setPromotionType(product.promotionType);
          setPopular(product.popular);
          setStoreInfo(product.storeInfo || []);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error(error.message);
      }
    };

    fetchProduct();
  }, [productId, token]);

  // Handle Store Changes
  const addStore = () => {
    setStoreInfo((prev) => [
      ...prev,
      { storeNumber: "", availabilityStore: "", availabilityQuantity: "" },
    ]);
  };

  const handleStoreChange = (index, field) => (e) => {
    const value = e.target.value;
    setStoreInfo((prevStoreInfo) => {
      const updatedStores = [...prevStoreInfo];
      updatedStores[index] = { ...updatedStores[index], [field]: value };
      return updatedStores;
    });
  };

  const removeStore = (index) => {
    const updatedStores = storeInfo.filter((_, i) => i !== index);
    setStoreInfo(updatedStores);
  };

  // Handle Image Changes
  const handleImageChange = (index) => (e) => {
    const file = e.target.files[0];
    // Обновляем состояние с новым файлом
    if (index === 0) {
      setImage1(file);
    } else if (index === 1) {
      setImage2(file);
    } else if (index === 2) {
      setImage3(file);
    } else if (index === 3) {
      setImage4(file);
    }
  };

  const handleImageRemove = async (index) => {
    const imageToRemove = [image1, image2, image3, image4][index];
    if (imageToRemove) {
      try {
        await axios.post(
          backendUrl + `/api/product/remove-image`,
          {
            productId,
            imageUrl: imageToRemove,
          },
          { headers: { token } }
        );

        // Удаление из состояния
        if (index === 0) setImage1(null);
        else if (index === 1) setImage2(null);
        else if (index === 2) setImage3(null);
        else if (index === 3) setImage4(null);
      } catch (error) {
        console.error("Ошибка при удалении изображения:", error);
      }
    }
  };

  // Handle Relation Changes
  const handleCheckboxChange = (category) => {
    setRelation((prevRelation) =>
      prevRelation.includes(category)
        ? prevRelation.filter((item) => item !== category)
        : [...prevRelation, category]
    );
  };

  // Submit Form
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (image1 instanceof File) formData.append("image1", image1);
      if (image2 instanceof File) formData.append("image2", image2);
      if (image3 instanceof File) formData.append("image3", image3);
      if (image4 instanceof File) formData.append("image4", image4);

      formData.append("name", name);
      formData.append("code", code);
      formData.append("price", price ? Number(price) : "");
      formData.append("priceStart", priceStart ? Number(priceStart) : "");
      formData.append(
        "priceDiscount",
        priceDiscount ? Number(priceDiscount) : ""
      );
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("relation", JSON.stringify(relation));
      formData.append("country", country);
      formData.append("seats", seats);
      formData.append("power", power);
      formData.append("enginePower", enginePower);
      formData.append("engineType", engineType);
      formData.append("maxSpeed", maxSpeed);
      formData.append("year", year);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("availability", availability);
      formData.append("promotionType", promotionType);
      formData.append("popular", popular);
      formData.append("storeInfo", JSON.stringify(storeInfo));

      const response = await axios.post(
        backendUrl + `/api/product/update/${productId}`,
        formData,
        { headers: { token } }
      );

      if (response.data.succes || response.data.success) {
        toast.success("Товар обновлен!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProduct}
      className="flex flex-col w-full items-start gap-3"
    >
      <h1 className="font-bold text-[20px] my-4 underline">
        Информация о товаре
      </h1>
      {/* Название */}
      <div className="w-full">
        <p className="mb-2">Название</p>
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px] resize-none whitespace-normal break-words"
          rows={3}
        />
      </div>
      {/* Код товара */}
      <div className="w-full">
        <p className="mb-2">Код товара</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
        />
      </div>
      {/* Цена, цена стартовая и цена со скидкой */}
      <div className="w-full flex-col md:flex-row flex gap-2">
        <div>
          <p className="mb-2">Цена</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div>
          <p className="mb-2">Стартовая цена</p>
          <input
            type="number"
            value={priceStart}
            onChange={(e) => setPriceStart(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div>
          <p className="mb-2">Цена со скидкой</p>
          <input
            type="number"
            value={priceDiscount}
            onChange={(e) => setPriceDiscount(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
      </div>
      {/* Фото товара */}
      <div className="flex flex-wrap gap-4 mb-4">
        {[image1, image2, image3, image4].map((image, index) => (
          <div key={index} className="relative">
            <label className="cursor-pointer">
              <img
                src={
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : image || assets.upload_area
                }
                className="w-20"
                alt={`upload-${index + 1}`}
              />
              <input type="file" onChange={handleImageChange(index)} hidden />
            </label>
            {image && (
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Категория и подкатегория товарв */}
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="w-full">
          <p className="mb-2">Категория</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-[5px] text-[14px]"
          >
            <option value="">Выберите категорию...</option>
            {сategoriesSelect.map((category, index) => (
              <option key={index} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <p className="mb-2">Подкатегория</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-[5px] text-[14px]"
          >
            <option value="">Выберите подкатегорию...</option>
            {subCategoriesSelect.map((subcategory, index) => (
              <option key={index} value={subcategory.category}>
                {subcategory.category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Сопутствующий товар  */}
      <div>
        <p className="my-2">Сопутствующая категория</p>
        <div className="w-full border p-3 rounded my-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {сategoriesSelect.map((category, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={relation.includes(category.category)}
                  onChange={() => handleCheckboxChange(category.category)}
                  className="w-[12px] h-[12px] cursor-pointer"
                />
                <span>{category.category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Страна и кол-во сидений */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full">
          <p className="mb-2">Страна</p>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Кол-во сидений</p>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
      </div>
      {/* Мощность, мощность двигателя */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full">
          <p className="mb-2">Мощность</p>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Мощность двигателя</p>
          <input
            type="number"
            value={enginePower}
            onChange={(e) => setEnginePower(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
      </div>
      {/* Тип двигателя, макс. скорость */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full">
          <p className="mb-2">Тип двигателя</p>
          <input
            type="text"
            value={engineType}
            onChange={(e) => setEngineType(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Макс. скорость</p>
          <input
            type="number"
            value={maxSpeed}
            onChange={(e) => setMaxSpeed(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
      </div>
      {/* Год, бренд, модель */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div>
          <p className="mb-2">Год</p>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div>
          <p className="mb-2">Бренд</p>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div>
          <p className="mb-2">Модель</p>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
      </div>
      {/* Наличие */}
      <div className="w-full">
        <p className="mb-2">Наличие</p>
        <input
          type="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
        />
      </div>
      {/* Тип промоакции (необязательно) */}
      <div className="w-full">
        <p className="mb-2">Тип промоакции</p>
        <input
          type="text"
          value={promotionType}
          onChange={(e) => setPromotionType(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
        />
      </div>
      {/* Популярный товар (необязательно) */}
      <div>
        <p className="mb-2">Популярный товар</p>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            className="w-[12px] h-[13px] border border-neutral-200 rounded-[5px]"
          />
          <label htmlFor="">Популярный</label>
        </div>
      </div>
      {/* Поля для информации о магазине */}
      <div>
        <h2 className="font-bold text-[18px] my-4 underline">
          Информация о наличии товара магазинах
        </h2>
        {storeInfo.map((store, index) => (
          <div key={index} className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Номер магазина"
              value={store.storeNumber}
              onChange={handleStoreChange(index, "storeNumber")}
              className="px-3 py-2 border border-neutral-200 rounded-[5px]"
            />
            <input
              type="text"
              placeholder="Доступность в магазине"
              value={store.availabilityStore}
              onChange={handleStoreChange(index, "availabilityStore")}
              className="px-3 py-2 border border-neutral-200 rounded-[5px]"
            />
            <input
              type="number"
              placeholder="Количество в наличии"
              value={store.availabilityQuantity}
              onChange={handleStoreChange(index, "availabilityQuantity")}
              className="px-3 py-2 border border-neutral-200 rounded-[5px"
            />
            <button
              type="button"
              onClick={() => removeStore(index)}
              className="py-2 mb-2 px-4 bg-red-700 text-white text-center flex gap-2 items-center rounded"
            >
              Удалить магазин
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStore}
          className="text-[15px] py-2 mt-4 px-4 bg-accent text-white rounded flex gap-2 items-center"
        >
          Добавить магазин <Plus size={18} />
        </button>
      </div>
      <button
        type="submit"
        className="py-2 mt-4 px-4 bg-accent text-white flex gap-2 items-center mx-auto rounded"
      >
        Обновить товар <CircleCheck />
      </button>
    </form>
  );
};

export default UpdateProduct;
