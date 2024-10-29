// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Plus, Trash, CircleCheck } from "lucide-react";

// import { backendUrl } from "../App";
// import {
//   assets,
//   subCategoriesSelect,
//   сategoriesSelect,
// } from "../assets/assets";

// const Add = ({ token }) => {
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [price, setPrice] = useState("");
//   const [priceStart, setPriceStart] = useState("");
//   const [priceDiscount, setPriceDiscount] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [promotionType, setPromotionType] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [country, setCountry] = useState("");
//   const [seats, setSeats] = useState("");
//   const [power, setPower] = useState("");
//   const [enginePower, setEnginePower] = useState("");
//   const [engineType, setEngineType] = useState("");
//   const [popular, setPopular] = useState(false);
//   const [maxSpeed, setMaxSpeed] = useState("");
//   const [year, setYear] = useState("");
//   const [storeInfo, setStoreInfo] = useState([]);
//   const [relation, setRelation] = useState([]);

//   const handleStoreChange = (index, field, value) => {
//     const updatedStoreInfo = [...storeInfo];
//     updatedStoreInfo[index][field] = value;
//     setStoreInfo(updatedStoreInfo);
//   };

//   const addStore = () => {
//     setStoreInfo([
//       ...storeInfo,
//       { storeNumber: "", availabilityStore: "", availabilityQuantity: 0 },
//     ]);
//   };

//   const removeStore = (index) => {
//     const updatedStoreInfo = storeInfo.filter((_, i) => i !== index);
//     setStoreInfo(updatedStoreInfo);
//   };

//   const handleCheckboxChange = (category) => {
//     setRelation(
//       (prevRelation) =>
//         prevRelation.includes(category)
//           ? prevRelation.filter((item) => item !== category) // Удаляем, если уже выбран
//           : [...prevRelation, category] // Добавляем, если еще не выбран
//     );
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("code", code);
//       formData.append("price", price);
//       formData.append("priceStart", priceStart);
//       formData.append("priceDiscount", priceDiscount);
//       formData.append("brand", brand);
//       formData.append("model", model);
//       formData.append("availability", availability);
//       formData.append("promotionType", promotionType);
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("country", country);
//       formData.append("seats", seats);
//       formData.append("power", power);
//       formData.append("enginePower", enginePower);
//       formData.append("engineType", engineType);
//       formData.append("popular", popular);
//       formData.append("maxSpeed", maxSpeed);
//       formData.append("year", year);
//       formData.append("storeInfo", JSON.stringify(storeInfo));
//       formData.append("relation", JSON.stringify(relation));

//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.succes) {
//         toast.success(response.data.message);
//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);
//         setName("");
//         setCode("");
//         setPrice("");
//         setPriceStart("");
//         setPriceDiscount("");
//         setBrand("");
//         setModel("");
//         setAvailability("");
//         setPromotionType("");
//         setCategory("");
//         setSubCategory("");
//         setCountry("");
//         setSeats("");
//         setPower("");
//         setEnginePower("");
//         setEngineType("");
//         setPopular(false);
//         setMaxSpeed("");
//         setYear("");
//         setStoreInfo([]);
//         setRelation([]);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col w-full items-start gap-3"
//     >
//       <h1 className="font-bold text-[20px] my-4 underline">
//         Информация о товаре
//       </h1>

//       {/* Название */}
//       <div className="w-full">
//         <p className="mb-2">Название</p>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//         />
//       </div>

//       {/* Код товара */}
//       <div className="w-full">
//         <p className="mb-2">Код товара</p>
//         <input
//           type="text"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//         />
//       </div>

//       {/* Цена, цена стартовая и цена со скидкой */}
//       <div className="w-full flex-col md:flex-row flex gap-2">
//         <div>
//           <p className="mb-2">Цена</p>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div>
//           <p className="mb-2">Стартовая цена</p>
//           <input
//             type="number"
//             value={priceStart}
//             onChange={(e) => setPriceStart(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div>
//           <p className="mb-2">Цена со скидкой</p>
//           <input
//             type="number"
//             value={priceDiscount}
//             onChange={(e) => setPriceDiscount(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//       </div>

