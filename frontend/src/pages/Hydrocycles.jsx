// import React, { useState } from "react";
// import { Dice4, List, ChevronDown, ChevronUp } from "lucide-react";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import PagesNav from "../components/PagesNav";
// import Container from "../components/Container";
// import { products } from "../assets/assets";
// import Card from "../components/Card";

// const Hydrocycles = () => {
//   const [tableView, setTableView] = useState("grid");

//   const [selectedSort, setSelectedSort] = useState("");
//   const [selectedPower, setSelectedPower] = useState("");
//   const [selectedEnginePower, setSelectedEnginePower] = useState("");
//   const [selectedMaxSpeed, setSelectedMaxSpeed] = useState("");
//   const [selectedPromotionType, setSelectedPromotionType] = useState("");

//   const [showAvailibity, setShowAvailibity] = useState(true);
//   const [showPrice, setShowPrice] = useState(true);
//   const [showBrand, setShowBrand] = useState(true);
//   const [showModel, setShowModel] = useState(true);
//   const [showCountry, setShowCountry] = useState(true);

//   const [showPromotions, setShowPromotions] = useState(true);
//   const [showMoreBrand, setShowMoreBrand] = useState(false);
//   const [showMoreModel, setShowMoreModel] = useState(false);
//   const [showMoreCountry, setShowMoreCountry] = useState(false);

//   const [priceRange, setPriceRange] = useState([100000, 500000]);

//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedModel, setSelectedModel] = useState([]);
//   const [selectedCountries, setSelectedCountries] = useState([]);

//   const handleSortChange = (e) => {
//     setSelectedSort(e.target.value);
//   };

//   //   Бренд
//   const getUniqueBrands = () => {
//     return [
//       ...new Set(
//         products
//           .filter((item) => item.category === "Гидроциклы")
//           .map((item) => item.brand)
//       ),
//     ];
//   };
//   const handleBrandChange = (brand) => {
//     setSelectedBrands((prevSelected) =>
//       prevSelected.includes(brand)
//         ? prevSelected.filter((b) => b !== brand)
//         : [...prevSelected, brand]
//     );
//   };
//   const uniqueBrands = getUniqueBrands();
//   const brandsToShow = showMoreBrand ? uniqueBrands : uniqueBrands.slice(0, 3);

//   //  Модель
//   const handleModelChange = (model) => {
//     setSelectedModel((prevSelected) =>
//       prevSelected.includes(model)
//         ? prevSelected.filter((b) => b !== model)
//         : [...prevSelected, model]
//     );
//   };
//   const getUniqueModels = () => {
//     return [
//       ...new Set(
//         products
//           .filter((item) => item.category === "Гидроциклы")
//           .map((item) => item.model)
//       ),
//     ];
//   };
//   const uniqueModels = getUniqueModels();
//   const modelsToShow = showMoreModel ? uniqueModels : uniqueModels.slice(0, 3);

//   // Акции
//   const getUniquePromotions = () => {
//     const promotions = products
//       .filter((item) => item.category === "Гидроциклы")
//       .map((item) => item.promotionType)
//       .filter((promotion) => promotion);

//     const uniquePromotions = Array.from(new Set(promotions));

//     return uniquePromotions;
//   };
//   const handlePromotionChange = (promotion) => {
//     setSelectedPromotionType((prevSelected) => {
//       if (prevSelected === promotion) {
//         return "";
//       }
//       return promotion;
//     });
//   };
//   const uniquePromotions = getUniquePromotions();

//   //   // Страна
//   const handleCountryChange = (country) => {
//     setSelectedCountries((prevSelected) =>
//       prevSelected.includes(country)
//         ? prevSelected.filter((b) => b !== country)
//         : [...prevSelected, country]
//     );
//   };
//   const getUniqueCountries = () => {
//     return [
//       ...new Set(
//         products
//           .filter((item) => item.category === "Гидроциклы")
//           .map((item) => item.country)
//       ),
//     ];
//   };
//   const uniqueCountries = getUniqueCountries();
//   const countriesToShow = showMoreCountry
//     ? uniqueCountries
//     : uniqueCountries.slice(0, 3);

