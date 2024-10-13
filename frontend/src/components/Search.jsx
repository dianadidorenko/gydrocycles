import { useState } from "react";
import { SearchIcon } from "lucide-react";

import { products } from "../assets/assets.js";
import Container from "./Container.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("code");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  // Функция поиска
  const handleSearch = () => {
    const filtered = products.filter((product) => {
      if (searchType === "code") {
        return product.code && product.code.includes(query);
      } else if (searchType === "brand") {
        return (
          product.brand &&
          product.brand.toLowerCase().includes(query.toLowerCase())
        );
      } else if (searchType === "name") {
        return (
          product.name &&
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return false;
    });
    setFilteredProducts(filtered);
    setSearched(true);
  };

  const handleReset = () => {
    setQuery("");
    setFilteredProducts([]);
    setSearched(false);
  };

  return (
    <section className="px-[10px]">
      <Container className="shadow-md mx-auto">
        <div className="flex overflow-x-scroll gap-x-[10px] sm:gap-x-[34px] mb-6">
          {/* Кнопки для выбора типа поиска */}
          <button
            onClick={() => setSearchType("code")}
            className={`relative px-0 sm:px-[26px] py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "code"
                ? "bg-none sm:bg-basic text-main font-bold"
                : "bg-none"
            }`}
          >
            Поиск по номеру
            {searchType === "code" && (
              <span className="absolute bottom-2 left-0 w-full h-[2px] bg-accent sm:static"></span>
            )}
          </button>

          <button
            onClick={() => setSearchType("brand")}
            className={`relative px-0 sm:px-[26px] py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "brand"
                ? "bg-none sm:bg-basic text-main font-bold"
                : "bg-none"
            }`}
          >
            Поиск по марке
            {searchType === "brand" && (
              <span className="absolute bottom-2 left-0 w-full h-[2px] bg-accent sm:static"></span>
            )}
          </button>
          <button
            onClick={() => setSearchType("name")}
            className={`relative px-0 sm:px-[26px] py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "name"
                ? "bg-none sm:bg-basic text-main font-bold"
                : "bg-none"
            }`}
          >
            Поиск по названию товара
            {searchType === "name" && (
              <span className="absolute bottom-2 left-0 w-full h-[2px] bg-accent sm:static"></span>
            )}
          </button>
        </div>

        <div className="flex items-center mb-4 flex-col sm:flex-row gap-y-4">
          <div className="bg-basic flex justify-between items-center w-full pr-[10px] sm:pr-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Введите ${
                searchType === "code"
                  ? "номер"
                  : searchType === "brand"
                  ? "марку"
                  : "название товара"
              }`}
              className="bg-basic placeholder:text-[#656464] w-full px-[15px] md:px-4 py-[8px] md:py-[17px] focus:outline-none"
            />
            <SearchIcon
              onClick={handleSearch}
              className="sm:hidden"
              size={24}
            />
          </div>

          <button
            onClick={handleSearch}
            className="hidden sm:flex px-[15px] md:px-[38px] py-[11px] md:py-[17px] bg-accent text-white hover:bg-accent/90 uppercase text-[12px] md:text-[14px] font-bold"
          >
            Искать
          </button>

          {searched && (
            <button
              onClick={handleReset}
              className="p-[11px] md:p-[17px] bg-basic text-main hover:bg-red-600 uppercase text-[12px] md:text-[14px] font-bold"
            >
              Очистить
            </button>
          )}
        </div>

        {/* Отображение результатов поиска */}
        {searched && (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 mb-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-base md:text-lg font-semibold">
                    {product.name}
                  </h3>
                  {product.brand && (
                    <p className="text-sm md:text-base text-gray-500">
                      Марка: {product.brand}
                    </p>
                  )}
                  <p className="text-sm md:text-base text-gray-500">
                    Цена: {product.priceStart.toLocaleString()} ₴
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Ничего не найдено</p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Search;
