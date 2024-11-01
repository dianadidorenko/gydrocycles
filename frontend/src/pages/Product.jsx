import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChartNoAxesColumn, Heart, Search, Star } from "lucide-react";

import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";
import PagesNav from "../components/PagesNav";
import { categoriesProductPage, storesInfoProductPage } from "../assets/assets";
import RelatedItems from "../components/RelatedItems";
import Stores from "../components/Stores";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [activeTab, setActiveTab] = useState(3);
  const [active, setActive] = useState(0);
  const tabs = ["Характеристики", "Наличие в магазине"];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [searched, setSearched] = useState(false);

  const { storeInfo = [] } = productData;

  // Функция для установки активного таба
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const fetchProductData = () => {
    const item = products.find((product) => product._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Фильтрация магазинов
  const handleSearch = () => {
    setSearched(true);

    if (searchTerm) {
      const filtered = storesInfoProductPage.filter((store) =>
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered || []);
    }
  };

  // console.log(productData);

  return productData ? (
    <div className="transition-opacity ease-in duration-500 opacity-100">
      <Container>
        <PagesNav title={productData.category} model={productData.name} />
        {/* Product Data */}
        <div className="flex gap-[50px] lg:gap-[100px] justify-between flex-col items-center md:flex-row pb-[80px] px-[10px]">
          {/* Product Image */}
          <div
            className={`flex flex-col gap-3 ${
              productData.promotionType ? "justify-between" : "justify-center"
            }`}
          >
            {productData.promotionType && (
              <div className="flex ">
                <p className="uppercase text-[12px] py-2 px-[20px] bg-accent text-white tracking-[3px]">
                  {productData.promotionType}
                </p>
                <p className="opacity-0">0</p>
              </div>
            )}

            <img
              src={image}
              alt={productData.name}
              className="w-[400px] lg:w-[500px]"
            />

            <div className="relative flex flex-col items-center">
              {productData.price && (
                <p className="text-[40px] font-bold">
                  {Number(productData.price).toLocaleString("ru-RU")} {currency}
                </p>
              )}

              {productData.priceStart && (
                <>
                  <p className="text-lightGray text-3xl relative z-1">
                    {Number(productData.priceStart).toLocaleString("ru-RU")}{" "}
                    {currency}
                  </p>
                  <hr className="absolute top-[20%] left-[20%] w-[50%] h-[6px] text-lightGray transform -rotate-12" />
                </>
              )}

              {productData.priceDiscount && (
                <p className="mt-5 text-[40px] font-bold">
                  {Number(productData.priceDiscount).toLocaleString("ru-RU")}
                  {currency}
                </p>
              )}

              <p className="text-accent text-[15px]">
                Нашли дешевле? Снизим цену!
              </p>
            </div>
          </div>
          {/* Product Info */}
          <div className="flex-1 gap-y-[10px] flex flex-col justify-center items-center md:justify-items-stretch md:items-stretch">
            <h1 className="font-bold text-[20px] text-center md:text-left md:text-[25px] mdLg:text-[30px] text-main pb-[10px]">
              {productData.name}
            </h1>

            <p className="text-[15px] text-lightGray">
              Код товара: {productData.code}
            </p>

            <div className="flex items-center gap-[25px] mt-[21px]">
              <Heart />
              <ChartNoAxesColumn />
              <div className="flex items-center gap-1">
                <Star fill="#1C62CD" color="#1C62CD" />
                <Star fill="#1C62CD" color="#1C62CD" />
                <Star fill="#1C62CD" color="#1C62CD" />
                <Star fill="#1C62CD" color="#1C62CD" />
                <Star color="#1C62CD" />
              </div>
            </div>

            <div className="hidden md:flex flex-col pt-[51px] pb-[45px]">
              <div className="flex flex-col gap-y-[10px] mdLg:flex-row justify-between pb-[25px]">
                {tabs.map((label, index) => {
                  const isActive = active === index;

                  return (
                    <div className="flex" key={index}>
                      <h2
                        key={label}
                        className={`text-[18px] lg:text-[20px] px-[5px] ${
                          isActive ? "font-bold relative" : "opacity-60"
                        }`}
                        onClick={() => setActive(index)}
                      >
                        {label}
                        {isActive && (
                          <span className="absolute w-full h-[3px] bg-accent bottom-[-5px] left-0"></span>
                        )}
                      </h2>
                    </div>
                  );
                })}
              </div>

              <div>
                <div
                  className={`flex text-[20px] gap-[10px] ${
                    active ? "hidden" : "flex flex-col"
                  }`}
                >
                  <div className="flex justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Производитель</p>
                    <p>{productData.country}</p>
                  </div>
                  <div className="flex justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Количество мест, шт.</p>
                    <p>{productData.seats}</p>
                  </div>
                  <div className="flex justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Мощность, л.с.</p>
                    <p>{productData.power}</p>
                  </div>
                  <div className="flex justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Тип двигателя</p>
                    <p>{productData.engineType}</p>
                  </div>
                  <div className="flex justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Год выпуска</p>
                    <p>{productData.year}</p>
                  </div>
                  <div className="flex">
                    <p className="text-accent text-[14px] relative">
                      Показать еще
                      <span className="absolute w-full h-[1px] bg-accent bottom-[0px] left-0"></span>
                    </p>
                  </div>
                </div>

                <div
                  className={`flex text-[20px] gap-[10px] ${
                    active ? "flex-col" : "hidden"
                  }`}
                >
                  {storesInfoProductPage.map((store) => {
                    const storeMatch = storeInfo.find(
                      (mongoStore) =>
                        mongoStore.storeNumber === parseInt(store.storeNumber)
                    );

                    return (
                      <div
                        key={store.storeNumber}
                        className="text-[16px] flex justify-between gap-[25px] items-center md:items-stretch text-center md:text-left md:justify-between flex-col md:flex-row py-[10px] border-b border-lightGray"
                      >
                        <span className="px-[5px]">{store.address}</span>
                        <span>
                          {storeMatch
                            ? storeMatch.availabilityQuantity + " шт."
                            : "0"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => addToCart(productData._id)}
                className="uppercase text-[14px] bg-accent text-white border-[3px] py-[16px] px-[53px] mt-[30px] md:mt-0"
              >
                Купить
              </button>
            </div>
          </div>
        </div>

        {/* Categories Menu & Tabs*/}
        <div>
          {/* Categories Menu */}
          <ul className="grid grid-cols-1 xs2:flex xs2:items-center justify-center flex-wrap md:justify-between gap-[10px] md:gap-0 bg-basic py-[23px] px-[10px] lg:px-[33px]">
            {categoriesProductPage.map((category, index) => (
              <li
                className="cursor-pointer"
                key={index}
                onClick={() => handleTabClick(index)}
              >
                <div className="flex">
                  <p
                    className={`text-[20px] text-gray-800 relative ${
                      activeTab === index ? "font-bold" : "opacity-60"
                    }`}
                  >
                    {category.category}
                    {activeTab === index && (
                      <span className="absolute left-0 right-0 bottom-[-5px] h-[2px] bg-accent" />
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Categories Tabs */}
          <div className="pt-[50px] pl-[10px] md:pl-[30px] pb-[100px] text-[15px] md:text-base">
            {activeTab === 0 && <div>Контент "О товаре"</div>}

            {activeTab === 1 && (
              <>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-col mx-auto text-[20px] gap-x-[20px] xs:gap-x-[70px] gap-y-[25px] pr-[38px]`}
                >
                  <div className="flex flex-col xs:flex-row gap-[10px] items-center justify-center sm:justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Производитель</p>
                    <p>{productData.country}</p>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-[10px] items-center justify-center sm:justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Количество мест, шт.</p>
                    <p>{productData.seats}</p>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-[10px] items-center justify-center sm:justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Мощность, л.с.</p>
                    <p>{productData.power}</p>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-[10px] items-center justify-center sm:justify-between border-b border-b-main/10 pb-[6px]">
                    <p>Тип двигателя</p>
                    <p>{productData.engine}</p>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-[10px] items-center justify-center sm:justify-between first-line:border-b border-b-main/10 pb-[6px]">
                    <p>Год выпуска</p>
                    <p>{productData.year}</p>
                  </div>
                </div>
                <div className="flex justify-center mt-[30px] pr-[38px]">
                  <p className="text-accent text-[14px] md:text-[16px] relative">
                    Показать еще
                    <span className="absolute w-full h-[1px] bg-accent bottom-[0px] left-0"></span>
                  </p>
                </div>
              </>
            )}

            {activeTab === 2 && <div>Контент "Отзывы"</div>}

            {activeTab === 3 && (
              <div className="flex flex-col pr-[10px] md:pr-[30px] lgXl:pr-0">
                <div className="flex flex-col mdLg:flex-row gap-y-[20px] items-center justify-between pr-[10px] mdLg:pr-[30px] lg:pr-[155px] mb-[50px]">
                  <div className="flex flex-col mdLg:flex-row items-center gap-[17px] opacity-70 text-[17px]">
                    Магазин
                    <div className="bg-basic p-[4px] flex justify-between items-center w-full rounded-[3px] pr-[5px]">
                      <input
                        type="text"
                        className="w-full bg-basic outline-none pl-[7px]"
                        placeholder="Введите название"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search
                        size={23}
                        onClick={handleSearch}
                        className="text-[#C4C4C4] hover:text-main cursor-pointer duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mdLg:flex-row items-center gap-[20px] mdLg:gap-[54px]">
                    <div className="flex items-center gap-[15px]">
                      <input type="checkbox" id="today" />
                      <label htmlFor="today" className="opacity-70 text-[17px]">
                        Забрать сегодня
                      </label>
                    </div>
                    <div className="flex items-center gap-[15px]">
                      <input type="checkbox" id="week" />
                      <label htmlFor="week" className="opacity-70 text-[17px]">
                        Забрать в течение недели
                      </label>
                    </div>
                  </div>
                </div>

                {/* Результаты поиска */}
                <h2 className="mb-[10px] font-bold text-center">
                  Результат поиска:
                </h2>
                {searched && (
                  <>
                    {filteredStores.length > 0 ? (
                      filteredStores.map((store, index) => {
                        // Находим информацию о наличии товара в текущем магазине
                        const storeAvailability = productData.storeInfo?.find(
                          (item) => item.storeNumber === store.storeNumber
                        );

                        return (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row justify-between items-center gap-[10px] bg-basic p-3 mb-[10px] border border-lightGray"
                          >
                            <p>{store.address}</p>
                            <div className="flex flex-col">
                              <p>{store.workingDaysName}</p>
                              <p>
                                {store.workingDays} {store.workingHours}
                              </p>
                              <p>
                                {store.weekendDays} {store.weekendHours}
                              </p>
                            </div>
                            <p>
                              {storeAvailability
                                ? storeAvailability.availabilityStore
                                : "Нет в наличии"}
                            </p>
                            <p>
                              {storeAvailability
                                ? storeAvailability.availabilityQuantity
                                : "0"}{" "}
                              шт.
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="border-b-2 border-b-basic p-3 font-bold">
                        Магазин не найдено
                      </p>
                    )}
                  </>
                )}

                <Stores
                  storesInfoProductPage={storesInfoProductPage}
                  productData={productData}
                />
              </div>
            )}

            {activeTab === 4 && <div>Контент "Доставка"</div>}

            {activeTab === 5 && <div>Контент "Сервис"</div>}

            {activeTab === 6 && <div>Контент "Гарантия"</div>}
          </div>
        </div>

        <RelatedItems />
      </Container>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