//   const sortedProducts = products
//     .filter((item) => {
//       if (
//         (selectedSort === "По возрастанию" || selectedSort === "По убыванию") &&
//         item.availability === "Нет в наличии"
//       ) {
//         return false;
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       if (selectedSort === "По популярности") {
//         if (a.popularCategory && !b.popularCategory) return -1;
//         if (!a.popularCategory && b.popularCategory) return 1;
//         return 0;
//       }
//       if (selectedSort === "По возрастанию") {
//         return a.price - b.price;
//       }
//       if (selectedSort === "По убыванию") {
//         return b.price - a.price;
//       }
//       return 0;
//     });

//   const [filters, setFilters] = useState({
//     availability: "",
//   });

//   const handleFilterChange = (e) => {
//     const { value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       availability: value,
//     }));
//   };

//   const filteredProducts = sortedProducts.filter((item) => {
//     if (
//       filters.availability === "inStock" &&
//       item.availability !== "В наличии"
//     ) {
//       return false;
//     }
//     if (
//       filters.availability === "onOrder" &&
//       item.availability !== "Нет в наличии"
//     ) {
//       return false;
//     }

//     if (item.price < priceRange[0] || item.price > priceRange[1]) {
//       return false;
//     }

//     if (selectedPower && item.power !== Number(selectedPower)) {
//       return false;
//     }

//     if (
//       selectedEnginePower &&
//       item.enginePower !== Number(selectedEnginePower)
//     ) {
//       return false;
//     }

//     if (selectedMaxSpeed && item.maxSpeed !== Number(selectedMaxSpeed)) {
//       return false;
//     }

//     if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
//       return false;
//     }

//     if (selectedModel.length > 0 && !selectedModel.includes(item.model)) {
//       return false;
//     }

//     if (
//       selectedPromotionType.length > 0 &&
//       !selectedPromotionType.includes(item.promotionType)
//     ) {
//       return false;
//     }

//     if (
//       selectedCountries.length > 0 &&
//       !selectedCountries.includes(item.country)
//     ) {
//       return false;
//     }

//     return true;
//   });
//   return (
//     <section>
//       <Container>
//         <PagesNav title={"Квадроциклы"} />
//         <h1 className="text-main text-[30px] font-bold pb-[26px]">
//           Гидроциклы
//         </h1>
//         <div className="flex items-center justify-between text-[14px] text-main pb-[50px]">
//           <div className="flex gap-[8px]">
//             <p className="py-[4px] px-[22px] bg-basic cursor-pointer">
//               Полноприводные
//             </p>

//             <p className="py-[4px] px-[22px] bg-basic cursor-pointer">
//               от 5000
//             </p>
//             <p className="py-[4px] px-[22px] bg-basic cursor-pointer">BRP</p>
//             <p className="py-[4px] px-[22px] bg-basic cursor-pointer">еще</p>
//           </div>
//           <div className="flex items-center gap-[34px]">
//             <div className="relative w-64">
//               <select
//                 className="block w-full appearance-none placeholder:text-[14px] text-[14px] bg-white border border-[#D7D9DF] text-main py-[8px] pl-[20px] pr-[46px] outline-none"
//                 value={selectedSort}
//                 onChange={handleSortChange}
//               >
//                 <option value="" disabled hidden>
//                   Выберите сортировку
//                 </option>
//                 <option value="По популярности">По популярности</option>
//                 <option value="По убыванию">По убыванию</option>
//                 <option value="По возрастанию">По возрастанию</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#D7D9DF]" />
//             </div>
//             <div className="flex items-center gap-[10px]">
//               <Dice4
//                 size={26}
//                 onClick={() => setTableView("grid")}
//                 className={`${
//                   tableView === "grid" ? "opacity-100" : "opacity-50"
//                 }`}
//               />
//               <List
//                 size={26}
//                 onClick={() => setTableView("column")}
//                 className={`${
//                   tableView === "column" ? "opacity-100" : "opacity-50"
//                 }`}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center gap-[10px] pb-[77px]">
//           {/* Фильтр */}
//           <div className="flex flex-col max-w-[310px] gap-y-[41px] px-[10px]">
//             <div className="flex gap-10 flex-wrap uppercase font-bold">
//               <p>Параметры</p>
//               <p>По марке</p>
//             </div>

//             {/* Наличие */}
//             <div className="flex gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowAvailibity((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showAvailibity ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Наличие</p>
//               </div>

//               {showAvailibity && (
//                 <div className="flex items-center gap-6 flex-wrap">
//                   <div className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       id="inStock"
//                       name="availability"
//                       checked={filters.availability === "inStock"}
//                       onChange={() =>
//                         handleFilterChange({
//                           target: {
//                             value:
//                               filters.availability === "inStock"
//                                 ? ""
//                                 : "inStock",
//                           },
//                         })
//                       }
//                     />
//                     <label htmlFor="inStock">В наличии</label>
//                   </div>
//                   <div className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       id="onOrder"
//                       name="availability"
//                       checked={filters.availability === "onOrder"}
//                       onChange={() =>
//                         handleFilterChange({
//                           target: {
//                             value:
//                               filters.availability === "onOrder"
//                                 ? ""
//                                 : "onOrder",
//                           },
//                         })
//                       }
//                     />
//                     <label htmlFor="onOrder">Под заказ</label>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Цена */}
//             <div className="flex flex-col gap-[19px]">
//               <div
//                 onClick={() => setShowPrice((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showPrice ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Цена</p>
//               </div>

//               {showPrice && (
//                 <>
//                   <Slider
//                     range
//                     min={0}
//                     max={500000}
//                     value={priceRange}
//                     onChange={setPriceRange}
//                     allowCross={false}
//                   />
//                   <div className="flex justify-between">
//                     <span>от {priceRange[0]}</span>
//                     <span>до {priceRange[1]}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Мощность */}
//             <div className="flex gap-[19px] flex-col cursor-pointer">
//               <div className="flex items-center justify-between gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
//                 <p className="font-semibold text-main">Мощность, л.с.</p>
//                 <div className="relative w-[38px] border border-lightGray/20 rounded-md">
//                   <select
//                     className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
//                     value={selectedPower}
//                     onChange={(e) => setSelectedPower(e.target.value)}
//                   >
//                     <option value="" disabled hidden></option>
//                     {[
//                       ...new Set(
//                         products
//                           .map((item) => item.power)
//                           .filter((power) => power)
//                       ),
//                     ]
//                       .sort((a, b) => a - b)
//                       .map((power, index) => (
//                         <option key={index} value={power}>
//                           {power}
//                         </option>
//                       ))}
//                   </select>
//                   <ChevronDown
//                     size={16}
//                     className="absolute right-0 top-[57%] transform -translate-y-1/2 pointer-events-none text-[#6b6b6b]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Мощность двигателя */}
//             <div className="flex gap-[19px] flex-col cursor-pointer">
//               <div className="flex items-center justify-between gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
//                 <p className="font-semibold text-main">
//                   Мощность двигателя, л.с.
//                 </p>
//                 <div className="relative w-[38px] border border-lightGray/20 rounded-md">
//                   <select
//                     className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
//                     value={selectedEnginePower}
//                     onChange={(e) => setSelectedEnginePower(e.target.value)}
//                   >
//                     <option value="" disabled hidden></option>
//                     {Array.from(
//                       new Set(
//                         products
//                           .map((item) => item.enginePower)
//                           .filter(
//                             (power) => power !== undefined && power !== null
//                           )
//                       )
//                     )
//                       .sort((a, b) => a - b)
//                       .map((power, index) => (
//                         <option key={index} value={power}>
//                           {power}
//                         </option>
//                       ))}
//                   </select>
//                   <ChevronDown
//                     size={16}
//                     className="absolute right-0 top-[57%] transform -translate-y-1/2 pointer-events-none text-[#6b6b6b]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Макс.скорость */}
//             <div className="flex gap-[19px] flex-col cursor-pointer">
//               <div className="flex items-center justify-between gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
//                 <p className="font-semibold text-main">Макс.скорость</p>
//                 <div className="relative w-[38px] border border-lightGray/20 rounded-md">
//                   <select
//                     className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
//                     value={selectedMaxSpeed}
//                     onChange={(e) => setSelectedMaxSpeed(e.target.value)}
//                   >
//                     <option value="" disabled hidden></option>
//                     {Array.from(
//                       new Set(
//                         products
//                           .map((item) => item.maxSpeed)
//                           .filter(
//                             (speed) => speed !== undefined && speed !== null
//                           )
//                       )
//                     )
//                       .sort((a, b) => a - b)
//                       .map((speed, index) => (
//                         <option key={index} value={speed}>
//                           {speed}
//                         </option>
//                       ))}
//                   </select>
//                   <ChevronDown
//                     size={16}
//                     className="absolute right-0 top-[57%] transform -translate-y-1/2 pointer-events-none text-[#6b6b6b]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Бренд */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowBrand((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showBrand ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Бренд</p>
//               </div>

//               {showBrand && (
//                 <div className="grid grid-cols-2 gap-[20px]">
//                   {brandsToShow.map((brand, index) => (
//                     <div className="flex gap-2 items-center" key={index}>
//                       <input
//                         type="checkbox"
//                         checked={selectedBrands.includes(brand)}
//                         onChange={() => handleBrandChange(brand)}
//                       />
//                       <label className="text-[14px]">{brand}</label>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {uniqueBrands.length > 3 && !showMoreBrand && showBrand && (
//                 <button
//                   onClick={() => setShowMoreBrand(true)}
//                   className="mt-2 text-accent relative text-[14px]"
//                 >
//                   Показать еще
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                 </button>
//               )}

//               {showMoreBrand && uniqueBrands.length > 3 && showBrand && (
//                 <button
//                   onClick={() => setShowMoreBrand(false)}
//                   className="mt-2 text-accent relative text-[14px]"
//                 >
//                   Скрыть
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                 </button>
//               )}
//             </div>

//             {/* Модель */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowModel((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showModel ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Модель</p>
//               </div>

//               {showModel && (
//                 <div className="grid grid-cols-2 gap-[17px]">
//                   {modelsToShow.map((model, index) => (
//                     <div className="flex gap-2 items-center" key={index}>
//                       <input
//                         type="checkbox"
//                         checked={selectedModel.includes(model)}
//                         onChange={() => handleModelChange(model)}
//                       />
//                       <label className="text-[13px] text-nowrap">{model}</label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {uniqueModels.length > 3 && !showMoreModel && showModel && (
//                 <button
//                   onClick={() => setShowMoreModel(true)}
//                   className="mt-2 text-accent relative text-[14px]"
//                 >
//                   Показать еще
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                 </button>
//               )}
//               {showMoreModel && uniqueModels.length > 3 && showModel && (
//                 <button
//                   onClick={() => setShowMoreModel(false)}
//                   className="mt-2 text-accent relative text-[14px]"
//                 >
//                   Скрыть
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                 </button>
//               )}
//             </div>

//             {/* Акции */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowPromotions((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showPromotions ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Акции</p>
//               </div>

//               {showPromotions && (
//                 <div className="flex items-center justify-between gap-6 flex-wrap">
//                   {uniquePromotions.map((promotion, index) => (
//                     <div
//                       key={index}
//                       className={`flex gap-[10px] items-center cursor-pointer uppercase font-bold text-[12px] py-[7px] px-[15px] ${
//                         selectedPromotionType === promotion
//                           ? "bg-accent text-white"
//                           : "bg-basic text-lightGray"
//                       }`}
//                       onClick={() => handlePromotionChange(promotion)}
//                     >
//                       <span className="text-[14px]">{promotion}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Страна */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowCountry((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showCountry ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Страна</p>
//               </div>

//               {showCountry && (
//                 <div className="grid grid-cols-2 gap-[20px]">
//                   {countriesToShow.map((country, index) => (
//                     <div className="flex gap-2 items-center" key={index}>
//                       <input
//                         type="checkbox"
//                         checked={selectedCountries.includes(country)}
//                         onChange={() => handleCountryChange(country)}
//                       />
//                       <label className="text-[14px]">{country}</label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {uniqueCountries.length > 2 &&
//                 !showMoreCountry &&
//                 showCountry && (
//                   <button
//                     onClick={() => setShowMoreCountry(true)}
//                     className="mt-2 text-accent relative text-[14px]"
//                   >
//                     Показать еще
//                     <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                   </button>
//                 )}
//               {showMoreCountry && uniqueCountries.length > 2 && showCountry && (
//                 <button
//                   onClick={() => setShowMoreCountry(false)}
//                   className="mt-2 text-accent relative text-[14px]"
//                 >
//                   Скрыть
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                 </button>
//               )}
//             </div>

//             {/* Выбрать, сбросить */}
//             <div className="flex flex-col items-center gap-y-[15px]">
//               <div className="bg-[#F0F0F4] py-[16px] px-[85px] hover:bg-accent text-[#BDBEC2] hover:text-white duration-300 transition-all flex items-center justify-center cursor-pointer">
//                 <button className="uppercase text-[15px] tracking-[12%]">
//                   Выбрать
//                 </button>
//               </div>
//               <div className="flex items-center justify-center">
//                 <button className="relative text-[13px] text-lightGray">
//                   Сбросить фильтр
//                   <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-lightGray" />
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Каталог */}
//           <div
//             className={`gap-[30px] ${
//               tableView === "grid"
//                 ? "grid grid-cols-3"
//                 : "flex flex-col justify-start"
//             }`}
//           >
//             {filteredProducts.map((item, index) => {
//               if (item.category === "Гидроциклы") {
//                 return <Card item={item} key={index} />;
//               }
//             })}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };
// export default Hydrocycles;