//       {/* Фото товара */}
//       <div>
//         <p className="mb-2">Загрузить фото товара (от 1 до 4 шт.)</p>

//         <div className="flex gap-2">
//           <label htmlFor="image1">
//             <img
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               className="w-20 cursor-pointer"
//               alt="upload"
//             />
//             <input
//               type="file"
//               onChange={(e) => setImage1(e.target.files[0])}
//               id="image1"
//               hidden
//             />
//           </label>
//           <label htmlFor="image2">
//             <img
//               src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//               className="w-20 cursor-pointer"
//               alt="upload"
//             />
//             <input
//               type="file"
//               onChange={(e) => setImage2(e.target.files[0])}
//               id="image2"
//               hidden
//             />
//           </label>
//           <label htmlFor="image3">
//             <img
//               src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//               className="w-20 cursor-pointer"
//               alt="upload"
//             />
//             <input
//               type="file"
//               onChange={(e) => setImage3(e.target.files[0])}
//               id="image3"
//               hidden
//             />
//           </label>
//           <label htmlFor="image4">
//             <img
//               src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//               className="w-20 cursor-pointer"
//               alt="upload"
//             />
//             <input
//               type="file"
//               onChange={(e) => setImage4(e.target.files[0])}
//               id="image4"
//               hidden
//             />
//           </label>
//         </div>
//       </div>

//       {/* Категория и подкатегория товарв */}
//       <div className="flex flex-col md:flex-row w-full gap-4">
//         <div className="w-full">
//           <p className="mb-2">Категория</p>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-3 py-2 border border-neutral-200 rounded-[5px] text-[14px]"
//           >
//             <option value="">Выберите категорию...</option>
//             {сategoriesSelect.map((category, index) => (
//               <option key={index} value={category.category}>
//                 {category.category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-full">
//           <p className="mb-2">Подкатегория</p>
//           <select
//             value={subCategory}
//             onChange={(e) => setSubCategory(e.target.value)}
//             className="w-full px-3 py-2 border border-neutral-200 rounded-[5px] text-[14px]"
//           >
//             <option value="">Выберите подкатегорию...</option>
//             {subCategoriesSelect.map((subcategory, index) => (
//               <option key={index} value={subcategory.category}>
//                 {subcategory.category}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Сопутствующий товар  */}
//       <div>
//         <p className="my-2">Сопутствующая категория</p>
//         <div className="w-full border p-3 rounded my-4">
//           <div className="grid grid-cols-3 gap-3">
//             {сategoriesSelect.map((category, index) => (
//               <label key={index} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={relation.includes(category.category)}
//                   onChange={() => handleCheckboxChange(category.category)}
//                   className="w-[12px] h-[12px] cursor-pointer"
//                 />
//                 <span>{category.category}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Страна и кол-во сидений */}
//       <div className="w-full flex flex-col md:flex-row gap-2">
//         <div className="w-full">
//           <p className="mb-2">Страна</p>
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div className="w-full">
//           <p className="mb-2">Кол-во сидений</p>
//           <input
//             type="text"
//             value={seats}
//             onChange={(e) => setSeats(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//       </div>

//       {/* Мощность, мощность двигателя */}
//       <div className="w-full flex flex-col md:flex-row gap-2">
//         <div className="w-full">
//           <p className="mb-2">Мощность</p>
//           <input
//             type="text"
//             value={power}
//             onChange={(e) => setPower(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div className="w-full">
//           <p className="mb-2">Мощность двигателя</p>
//           <input
//             type="text"
//             value={enginePower}
//             onChange={(e) => setEnginePower(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//       </div>

//       {/* Тип двигателя, макс. скорость */}
//       <div className="w-full flex flex-col md:flex-row gap-2">
//         <div className="w-full">
//           <p className="mb-2">Тип двигателя</p>
//           <input
//             type="text"
//             value={engineType}
//             onChange={(e) => setEngineType(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div className="w-full">
//           <p className="mb-2">Макс. скорость</p>
//           <input
//             type="number"
//             value={maxSpeed}
//             onChange={(e) => setMaxSpeed(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//       </div>

