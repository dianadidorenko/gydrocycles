import { useState } from "react";

import { products } from "../assets/assets";
import Container from "../components/Container.jsx";
import Card from "./Card";

const RelatedItems = () => {
  const [searchType, setSearchType] = useState("Электроника");
  const [visibleCount, setVisibleCount] = useState(4);

  // Фильтруем товары по выбранной категории и популярности
  const filteredProducts = products.filter(
    (item) => item.category === searchType && item.subCategory
  );

  // Функция для показа еще товаров
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Отображаемые товары
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : [];

  return (
    <section className="pb-[80px] px-[10px]">
      <Container>
        <h2 className="text-[25px] font-bold text-center xsSm:text-left">
          С этим товаром покупают
        </h2>

        <div className="flex gap-[30px] sm:gap-[50px] overflow-x-scroll">
          <button
            onClick={() => {
              setSearchType("Моторы");
              setVisibleCount(4);
            }}
            className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "Моторы" ? " text-main font-bold" : "bg-none"
            }`}
          >
            моторы
            {searchType === "Моторы" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
            )}
          </button>

          <button
            onClick={() => {
              setSearchType("Электроника");
              setVisibleCount(4);
            }}
            className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "Электроника" ? " text-main font-bold" : "bg-none"
            }`}
          >
            электроника
            {searchType === "Электроника" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
            )}
          </button>

          <button
            onClick={() => {
              setSearchType("Инструменты");
              setVisibleCount(4);
            }}
            className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "Инструменты" ? " text-main font-bold" : "bg-none"
            }`}
          >
            инструменты
            {searchType === "Инструменты" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
            )}
          </button>

          <button
            onClick={() => {
              setSearchType("Аксессуары");
              setVisibleCount(4);
            }}
            className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
              searchType === "Аксессуары" ? " text-main font-bold" : "bg-none"
            }`}
          >
            аксессуары
            {searchType === "Аксессуары" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 place-items-center xsSm:place-items-stretch xsSm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[35px] gap-[30px]">
          {productsToDisplay.length === 0 ? (
            <p>Нет популярных товаров в данной категории.</p>
          ) : (
            productsToDisplay
              .slice(0, visibleCount)
              .map((item) => <Card item={item} key={item._id} swiper={true} />)
          )}
        </div>

        {filteredProducts.length > 4 &&
          visibleCount < filteredProducts.length && (
            <div className="flex justify-center">
              <button
                className="mt-[35px] bg-basic uppercase text-[15px] py-[16px] px-[43px] text-main"
                onClick={handleShowMore}
                disabled={productsToDisplay.length <= visibleCount}
              >
                Показать еще
              </button>
            </div>
          )}
      </Container>
    </section>
  );
};

export default RelatedItems;