////////////////
//  ^^^ рабочий нетронутый код
////////////////

import React, { useState } from "react";
import { Dice4, List, ChevronDown, ChevronUp } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import PagesNav from "../components/PagesNav";
import Container from "../components/Container";
import { products } from "../assets/assets";
import Card from "../components/Card";

const Hydrocycles = () => {
  // Состояния компонента
  const [tableView, setTableView] = useState("grid"); // Вид таблицы (сетка или столбец)
  const [selectedSort, setSelectedSort] = useState(""); // Выбранная сортировка
  const [selectedPower, setSelectedPower] = useState(""); // Выбранная мощность
  const [selectedEnginePower, setSelectedEnginePower] = useState(""); // Выбранная мощность двигателя
  const [selectedMaxSpeed, setSelectedMaxSpeed] = useState(""); // Выбранная максимальная скорость
  const [selectedBrands, setSelectedBrands] = useState([]); // Выбранные бренды
  const [selectedModel, setSelectedModel] = useState([]); // Выбранные модели
  const [selectedPromotionType, setSelectedPromotionType] = useState(""); // Выбранный тип акции
  const [selectedCountries, setSelectedCountries] = useState([]); // Выбранные страны
  const [showPromotionType, setShowPromotionType] = useState(true); // Показать типы акций
  const [showAvailibity, setShowAvailibity] = useState(true); // Показать наличие товаров

  const [showFilters, setShowFilters] = useState({
    brand: true,
    model: true,
    country: true,
  });

  // Состояние видимости фильтров
  const [showMore, setShowMore] = useState({
    brand: false,
    model: false,
    country: false,
  });

  // Показать больше значений в фильтрах
  const [showPrice, setShowPrice] = useState(true); // Показать фильтр по цене
  const [priceRange, setPriceRange] = useState([100000, 500000]); // Диапазон цен

  // Обработчик изменения сортировки
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  // Получение уникальных значений для фильтров
  const getUniqueValues = (key) => {
    return [
      ...new Set(
        products
          .filter(
            (item) =>
              item.category === "Гидроциклы" &&
              item[key] !== undefined &&
              item[key].trim() !== ""
          )
          .map((item) => item[key])
      ),
    ];
  };

  const uniquePromotions = getUniqueValues("promotionType"); // Уникальные акции

  // Обработчик изменения акции
  const handlePromotionChange = (promotion) => {
    setSelectedPromotionType((prev) => (prev === promotion ? "" : promotion));
  };

  // Обработчик изменения выбора фильтров
  const handleSelectionChange = (setter) => (value) => {
    setter(
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((v) => v !== value) // Удаление из выбранного
          : [...prevSelected, value] // Добавление в выбранное
    );
  };

  // Сортировка и фильтрация товаров
  const sortedProducts = products
    .filter((item) => {
      if (
        (selectedSort === "По возрастанию" || selectedSort === "По убыванию") &&
        item.availability === "Нет в наличии"
      ) {
        return false; // Исключение недоступных товаров при сортировке
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "По популярности") {
        return (a.popular ? -1 : 1) - (b.popular ? -1 : 1); // Сортировка по популярности
      }
      if (selectedSort === "По возрастанию") {
        return a.price - b.price; // Сортировка по возрастанию цены
      }
      if (selectedSort === "По убыванию") {
        return b.price - a.price; // Сортировка по убыванию цены
      }
      return 0; // Без сортировки
    });

  const [filters, setFilters] = useState({ availability: "" }); // Фильтры

  // Обработчик изменения фильтра
  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, availability: value }));
  };

  // Функция для создания фильтров
  const renderFilter = (label, selectedValue, setSelectedValue, key) => {
    const uniqueValues = Array.from(
      new Set(
        products
          .map((item) => item[key])
          .filter((value) => value !== undefined && value !== null)
      )
    ).sort((a, b) => a - b); // Уникальные значения для фильтра

    return (
      <div className="flex gap-[19px] flex-col cursor-pointer">
        <div className="flex items-center justify-between gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
          <p className="font-semibold text-main">{label}</p>
          <div className="relative w-[38px] border border-lightGray/20 rounded-md">
            <select
              className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {uniqueValues.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-0 top-[57%] transform -translate-y-1/2 pointer-events-none text-[#6b6b6b]"
            />
          </div>
        </div>
      </div>
    );
  };

  // Фильтрация продуктов
  const filteredProducts = sortedProducts.filter((item) => {
    if (
      filters.availability === "inStock" &&
      item.availability !== "В наличии"
    ) {
      return false; // Исключение товаров, которые не в наличии
    }
    if (
      filters.availability === "onOrder" &&
      item.availability !== "Нет в наличии"
    ) {
      return false; // Исключение товаров, которые не под заказ
    }
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false; // Исключение товаров вне диапазона цен
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
      return false; // Исключение товаров, которые не соответствуют выбранным брендам
    }
    if (selectedModel.length > 0 && !selectedModel.includes(item.model)) {
      return false; // Исключение товаров, которые не соответствуют выбранным моделям
    }
    if (selectedPower && item.power !== Number(selectedPower)) {
      return false; // Исключение товаров с неподходящей мощностью
    }
    if (
      selectedEnginePower &&
      item.enginePower !== Number(selectedEnginePower)
    ) {
      return false; // Исключение товаров с неподходящей мощностью двигателя
    }
    if (selectedMaxSpeed && item.maxSpeed !== Number(selectedMaxSpeed)) {
      return false; // Исключение товаров с неподходящей максимальной скоростью
    }
    if (selectedPromotionType && item.promotionType !== selectedPromotionType) {
      return false; // Исключение товаров без выбранного типа акции
    }
    if (
      selectedCountries.length > 0 &&
      !selectedCountries.includes(item.country)
    ) {
      return false; // Исключение товаров, которые не соответствуют выбранным странам
    }
    return true; // Товар соответствует всем фильтрам
  });

  // Функция для сброса всех фильтров
  const resetFilters = () => {
    setSelectedSort("");
    setSelectedPower("");
    setSelectedEnginePower("");
    setSelectedMaxSpeed("");
    setSelectedBrands([]);
    setSelectedModel([]);
    setSelectedPromotionType("");
    setSelectedCountries([]);
    setShowAvailibity(true);
    setPriceRange([100000, 500000]);
    setFilters({ availability: "" });
  };

  return (
    <section>
      <Container>
        <PagesNav title={"Квадроциклы"} />
        <h1 className="text-main text-[30px] font-bold pb-[26px] px-[10px]">
          Гидроциклы
        </h1>
        <div className="flex items-end justify-end text-[14px] text-main pb-[50px]">
          <div className="flex items-center gap-[34px] px-[10px]">
            <div className="relative w-64">
              <select
                className="block w-full appearance-none placeholder:text-[14px] text-[14px] bg-white border border-[#D7D9DF] text-main py-[8px] pl-[20px] pr-[46px] outline-none"
                value={selectedSort}
                onChange={handleSortChange}
              >
                <option value="" disabled hidden>
                  Выберите сортировку
                </option>
                <option value="По популярности">По популярности</option>
                <option value="По убыванию">По убыванию</option>
                <option value="По возрастанию">По возрастанию</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#D7D9DF]" />
            </div>
            <div className="flex items-center gap-[10px]">
              <Dice4
                size={26}
                onClick={() => setTableView("grid")}
                className={`${
                  tableView === "grid" ? "opacity-100" : "opacity-50"
                }`}
              />
              <List
                size={26}
                onClick={() => setTableView("column")}
                className={`${
                  tableView === "column" ? "opacity-100" : "opacity-50"
                }`}
              />
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between  px-[10px] ${
            tableView === "grid" ? "gap-[10px]" : "gap-[50px]"
          } pb-[77px]`}
        >
          {/* Фильтр */}
          <div className="flex flex-col max-w-[310px] gap-y-[41px] px-[10px]">
            <div className="flex items-center">
              <h2 className="uppercase font-bold relative tracking-[2px]">
                Параметры
                <span className="absolute left-0 right-0 bottom-[-5px] h-[2px] bg-accent" />
              </h2>
            </div>
            {/* Наличие */}
            <div className="flex gap-[19px] flex-col">
              <div
                // onClick={() => setShowAvailibity((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showAvailibity ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold">Наличие</p>
              </div>

              {showAvailibity && (
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="availability"
                      checked={filters.availability === "inStock"}
                      onChange={() =>
                        handleFilterChange({
                          target: {
                            value:
                              filters.availability === "inStock"
                                ? ""
                                : "inStock",
                          },
                        })
                      }
                    />
                    <label htmlFor="inStock">В наличии</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id="onOrder"
                      name="availability"
                      checked={filters.availability === "onOrder"}
                      onChange={() =>
                        handleFilterChange({
                          target: {
                            value:
                              filters.availability === "onOrder"
                                ? ""
                                : "onOrder",
                          },
                        })
                      }
                    />
                    <label htmlFor="onOrder">Под заказ</label>
                  </div>
                </div>
              )}
            </div>
            {/* Цена */}
            <div className="flex flex-col gap-[19px]">
              <div
                // onClick={() => setShowPrice((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showPrice ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold">Цена</p>
              </div>

              {showPrice && (
                <>
                  <Slider
                    range
                    min={0}
                    max={500000}
                    value={priceRange}
                    onChange={setPriceRange}
                    allowCross={false}
                  />
                  <div className="flex justify-between">
                    <span>от {priceRange[0]}</span>
                    <span>до {priceRange[1]}</span>
                  </div>
                </>
              )}
            </div>
            {/* Мощность, Мощность двигателя, Макс. скорость */}
            <div className="flex flex-col max-w-[310px] gap-y-[41px] px-[10px]">
              {renderFilter(
                "Мощность, л.с.",
                selectedPower,
                setSelectedPower,
                "power"
              )}
              {renderFilter(
                "Мощность двигателя, л.с.",
                selectedEnginePower,
                setSelectedEnginePower,
                "enginePower"
              )}
              {renderFilter(
                "Макс.скорость",
                selectedMaxSpeed,
                setSelectedMaxSpeed,
                "maxSpeed"
              )}
            </div>
            {/* Бренд, Модель, Страна */}
            {["brand", "model", "country"].map((filter) => (
              <div
                key={filter}
                className="flex items-start gap-[19px] flex-col"
              >
                <div className="flex items-center gap-[14px] cursor-pointer">
                  {showFilters[filter] ? (
                    <ChevronUp size={18} className="text-lightGray" />
                  ) : (
                    <ChevronDown size={18} className="text-lightGray" />
                  )}
                  <p className="font-semibold">
                    {filter === "brand"
                      ? "Бренд"
                      : filter === "model"
                      ? "Модель"
                      : "Страна"}
                  </p>
                </div>

                {showFilters[filter] && (
                  <div className="grid grid-cols-1 xsSmgrid-cols-2 gap-[20px]">
                    {(showMore[filter]
                      ? getUniqueValues(filter)
                      : getUniqueValues(filter).slice(0, 3)
                    ).map((item, index) => (
                      <div className="flex gap-2 items-center" key={index}>
                        <input
                          type="checkbox"
                          checked={
                            filter === "brand"
                              ? selectedBrands.includes(item)
                              : filter === "model"
                              ? selectedModel.includes(item)
                              : selectedCountries.includes(item)
                          }
                          onChange={() =>
                            handleSelectionChange(
                              filter === "brand"
                                ? setSelectedBrands
                                : filter === "model"
                                ? setSelectedModel
                                : setSelectedCountries
                            )(item)
                          }
                        />
                        <label className="text-[14px]">{item}</label>
                      </div>
                    ))}
                  </div>
                )}

                {getUniqueValues(filter).length > 3 && showFilters[filter] && (
                  <button
                    onClick={() =>
                      setShowMore((prev) => ({
                        ...prev,
                        [filter]: !prev[filter],
                      }))
                    }
                    className="mt-2 text-accent relative text-[14px]"
                  >
                    {showMore[filter] ? "Скрыть" : "Показать еще"}
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                  </button>
                )}
              </div>
            ))}
            {/* Акции */}
            <div className="flex items-start gap-[19px] flex-col">
              <div
                // onClick={() => setShowPromotionType((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showPromotionType ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold">Акции</p>
              </div>

              {showPromotionType && (
                <div className="flex items-start gap-3 xsSm:gap-6 flex-col xsSm:flex-row">
                  {uniquePromotions.map((promotion, index) => (
                    <div
                      key={index}
                      className={`flex gap-[10px] items-center cursor-pointer uppercase font-bold text-[12px] py-[7px] px-[15px] ${
                        selectedPromotionType === promotion
                          ? "bg-accent text-white"
                          : "bg-basic text-lightGray"
                      }`}
                      onClick={() => handlePromotionChange(promotion)}
                    >
                      <span className="text-[14px]">{promotion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Выбрать, сбросить */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={resetFilters}
                className="relative text-[13px] text-lightGray"
              >
                Сбросить фильтр
                <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-lightGray" />
              </button>
            </div>
          </div>
          {/* Каталог */}
          <div
            className={`gap-[30px] w-full ${
              tableView === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lgXl:grid-cols-3"
                : "flex flex-col justify-start"
            }`}
          >
            {filteredProducts.map(
              (item, index) =>
                item.category === "Гидроциклы" && (
                  <Card item={item} key={index} tableView={tableView} />
                )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hydrocycles;