//       {/* Год, бренд, модель */}
//       <div className="w-full flex flex-col md:flex-row gap-4">
//         <div>
//           <p className="mb-2">Год</p>
//           <input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div>
//           <p className="mb-2">Бренд</p>
//           <input
//             type="text"
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//         <div>
//           <p className="mb-2">Модель</p>
//           <input
//             type="text"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//           />
//         </div>
//       </div>

//       {/* Наличие */}
//       <div className="w-full">
//         <p className="mb-2">Наличие</p>
//         <input
//           type="text"
//           value={availability}
//           onChange={(e) => setAvailability(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//         />
//       </div>

//       {/* Тип промоакции (необязательно) */}
//       <div className="w-full">
//         <p className="mb-2">Тип промоакции</p>
//         <input
//           type="text"
//           value={promotionType}
//           onChange={(e) => setPromotionType(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
//         />
//       </div>

//       {/* Популярный товар (необязательно) */}
//       <div className="">
//         <p className="mb-2">Популярный товар</p>
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             value={popular}
//             onChange={(e) => setPopular(e.target.value)}
//             className="w-[12px] h-[13px] border border-neutral-200 rounded-[5px]"
//           />
//           <label htmlFor="">Популярный</label>
//         </div>
//       </div>

//       {/* Поля для информации о магазине */}
//       <div>
//         <h2 className="font-bold text-[18px] my-4 underline">
//           Информация о наличии товара магазинах
//         </h2>
//         {storeInfo.map((store, index) => (
//           <div key={index} className="w-full border p-3 rounded mb-3">
//             <div className="flex gap-2 flex-col lg:flex-row">
//               <div className="flex flex-col">
//                 <p className="mb-2">Номер магазина</p>
//                 <input
//                   type="text"
//                   value={store.storeNumber}
//                   onChange={(e) =>
//                     handleStoreChange(index, "storeNumber", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
//                 />
//               </div>
//               <div>
//                 <p className="mb-2">Доступность в магазине</p>
//                 <input
//                   type="text"
//                   value={store.availabilityStore}
//                   onChange={(e) =>
//                     handleStoreChange(
//                       index,
//                       "availabilityStore",
//                       e.target.value
//                     )
//                   }
//                   className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
//                 />
//               </div>
//               <div>
//                 <p className="mb-2">Количество на складе</p>
//                 <input
//                   type="text"
//                   value={store.availabilityQuantity}
//                   onChange={(e) =>
//                     handleStoreChange(
//                       index,
//                       "availabilityQuantity",
//                       e.target.value
//                     )
//                   }
//                   className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
//                 />
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() => removeStore(index)}
//               className="text-[15px] mt-4 px-3 py-1 bg-red-500 text-white rounded flex gap-2 items-center"
//             >
//               Удалить магазин <Trash size={18} />
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addStore}
//           className="text-[15px] px-3 py-1 bg-blue-500 text-white rounded flex gap-2 items-center"
//         >
//           Добавить магазин <Plus size={18} />
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="py-2 mt-4 px-4 bg-accent text-white flex gap-2 items-center mx-auto rounded"
//       >
//         Добавить товар <CircleCheck />
//       </button>
//     </form>
//   );
// };

// export default Add;

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, Trash, CircleCheck } from "lucide-react";

