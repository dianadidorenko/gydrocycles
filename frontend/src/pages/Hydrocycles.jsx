import React, { useState } from "react";
import { Dice4, List, ChevronDown, ChevronUp } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import PagesNav from "../components/PagesNav";
import Container from "../components/Container";
import { products } from "../assets/assets";
import Card from "../components/Card";

const Hydrocycles = () => {
  const [tableView, setTableView] = useState("grid");

  const [selectedSort, setSelectedSort] = useState("");
  const [selectedPower, setSelectedPower] = useState("");
  const [selectedEnginePower, setSelectedEnginePower] = useState("");
  const [selectedMaxSpeed, setSelectedMaxSpeed] = useState("");
  const [selectedPromotionType, setSelectedPromotionType] = useState("");

  const [showAvailibity, setShowAvailibity] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [showModel, setShowModel] = useState(true);
  const [showCountry, setShowCountry] = useState(true);

  const [showPromotions, setShowPromotions] = useState(true);
  const [showMoreBrand, setShowMoreBrand] = useState(false);
  const [showMoreModel, setShowMoreModel] = useState(false);
  const [showMoreCountry, setShowMoreCountry] = useState(false);

  const [priceRange, setPriceRange] = useState([100000, 500000]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  //   Бренд
  const getUniqueBrands = () => {
    return [
      ...new Set(
        products
          .filter((item) => item.category === "Гидроциклы")
          .map((item) => item.brand)
      ),
    ];
  };
  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
  };
  const uniqueBrands = getUniqueBrands();
  const brandsToShow = showMoreBrand ? uniqueBrands : uniqueBrands.slice(0, 3);

  //  Модель
  const handleModelChange = (model) => {
    setSelectedModel((prevSelected) =>
      prevSelected.includes(model)
        ? prevSelected.filter((b) => b !== model)
        : [...prevSelected, model]
    );
  };
  const getUniqueModels = () => {
    return [
      ...new Set(
        products
          .filter((item) => item.category === "Гидроциклы")
          .map((item) => item.model)
      ),
    ];
  };
  const uniqueModels = getUniqueModels();
  const modelsToShow = showMoreModel ? uniqueModels : uniqueModels.slice(0, 3);

  // Акции
  const getUniquePromotions = () => {
    const promotions = products
      .filter((item) => item.category === "Гидроциклы")
      .map((item) => item.promotionType)
      .filter((promotion) => promotion);

    const uniquePromotions = Array.from(new Set(promotions));

    return uniquePromotions;
  };
  const handlePromotionChange = (promotion) => {
    setSelectedPromotionType((prevSelected) => {
      if (prevSelected === promotion) {
        return "";
      }
      return promotion;
    });
  };
  const uniquePromotions = getUniquePromotions();

  //   // Страна
  const handleCountryChange = (country) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.includes(country)
        ? prevSelected.filter((b) => b !== country)
        : [...prevSelected, country]
    );
  };
  const getUniqueCountries = () => {
    return [
      ...new Set(
        products
          .filter((item) => item.category === "Гидроциклы")
          .map((item) => item.country)
      ),
    ];
  };
  const uniqueCountries = getUniqueCountries();
  const countriesToShow = showMoreCountry
    ? uniqueCountries
    : uniqueCountries.slice(0, 3);

  const sortedProducts = products
    .filter((item) => {
      if (
        (selectedSort === "По возрастанию" || selectedSort === "По убыванию") &&
        item.availability === "Нет в наличии"
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "По популярности") {
        if (a.popularCategory && !b.popularCategory) return -1;
        if (!a.popularCategory && b.popularCategory) return 1;
        return 0;
      }
      if (selectedSort === "По возрастанию") {
        return a.price - b.price;
      }
      if (selectedSort === "По убыванию") {
        return b.price - a.price;
      }
      return 0;
    });

  const [filters, setFilters] = useState({
    availability: "",
  });

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      availability: value,
    }));
  };

  const filteredProducts = sortedProducts.filter((item) => {
    if (item.category === "Гидроциклы") {
      if (
        filters.availability === "inStock" &&
        item.availability !== "В наличии"
      ) {
        return false;
      }
      if (
        filters.availability === "onOrder" &&
        item.availability !== "Нет в наличии"
      ) {
        return false;
      }

      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }

      if (selectedPower && item.power !== Number(selectedPower)) {
        return false;
      }

      if (
        selectedEnginePower &&
        item.enginePower !== Number(selectedEnginePower)
      ) {
        return false;
      }

      if (selectedMaxSpeed && item.maxSpeed !== Number(selectedMaxSpeed)) {
        return false;
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
        return false;
      }

      if (selectedModel.length > 0 && !selectedModel.includes(item.model)) {
        return false;
      }

      if (
        selectedPromotionType.length > 0 &&
        !selectedPromotionType.includes(item.promotionType)
      ) {
        return false;
      }

      if (
        selectedCountries.length > 0 &&
        !selectedCountries.includes(item.country)
      ) {
        return false;
      }

      return true;
    }
  });

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <Container>
        <PagesNav title={"Квадроциклы"} />
        <h1 className="text-main text-[30px] font-bold pb-[26px] px-[10px]">
          Гидроциклы
        </h1>
        <div className="flex items-center justify-center xsSm:justify-end text-[14px] text-main pb-[50px] px-[10px]">
          <div className="flex items-center gap-[15px] md:gap-[34px]">
            <div className="relative w-full md:w-64">
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
          className={`flex px-[10px] items-start ${
            tableView === "grid" ? "gap-[10px]" : "gap-[15px] sm:gap-[50px]"
          } pb-[77px]`}
        >
          {/* Фильтр */}
          <div className="hidden xs2:flex flex-col justify-between max-w-[120px] xsSm:max-w-[250px] xsSm:w-full sm:max-w-[300px] gap-y-[41px]">
            <div className="flex gap-10 flex-wrap uppercase font-bold">
              <p className="relative">
                Параметры
                <span className="absolute w-full h-[2px] bg-accent bottom-[-3px] left-0"></span>
              </p>
            </div>

            {/* Наличие */}
            <div className="flex gap-[19px] flex-col">
              <div
                onClick={() => setShowAvailibity((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showAvailibity ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">
                  Наличие
                </p>
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
                    <label
                      htmlFor="inStock"
                      className="text-[12px] xsSm:text-[14px] md:text-base"
                    >
                      В наличии
                    </label>
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
                    <label
                      htmlFor="onOrder"
                      className="text-[12px] xsSm:text-[14px] md:text-base"
                    >
                      Под заказ
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Цена */}
            <div className="flex flex-col gap-[19px]">
              <div
                onClick={() => setShowPrice((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showPrice ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">Цена</p>
              </div>

              {showPrice && (
                <>
                  <Slider
                    range
                    min={100000}
                    max={500000}
                    value={priceRange}
                    onChange={setPriceRange}
                    allowCross={false}
                  />
                  <div className="flex justify-between">
                    <p className="flex gap-[12px]">
                      <span className="text-lightGray hidden sm:flex md:text-base">
                        от
                      </span>
                      <span className="text-[12px] xsSm:text-[14px] md:text-base underline">
                        {String(priceRange[0]).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}
                      </span>
                    </p>
                    <p className="flex gap-[12px]">
                      <span className="text-lightGray hidden sm:flex md:text-base">
                        от
                      </span>
                      <span className="text-[12px] xsSm:text-[14px] md:text-base underline">
                        {String(priceRange[1]).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Мощность */}
            <div className="flex gap-[19px] flex-col cursor-pointer">
              <div className="flex items-center justify-between gap-0 xsSm:gap-[5px] md:gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
                <p className="font-semibold text-main text-[12px] xsSm:text-[14px] md:text-base">
                  Мощность, л.с.
                </p>
                <div className="relative w-[38px] border border-lightGray/20 rounded-md">
                  <select
                    className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
                    value={selectedPower}
                    onChange={(e) => setSelectedPower(e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    {[
                      ...new Set(
                        products
                          .map((item) => item.power)
                          .filter((power) => power)
                      ),
                    ]
                      .sort((a, b) => a - b)
                      .map((power, index) => (
                        <option key={index} value={power}>
                          {power}
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

            {/* Мощность двигателя */}
            <div className="flex gap-[19px] flex-col cursor-pointer">
              <div className="flex items-center justify-between gap-0 xsSm:gap-[5px] md:gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
                <p className="font-semibold text-main text-[12px] xsSm:text-[14px] md:text-base">
                  Мощность двигателя, л.с.
                </p>
                <div className="relative w-[38px] border border-lightGray/20 rounded-md">
                  <select
                    className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
                    value={selectedEnginePower}
                    onChange={(e) => setSelectedEnginePower(e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    {Array.from(
                      new Set(
                        products
                          .map((item) => item.enginePower)
                          .filter(
                            (power) => power !== undefined && power !== null
                          )
                      )
                    )
                      .sort((a, b) => a - b)
                      .map((power, index) => (
                        <option key={index} value={power}>
                          {power}
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

            {/* Макс.скорость */}
            <div className="flex gap-[19px] flex-col cursor-pointer">
              <div className="flex items-center justify-between gap-0 xsSm:gap-[5px] md:gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
                <p className="font-semibold text-main text-[12px] xsSm:text-[14px] md:text-base">
                  Макс.скорость
                </p>
                <div className="relative w-[38px] border border-lightGray/20 rounded-md">
                  <select
                    className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
                    value={selectedMaxSpeed}
                    onChange={(e) => setSelectedMaxSpeed(e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    {Array.from(
                      new Set(
                        products
                          .map((item) => item.maxSpeed)
                          .filter(
                            (speed) => speed !== undefined && speed !== null
                          )
                      )
                    )
                      .sort((a, b) => a - b)
                      .map((speed, index) => (
                        <option key={index} value={speed}>
                          {speed}
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

            {/* Бренд */}
            <div className="flex items-start gap-[19px] flex-col">
              <div
                onClick={() => setShowBrand((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showBrand ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">Бренд</p>
              </div>

              {showBrand && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  {brandsToShow.map((brand, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <label className="text-[12px] xsSm:text-[14px] md:text-base">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {uniqueBrands.length > 3 && !showMoreBrand && showBrand && (
                <button
                  onClick={() => setShowMoreBrand(true)}
                  className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                >
                  Показать еще
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                </button>
              )}

              {showMoreBrand && uniqueBrands.length > 3 && showBrand && (
                <button
                  onClick={() => setShowMoreBrand(false)}
                  className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                >
                  Скрыть
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                </button>
              )}
            </div>

            {/* Модель */}
            <div className="flex items-start gap-[19px] flex-col">
              <div
                onClick={() => setShowModel((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showModel ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">Модель</p>
              </div>

              {showModel && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[17px]">
                  {modelsToShow.map((model, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                      <input
                        type="checkbox"
                        checked={selectedModel.includes(model)}
                        onChange={() => handleModelChange(model)}
                      />
                      <label className="text-[12px] xsSm:text-[14px] md:text-base">
                        {model}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {uniqueModels.length > 3 && !showMoreModel && showModel && (
                <button
                  onClick={() => setShowMoreModel(true)}
                  className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                >
                  Показать еще
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                </button>
              )}
              {showMoreModel && uniqueModels.length > 3 && showModel && (
                <button
                  onClick={() => setShowMoreModel(false)}
                  className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                >
                  Скрыть
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                </button>
              )}
            </div>

            {/* Акции */}
            <div className="flex items-start gap-[19px] flex-col">
              <div
                onClick={() => setShowPromotions((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showPromotions ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">Акции</p>
              </div>

              {showPromotions && (
                <div className="flex items-center justify-start xsSm:justify-between gap-y-[8px] xsSm:gap-x-[10px] flex-wrap xsSm:flex-nowrap">
                  {uniquePromotions.map((promotion, index) => (
                    <div
                      key={index}
                      className={`flex gap-[10px] items-center justify-center cursor-pointer uppercase font-bold text-[12px] py-[7px] px-[15px] w-full ${
                        selectedPromotionType === promotion
                          ? "bg-accent text-white"
                          : "bg-basic text-lightGray"
                      }`}
                      onClick={() => handlePromotionChange(promotion)}
                    >
                      <span className="text-[12px] xsSm:text-[14px] md:text-base">
                        {promotion}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Страна */}
            <div className="flex items-start gap-[19px] flex-col">
              <div
                onClick={() => setShowCountry((prev) => !prev)}
                className="flex items-center gap-[14px] cursor-pointer"
              >
                {showCountry ? (
                  <ChevronUp size={18} className="text-lightGray" />
                ) : (
                  <ChevronDown size={18} className="text-lightGray" />
                )}
                <p className="font-semibold text-[14px] md:text-base">Страна</p>
              </div>

              {showCountry && (
                <div className="grid grid-cols-1 xsSm:grid-cols-2 gap-[20px]">
                  {countriesToShow.map((country, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => handleCountryChange(country)}
                      />
                      <label className="text-[12px] xsSm:text-[14px] md:text-base">
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {uniqueCountries.length > 2 &&
                !showMoreCountry &&
                showCountry && (
                  <button
                    onClick={() => setShowMoreCountry(true)}
                    className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                  >
                    Показать еще
                    <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                  </button>
                )}
              {showMoreCountry && uniqueCountries.length > 2 && showCountry && (
                <button
                  onClick={() => setShowMoreCountry(false)}
                  className="mt-2 text-accent relative text-[10px] xsSm:text-[12px] md:text-[14px]"
                >
                  Скрыть
                  <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
                </button>
              )}
            </div>

            {/* Выбрать, сбросить */}
            <div className="flex flex-col items-center gap-y-[15px]">
              <button className="relative text-[13px] text-lightGray">
                Сбросить фильтр
                <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-lightGray" />
              </button>
            </div>
          </div>

          {/* Список товаров */}
          <div className="flex flex-col gap-[50px] w-full">
            <div
              className={`gap-[30px] ${
                tableView === "grid"
                  ? "grid grid-cols-1 mdLg:grid-cols-2 lgXl:grid-cols-3 place-items-center"
                  : "flex flex-col justify-start w-full"
              }`}
            >
              {currentItems.map((item, index) => (
                <Card key={index} item={item} tableView={tableView} />
              ))}
            </div>

            {/* Пагинация */}
            <div className="flex justify-center items-center py-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Назад
              </button>
              <span className="mx-2">{`Страница ${currentPage} из ${totalPages}`}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Вперед
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Hydrocycles;

////////////////
//  ^^^ рабочий нетронутый код
////////////////

// import React, { useState } from "react";
// import { Dice4, List, ChevronDown, ChevronUp } from "lucide-react";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// import PagesNav from "../components/PagesNav";
// import Container from "../components/Container";
// import { products } from "../assets/assets";
// import Card from "../components/Card";

// const Hydrocycles = () => {
//   // Состояния компонента
//   const [tableView, setTableView] = useState("grid"); // Вид таблицы (сетка или столбец)
//   const [selectedSort, setSelectedSort] = useState(""); // Выбранная сортировка
//   const [selectedPower, setSelectedPower] = useState(""); // Выбранная мощность
//   const [selectedEnginePower, setSelectedEnginePower] = useState(""); // Выбранная мощность двигателя
//   const [selectedMaxSpeed, setSelectedMaxSpeed] = useState(""); // Выбранная максимальная скорость
//   const [selectedBrands, setSelectedBrands] = useState([]); // Выбранные бренды
//   const [selectedModel, setSelectedModel] = useState([]); // Выбранные модели
//   const [selectedPromotionType, setSelectedPromotionType] = useState(""); // Выбранный тип акции
//   const [selectedCountries, setSelectedCountries] = useState([]); // Выбранные страны
//   const [showPromotionType, setShowPromotionType] = useState(true); // Показать типы акций
//   const [showAvailibity, setShowAvailibity] = useState(true); // Показать наличие товаров

//   const [showFilters, setShowFilters] = useState({
//     brand: true,
//     model: true,
//     country: true,
//   });

//   // Состояние видимости фильтров
//   const [showMore, setShowMore] = useState({
//     brand: false,
//     model: false,
//     country: false,
//   });

//   // Обработчик для скрытия/отображения фильтров Бренд, Модель, Страна
//   const handleFilterToggle = (filter) => {
//     setShowFilters((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   // Показать больше значений в фильтрах
//   const [showPrice, setShowPrice] = useState(true); // Показать фильтр по цене
//   const [priceRange, setPriceRange] = useState([100000, 500000]); // Диапазон цен

//   // Обработчик изменения сортировки
//   const handleSortChange = (e) => {
//     setSelectedSort(e.target.value);
//   };

//   // Получение уникальных значений для фильтров
//   const getUniqueValues = (key) => {
//     return [
//       ...new Set(
//         products
//           .filter(
//             (item) =>
//               item.category === "Гидроциклы" &&
//               item[key] !== undefined &&
//               item[key].trim() !== ""
//           )
//           .map((item) => item[key])
//       ),
//     ];
//   };

//   const uniquePromotions = getUniqueValues("promotionType"); // Уникальные акции

//   // Обработчик изменения акции
//   const handlePromotionChange = (promotion) => {
//     setSelectedPromotionType((prev) => (prev === promotion ? "" : promotion));
//   };

//   // Обработчик изменения выбора фильтров
//   const handleSelectionChange = (setter) => (value) => {
//     setter(
//       (prevSelected) =>
//         prevSelected.includes(value)
//           ? prevSelected.filter((v) => v !== value) // Удаление из выбранного
//           : [...prevSelected, value] // Добавление в выбранное
//     );
//   };

//   // Сортировка и фильтрация товаров
//   const sortedProducts = products
//     .filter((item) => {
//       if (
//         (selectedSort === "По возрастанию" || selectedSort === "По убыванию") &&
//         item.availability === "Нет в наличии"
//       ) {
//         return false; // Исключение недоступных товаров при сортировке
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       if (selectedSort === "По популярности") {
//         return (a.popular ? -1 : 1) - (b.popular ? -1 : 1); // Сортировка по популярности
//       }
//       if (selectedSort === "По возрастанию") {
//         return a.price - b.price; // Сортировка по возрастанию цены
//       }
//       if (selectedSort === "По убыванию") {
//         return b.price - a.price; // Сортировка по убыванию цены
//       }
//       return 0; // Без сортировки
//     });

//   const [filters, setFilters] = useState({ availability: "" }); // Фильтры

//   // Обработчик изменения фильтра
//   const handleFilterChange = (e) => {
//     const { value } = e.target;
//     setFilters((prev) => ({ ...prev, availability: value }));
//   };

//   // Функция для создания фильтров Мощности, МОщности двигателя и Макс. скорости
//   const renderFilter = (label, selectedValue, setSelectedValue, key) => {
//     const uniqueValues = Array.from(
//       new Set(
//         products
//           .map((item) => item[key])
//           .filter((value) => value !== undefined && value !== null)
//       )
//     ).sort((a, b) => a - b);

//     return (
//       <div className="flex gap-[19px] flex-col cursor-pointer">
//         <div className="flex items-center justify-between gap-[5px] md:gap-[14px] pb-[14px] border-b-2 border-b-lightGray">
//           <p className="font-semibold text-main text-[14px] md:text-base">
//             {label}
//           </p>
//           <div className="relative w-[38px] border border-lightGray/20 rounded-md">
//             <select
//               className="appearance-none placeholder:text-[14px] text-[14px] bg-white text-main outline-none"
//               value={selectedValue}
//               onChange={(e) => setSelectedValue(e.target.value)}
//             >
//               <option value="" disabled hidden></option>
//               {uniqueValues.map((value, index) => (
//                 <option key={index} value={value}>
//                   {value}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown
//               size={16}
//               className="absolute right-0 top-[57%] transform -translate-y-1/2 pointer-events-none text-[#6b6b6b]"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Фильтрация продуктов
//   const filteredProducts = sortedProducts.filter((item) => {
//     if (item.category === "Гидроциклы") {
//       if (
//         filters.availability === "inStock" &&
//         item.availability !== "В наличии"
//       ) {
//         return false; // Исключение товаров, которые не в наличии
//       }
//       if (
//         filters.availability === "onOrder" &&
//         item.availability !== "Нет в наличии"
//       ) {
//         return false; // Исключение товаров, которые не под заказ
//       }
//       if (item.price < priceRange[0] || item.price > priceRange[1]) {
//         return false; // Исключение товаров вне диапазона цен
//       }
//       if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
//         return false; // Исключение товаров, которые не соответствуют выбранным брендам
//       }
//       if (selectedModel.length > 0 && !selectedModel.includes(item.model)) {
//         return false; // Исключение товаров, которые не соответствуют выбранным моделям
//       }
//       if (selectedPower && item.power !== Number(selectedPower)) {
//         return false; // Исключение товаров с неподходящей мощностью
//       }
//       if (
//         selectedEnginePower &&
//         item.enginePower !== Number(selectedEnginePower)
//       ) {
//         return false; // Исключение товаров с неподходящей мощностью двигателя
//       }
//       if (selectedMaxSpeed && item.maxSpeed !== Number(selectedMaxSpeed)) {
//         return false; // Исключение товаров с неподходящей максимальной скоростью
//       }
//       if (
//         selectedPromotionType &&
//         item.promotionType !== selectedPromotionType
//       ) {
//         return false; // Исключение товаров без выбранного типа акции
//       }
//       if (
//         selectedCountries.length > 0 &&
//         !selectedCountries.includes(item.country)
//       ) {
//         return false; // Исключение товаров, которые не соответствуют выбранным странам
//       }
//       return true; // Товар соответствует всем фильтрам
//     }
//   });

//   // Функция для сброса всех фильтров
//   const resetFilters = () => {
//     setSelectedSort("");
//     setSelectedPower("");
//     setSelectedEnginePower("");
//     setSelectedMaxSpeed("");
//     setSelectedBrands([]);
//     setSelectedModel([]);
//     setSelectedPromotionType("");
//     setSelectedCountries([]);
//     setShowAvailibity(true);
//     setPriceRange([100000, 500000]);
//     setFilters({ availability: "" });
//   };

//   // Пагинация
//   const [currentPage, setCurrentPage] = useState(1); // Текущая страница
//   const itemsPerPage = 9; // Количество товаров на странице

//   const startIndex = (currentPage - 1) * itemsPerPage; // индекс первого элемента
//   const currentItems = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <section>
//       <Container>
//         <PagesNav title={"Квадроциклы"} />
//         <h1 className="text-main text-[30px] font-bold pb-[26px] px-[10px]">
//           Гидроциклы
//         </h1>
//         <div className="flex items-end justify-end text-[14px] text-main pb-[50px]">
//           <div className="flex items-center gap-[34px] px-[10px]">
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

//         <div
//           className={`flex items-start px-[10px] ${
//             tableView === "grid" ? "gap-[10px]" : " gap-[15px] sm:gap-[50px]"
//           } pb-[77px]`}
//         >
//           {/* Фильтр */}
//           <div className="flex flex-col max-w-[310px] gap-y-[41px] px-[10px]">
//             <div className="flex items-center">
//               <h2 className="uppercase font-bold relative tracking-[2px]">
//                 Параметры
//                 <span className="absolute left-0 right-0 bottom-[-5px] h-[2px] bg-accent" />
//               </h2>
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
//                 <p className="font-semibold text-[14px] md:text-base">Цена</p>
//               </div>

//               {showPrice && (
//                 <>
//                   <Slider
//                     range
//                     min={100000}
//                     max={500000}
//                     value={priceRange}
//                     onChange={setPriceRange}
//                     allowCross={false}
//                   />
//                   <div className="flex justify-between text-[14px] md:text-base">
//                     <span>от {priceRange[0]}</span>
//                     <span>до {priceRange[1]}</span>
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* Мощность, Мощность двигателя, Макс. скорость */}
//             <div className="flex flex-col max-w-[310px] gap-y-[20px] md:gap-y-[41px] px-[10px]">
//               {renderFilter(
//                 "Мощность, л.с.",
//                 selectedPower,
//                 setSelectedPower,
//                 "power"
//               )}
//               {renderFilter(
//                 "Мощность двигателя, л.с.",
//                 selectedEnginePower,
//                 setSelectedEnginePower,
//                 "enginePower"
//               )}
//               {renderFilter(
//                 "Макс.скорость",
//                 selectedMaxSpeed,
//                 setSelectedMaxSpeed,
//                 "maxSpeed"
//               )}
//             </div>
//             {/* Бренд, Модель, Страна */}
//             {["brand", "model", "country"].map((filter) => (
//               <div
//                 key={filter}
//                 className="flex items-start gap-[19px] flex-col"
//               >
//                 <div
//                   className="flex items-center gap-[14px] cursor-pointer"
//                   onClick={() => handleFilterToggle(filter)}
//                 >
//                   {showFilters[filter] ? (
//                     <ChevronUp size={18} className="text-lightGray" />
//                   ) : (
//                     <ChevronDown size={18} className="text-lightGray" />
//                   )}
//                   <p className="font-semibold">
//                     {filter === "brand"
//                       ? "Бренд"
//                       : filter === "model"
//                       ? "Модель"
//                       : "Страна"}
//                   </p>
//                 </div>

//                 {showFilters[filter] && (
//                   <div className="grid grid-cols-1 xsSmgrid-cols-2 gap-[20px]">
//                     {(showMore[filter]
//                       ? getUniqueValues(filter)
//                       : getUniqueValues(filter).slice(0, 3)
//                     ).map((item, index) => (
//                       <div className="flex gap-2 items-center" key={index}>
//                         <input
//                           type="checkbox"
//                           checked={
//                             filter === "brand"
//                               ? selectedBrands.includes(item)
//                               : filter === "model"
//                               ? selectedModel.includes(item)
//                               : selectedCountries.includes(item)
//                           }
//                           onChange={() =>
//                             handleSelectionChange(
//                               filter === "brand"
//                                 ? setSelectedBrands
//                                 : filter === "model"
//                                 ? setSelectedModel
//                                 : setSelectedCountries
//                             )(item)
//                           }
//                         />
//                         <label className="text-[14px]">{item}</label>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {getUniqueValues(filter).length > 3 && showFilters[filter] && (
//                   <button
//                     onClick={() =>
//                       setShowMore((prev) => ({
//                         ...prev,
//                         [filter]: !prev[filter],
//                       }))
//                     }
//                     className="mt-2 text-accent relative text-[14px]"
//                   >
//                     {showMore[filter] ? "Скрыть" : "Показать еще"}
//                     <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-accent" />
//                   </button>
//                 )}
//               </div>
//             ))}
//             {/* Акции */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => setShowPromotionType((prev) => !prev)}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showPromotionType ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Акции</p>
//               </div>

//               {showPromotionType && (
//                 <div className="flex items-start gap-3 xsSm:gap-6 flex-row flex-wrap">
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
//             {/* Выбрать, сбросить */}
//             <div className="flex flex-col items-center justify-center">
//               <button
//                 onClick={resetFilters}
//                 className="relative text-[13px] text-lightGray"
//               >
//                 Сбросить фильтр
//                 <span className="absolute left-0 right-0 bottom-[-1px] h-[1px] bg-lightGray" />
//               </button>
//             </div>
//           </div>

//           {/* Каталог */}
//           <div className="flex flex-col">
//             <div
//               className={`gap-[30px] ${
//                 tableView === "grid"
//                   ? "grid grid-cols-1 md:grid-cols-2 lgXl:grid-cols-3 md:w-full md:place-items-start"
//                   : "flex flex-col justify-start w-full"
//               }`}
//             >
//               {/* {filteredProducts.map(
//                 (item, index) =>
//                   item.category === "Гидроциклы" && (
//                     <Card item={item} key={index} tableView={tableView} />
//                   )
//               )} */}

//               {currentItems.map(
//                 (item, index) =>
//                   item.category === "Гидроциклы" && (
//                     <Card key={index} item={item} tableView={tableView} />
//                   )
//               )}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Hydrocycles;

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
//   const [filters, setFilters] = useState({
//     sort: "",
//     power: "",
//     enginePower: "",
//     maxSpeed: "",
//     brands: [],
//     models: [],
//     countries: [],
//     promotionType: "",
//     availability: "",
//     priceRange: [100000, 500000],
//   });

//   // Получаем уникальные акции из продуктов, исключая пустые и неопределенные значения
//   const uniquePromotions = [
//     ...new Set(
//       products
//         .map(
//           (product) =>
//             product.category === "Гидроциклы" && product.promotionType
//         ) // Получаем все promotionType
//         .filter((promotion) => promotion) // Фильтруем только ненулевые и непустые значения
//     ),
//   ];

//   const [showFilters, setShowFilters] = useState({
//     availability: true,
//     price: true,
//     power: true,
//     enginePower: true,
//     maxSpeed: true,
//     brands: true,
//     models: true,
//     countries: true,
//     promotionType: true,
//   });

//   const toggleFilterVisibility = (filter) => {
//     setShowFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
//   };

//   const handleSelectionChange = (key) => (value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: prev[key].includes(value)
//         ? prev[key].filter((v) => v !== value)
//         : [...prev[key], value],
//     }));
//   };

//   const handleSortChange = (e) => {
//     setFilters((prev) => ({ ...prev, sort: e.target.value }));
//   };

//   const getUniqueValues = (key) =>
//     [
//       ...new Set(
//         products
//           .filter((item) => item.category === "Гидроциклы")
//           .map((item) => item[key])
//       ),
//     ].filter(Boolean);

//   // Получение уникальных значений мощности, отсортированных от меньшего к большему
//   const uniquePowers = [
//     ...new Set(
//       products
//         .filter((item) => item.category === "Гидроциклы")
//         .map((item) => item.power)
//     ),
//   ].sort((a, b) => a - b); // Сортировка от меньшего к большему

//   const filteredProducts = products
//     .filter((item) => item.category === "Гидроциклы")
//     .filter((item) => {
//       const {
//         availability,
//         brands,
//         models,
//         power,
//         enginePower,
//         maxSpeed,
//         promotionType,
//         countries,
//         priceRange,
//       } = filters;

//       return (
//         (availability.length === 0 ||
//           availability.includes(
//             item.availability === "В наличии" ? "inStock" : "onOrder"
//           )) &&
//         (brands.length === 0 || brands.includes(item.brand)) &&
//         (models.length === 0 || models.includes(item.model)) &&
//         (countries.length === 0 || countries.includes(item.country)) &&
//         (!power || item.power === Number(power)) &&
//         (!enginePower || item.enginePower === Number(enginePower)) &&
//         (!maxSpeed || item.maxSpeed === Number(maxSpeed)) &&
//         (!promotionType || item.promotionType === promotionType) &&
//         item.price >= priceRange[0] &&
//         item.price <= priceRange[1]
//       );
//     })
//     .sort((a, b) => {
//       const { sort } = filters;
//       if (sort === "По популярности")
//         return (a.popular ? -1 : 1) - (b.popular ? -1 : 1);
//       if (sort === "По возрастанию") return a.price - b.price;
//       if (sort === "По убыванию") return b.price - a.price;
//       return 0;
//     });

//   const handleAvailabilityChange = (value) => {
//     setFilters((prev) => ({
//       ...prev,
//       availability: prev.availability.includes(value)
//         ? prev.availability.filter((v) => v !== value)
//         : [...prev.availability, value],
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       sort: "",
//       power: "",
//       enginePower: "",
//       maxSpeed: "",
//       brands: [],
//       models: [],
//       countries: [],
//       promotionType: "",
//       availability: "",
//       priceRange: [100000, 500000],
//     });
//   };

//   // Пагинация
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <section>
//       <Container>
//         <PagesNav title={"Гидроциклы"} />
//         <h1 className="text-main text-[30px] font-bold pb-[26px] px-[10px]">
//           Гидроциклы
//         </h1>
//         <div className="flex items-end justify-end text-[14px] text-main pb-[50px]">
//           <select
//             className="block w-64"
//             value={filters.sort}
//             onChange={handleSortChange}
//           >
//             <option value="" disabled hidden>
//               Выберите сортировку
//             </option>
//             <option value="По популярности">По популярности</option>
//             <option value="По убыванию">По убыванию</option>
//             <option value="По возрастанию">По возрастанию</option>
//           </select>
//           <Dice4
//             size={26}
//             onClick={() => setTableView("grid")}
//             className={tableView === "grid" ? "opacity-100" : "opacity-50"}
//           />
//           <List
//             size={26}
//             onClick={() => setTableView("column")}
//             className={tableView === "column" ? "opacity-100" : "opacity-50"}
//           />
//         </div>

//         <div
//           className={`flex items-start px-[10px] ${
//             tableView === "grid" ? "gap-[10px]" : "gap-[15px] sm:gap-[50px]"
//           } pb-[77px]`}
//         >
//           <div className="flex flex-col max-w-[310px] gap-y-[41px] px-[10px]">
//             {/* Наличие */}
//             <div className="flex gap-[19px] flex-col">
//               <div
//                 onClick={() => toggleFilterVisibility("availability")}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showFilters.availability ? (
//                   <ChevronUp size={18} />
//                 ) : (
//                   <ChevronDown size={18} />
//                 )}
//                 <p className="font-semibold">Наличие</p>
//               </div>

//               {showFilters.availability && (
//                 <div className="flex items-center gap-6 flex-wrap">
//                   <div className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       checked={filters.availability.includes("inStock")}
//                       onChange={() => handleAvailabilityChange("inStock")}
//                     />
//                     <label>В наличии</label>
//                   </div>
//                   <div className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       checked={filters.availability.includes("onOrder")}
//                       onChange={() => handleAvailabilityChange("onOrder")}
//                     />
//                     <label>Под заказ</label>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Цена */}
//             <div className="flex flex-col gap-[19px]">
//               <div
//                 onClick={() => toggleFilterVisibility("price")}
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showFilters.price ? (
//                   <ChevronUp size={18} />
//                 ) : (
//                   <ChevronDown size={18} />
//                 )}
//                 <p className="font-semibold">Цена</p>
//               </div>

//               {showFilters.price && (
//                 <>
//                   <Slider
//                     range
//                     min={100000}
//                     max={500000}
//                     value={filters.priceRange}
//                     onChange={(value) =>
//                       setFilters((prev) => ({ ...prev, priceRange: value }))
//                     }
//                     allowCross={false}
//                   />
//                   <div className="flex justify-between">
//                     <span>от {filters.priceRange[0]}</span>
//                     <span>до {filters.priceRange[1]}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Фильтры по мощности */}
//             <FilterSelect
//               label="Мощность, л.с."
//               selectedValue={filters.power}
//               setSelectedValue={handleSelectionChange("power")}
//               uniqueValues={uniquePowers}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Фильтры по мощности двигателя */}
//             <FilterSelect
//               label="Мощность двигателя, л.с."
//               selectedValue={filters.enginePower}
//               setSelectedValue={handleSelectionChange("enginePower")}
//               uniqueValues={getUniqueValues("enginePower")}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Фильтры по максимальной скорости */}
//             <FilterSelect
//               label="Максимальная скорость, км/ч"
//               selectedValue={filters.maxSpeed}
//               setSelectedValue={handleSelectionChange("maxSpeed")}
//               uniqueValues={getUniqueValues("maxSpeed")}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Фильтры по брендам */}
//             <FilterSelect
//               label="Бренд"
//               selectedValue={filters.brands}
//               setSelectedValue={handleSelectionChange("brands")}
//               uniqueValues={getUniqueValues("brand")}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Фильтры по моделям */}
//             <FilterSelect
//               label="Модель"
//               selectedValue={filters.models}
//               setSelectedValue={handleSelectionChange("models")}
//               uniqueValues={getUniqueValues("model")}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Фильтры по странам */}
//             <FilterSelect
//               label="Страна"
//               selectedValue={filters.countries}
//               setSelectedValue={handleSelectionChange("countries")}
//               uniqueValues={getUniqueValues("country")}
//               showFilters={showFilters} // добавлено
//               toggleFilterVisibility={toggleFilterVisibility} // д
//             />

//             {/* Акции */}
//             <div className="flex items-start gap-[19px] flex-col">
//               <div
//                 onClick={() => toggleFilterVisibility("promotionType")} // Используем общий метод
//                 className="flex items-center gap-[14px] cursor-pointer"
//               >
//                 {showFilters.promotionType ? (
//                   <ChevronUp size={18} className="text-lightGray" />
//                 ) : (
//                   <ChevronDown size={18} className="text-lightGray" />
//                 )}
//                 <p className="font-semibold">Акции</p>
//               </div>

//               {showFilters.promotionType && (
//                 <div className="flex items-start gap-3 xsSm:gap-6 flex-row flex-wrap">
//                   {uniquePromotions.map((promotion, index) => (
//                     <div
//                       key={index}
//                       className={`flex gap-[10px] items-center cursor-pointer uppercase font-bold text-[12px] py-[7px] px-[15px] ${
//                         filters.promotionType === promotion // Изменяем условие
//                           ? "bg-accent text-white"
//                           : "bg-basic text-lightGray"
//                       }`}
//                       onClick={() =>
//                         setFilters((prev) => ({
//                           ...prev,
//                           promotionType:
//                             prev.promotionType === promotion ? "" : promotion, // Логика изменения
//                         }))
//                       }
//                     >
//                       <span className="text-[14px]">{promotion}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Сброс фильтров */}
//             <button
//               onClick={resetFilters}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Сбросить фильтры
//             </button>
//           </div>

//           {/* Список товаров */}
//           <div className="flex flex-col gap-[50px]">
//             <div
//               className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] ${
//                 tableView === "grid" ? "grid" : "table"
//               }`}
//             >
//               {currentItems.map((item, index) => (
//                 <Card key={index} item={item} tableView={tableView} />
//               ))}
//             </div>

//             {/* Пагинация */}
//             <div className="flex justify-center items-center py-4">
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 border ${
//                   currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
//                 }`}
//               >
//                 Назад
//               </button>
//               <span className="mx-2">{`Страница ${currentPage} из ${totalPages}`}</span>
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 border ${
//                   currentPage === totalPages
//                     ? "cursor-not-allowed opacity-50"
//                     : ""
//                 }`}
//               >
//                 Вперед
//               </button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// const FilterSelect = ({
//   label,
//   selectedValue,
//   setSelectedValue,
//   uniqueValues,
//   showFilters,
//   toggleFilterVisibility, // добавлено
// }) => (
//   <div className="flex flex-col gap-[19px]">
//     <div
//       onClick={() => toggleFilterVisibility(label)}
//       className="flex items-center gap-[14px] cursor-pointer"
//     >
//       {showFilters[label] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//       <p className="font-semibold">{label}</p>
//     </div>

//     {showFilters[label] && (
//       <div className="flex flex-col gap-2">
//         {uniqueValues.map((value) => (
//           <div key={value} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={selectedValue.includes(value)}
//               onChange={() => setSelectedValue(value)}
//             />
//             <label className="ml-2">{value}</label>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default Hydrocycles;
