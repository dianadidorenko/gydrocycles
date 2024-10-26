import { useState, useMemo, useContext } from "react";

import { ShopContext } from "../context/ShopContext.jsx";
import Container from "../components/Container.jsx";
import Card from "./Card";

const CategoryButton = ({ type, currentType, setSearchType }) => (
  <button
    onClick={() => setSearchType(type)}
    className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap ${
      currentType === type ? "text-main font-bold" : "bg-none"
    }`}
  >
    {type.toLowerCase()}
    {currentType === type && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
    )}
  </button>
);

const RelatedItems = () => {
  const { products } = useContext(ShopContext);
  const [searchType, setSearchType] = useState("Электроника");
  const [visibleCount, setVisibleCount] = useState(4);

  // Функция для получения уникальных категорий из products
  const getUniqueCategories = () => {
    const subCategories = products
      .map((item) => item.subCategory)
      .filter((cat) => cat !== "");
    return [...new Set(subCategories)];
  };

  // Получаем отфильтрованные продукты
  const getFilteredProducts = () => {
    return products.filter((item) =>
      searchType === item.subCategory
        ? true
        : item.subCategory === searchType &&
          item.popular &&
          item.subCategory !== ""
    );
  };

  const filteredProducts = getFilteredProducts();
  const productsToDisplay = filteredProducts.slice(0, visibleCount);

  // Функция для показа еще товаров
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Проверка на необходимость кнопки "Показать еще"
  const shouldShowMoreButton = filteredProducts.length > visibleCount;

  return (
    <section className="pb-[80px] px-[10px]">
      <Container>
        <h2 className="text-[25px] font-bold text-center xsSm:text-left">
          С этим товаром покупают
        </h2>

        <div className="flex gap-[30px] sm:gap-[50px] overflow-x-scroll">
          {getUniqueCategories().map((type) => (
            <CategoryButton
              key={type}
              type={type}
              currentType={searchType}
              setSearchType={() => {
                setSearchType(type);
                setVisibleCount(4);
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 place-items-center xsSm:place-items-stretch xsSm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[35px] gap-[30px]">
          {productsToDisplay.length === 0 ? (
            <p>Нет популярных товаров в данной категории.</p>
          ) : (
            productsToDisplay.map((item) => (
              <Card item={item} key={item._id} swiper={true} />
            ))
          )}
        </div>

        {/* Кнопка "Показать еще" */}
        {shouldShowMoreButton && (
          <div className="flex justify-center">
            <button
              className="mt-[35px] bg-basic uppercase text-[15px] py-[16px] px-[43px] text-main"
              onClick={handleShowMore}
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