import { backendUrl } from "../App";
import {
  assets,
  subCategoriesSelect,
  сategoriesSelect,
} from "../assets/assets";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [availability, setAvailability] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [country, setCountry] = useState("");
  const [seats, setSeats] = useState("");
  const [power, setPower] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [engineType, setEngineType] = useState("");
  const [popular, setPopular] = useState(false);
  const [maxSpeed, setMaxSpeed] = useState("");
  const [year, setYear] = useState("");
  const [storeInfo, setStoreInfo] = useState([]);
  const [relation, setRelation] = useState([]);

  const handleStoreChange = (index, field, value) => {
    const updatedStoreInfo = [...storeInfo];
    updatedStoreInfo[index][field] = value;
    setStoreInfo(updatedStoreInfo);
  };

  const addStore = () => {
    setStoreInfo([
      ...storeInfo,
      { storeNumber: "", availabilityStore: "", availabilityQuantity: 0 },
    ]);
  };

  const removeStore = (index) => {
    const updatedStoreInfo = storeInfo.filter((_, i) => i !== index);
    setStoreInfo(updatedStoreInfo);
  };

  const handleCheckboxChange = (category) => {
    setRelation((prevRelation) =>
      prevRelation.includes(category)
        ? prevRelation.filter((item) => item !== category)
        : [...prevRelation, category]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("price", price);
      formData.append("priceStart", priceStart);
      formData.append("priceDiscount", priceDiscount);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("availability", availability);
      formData.append("promotionType", promotionType);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("country", country);
      formData.append("seats", seats);
      formData.append("power", power);
      formData.append("enginePower", enginePower);
      formData.append("engineType", engineType);
      formData.append("popular", popular);
      formData.append("maxSpeed", maxSpeed);
      formData.append("year", year);
      formData.append("storeInfo", JSON.stringify(storeInfo));
      formData.append("relation", JSON.stringify(relation));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.succes) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setCode("");
        setPrice("");
        setPriceStart("");
        setPriceDiscount("");
        setBrand("");
        setModel("");
        setAvailability("");
        setPromotionType("");
        setCategory("");
        setSubCategory("");
        setCountry("");
        setSeats("");
        setPower("");
        setEnginePower("");
        setEngineType("");
        setPopular(false);
        setMaxSpeed("");
        setYear("");
        setStoreInfo([]);
        setRelation([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <h1 className="font-bold text-[20px] my-4 underline">
        Информация о товаре
      </h1>

      {/* Название */}
      <div className="w-full">
        <p className="mb-2">Название</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
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
      <div>
        <p className="mb-2">Загрузить фото товара (от 1 до 4 шт.)</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              className="w-20 cursor-pointer"
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => setImage1(e.target.files[0])}
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              className="w-20 cursor-pointer"
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => setImage2(e.target.files[0])}
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              className="w-20 cursor-pointer"
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => setImage3(e.target.files[0])}
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              className="w-20 cursor-pointer"
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => setImage4(e.target.files[0])}
              id="image4"
              hidden
            />
          </label>
        </div>
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
        <div className="w-full border p-3 rounded my-4">
          <div className="grid grid-cols-3 gap-3">
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
            type="text"
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
            type="text"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border border-neutral-200 rounded-[5px]"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Мощность двигателя</p>
          <input
            type="text"
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
      <div className="">
        <p className="mb-2">Популярный товар</p>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            value={popular}
            onChange={(e) => setPopular(e.target.value)}
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
          <div key={index} className="w-full border p-3 rounded mb-3">
            <div className="flex gap-2 flex-col lg:flex-row">
              <div className="flex flex-col">
                <p className="mb-2">Номер магазина</p>
                <input
                  type="text"
                  value={store.storeNumber}
                  onChange={(e) =>
                    handleStoreChange(index, "storeNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
                />
              </div>
              <div>
                <p className="mb-2">Доступность в магазине</p>
                <input
                  type="text"
                  value={store.availabilityStore}
                  onChange={(e) =>
                    handleStoreChange(
                      index,
                      "availabilityStore",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
                />
              </div>
              <div>
                <p className="mb-2">Количество на складе</p>
                <input
                  type="text"
                  value={store.availabilityQuantity}
                  onChange={(e) =>
                    handleStoreChange(
                      index,
                      "availabilityQuantity",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-neutral-200 rounded-[5px]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeStore(index)}
              className="text-[15px] mt-4 px-3 py-1 bg-red-500 text-white rounded flex gap-2 items-center"
            >
              Удалить магазин <Trash size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStore}
          className="text-[15px] px-3 py-1 bg-blue-500 text-white rounded flex gap-2 items-center"
        >
          Добавить магазин <Plus size={18} />
        </button>
      </div>

      <button
        type="submit"
        className="py-2 mt-4 px-4 bg-accent text-white flex gap-2 items-center mx-auto rounded"
      >
        Добавить товар <CircleCheck />
      </button>
    </form>
  );
};

export default Add;
