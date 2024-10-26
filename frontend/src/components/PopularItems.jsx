import { useContext, useState } from "react";

import Container from "../components/Container.jsx";
import Card from "./Card";
import { ShopContext } from "../context/ShopContext.jsx";

const PopularItems = () => {
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
    <section className="py-[80px] px-[10px]">
      <Container>
        <h2 className="text-[25px] font-bold text-center xsSm:text-left">
          Популярные товары
        </h2>

        {/* Динамически сгенерированные кнопки для категорий */}
        <div className="flex gap-[30px] sm:gap-[50px] overflow-x-scroll">
          {getUniqueCategories().map((category) => (
            <button
              key={category}
              onClick={() => {
                setSearchType(category);
                setVisibleCount(4);
              }}
              className={`relative px-0 py-[11px] rounded-[5px] text-nowrap sm:text-wrap text-ellipsis whitespace-nowrap lowercase ${
                searchType === category ? "text-main font-bold" : "bg-none"
              }`}
            >
              {category}
              {searchType === category && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
              )}
            </button>
          ))}
        </div>

        {/* Список карточек товаров */}
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

export default PopularItems;
