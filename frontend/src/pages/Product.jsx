import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChartNoAxesColumn, Heart, Star } from "lucide-react";

import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";
import PagesNav from "../components/PagesNav";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="transition-opacity ease-in duration-500 opacity-100">
      <Container>
        <PagesNav title={productData.category} model={productData.name} />

        {/* Product Data */}
        <div className="flex gap-[100px] justify-between flex-col sm:flex-row pb-[80px]">
          {/* Product Images */}
          <div
            className={`flex flex-col ${
              productData.promotionType ? "justify-between" : "justify-center"
            } gap-3`}
          >
            {productData.promotionType && (
              <div className="flex">
                <p className="uppercase text-[12px] py-2 px-[20px] bg-accent text-white tracking-[3px]">
                  {productData.promotionType}
                </p>
                <p className="opacity-0">0</p>
              </div>
            )}

            <img src={image} alt="" className="w-[500px]" />

            <div className="relative flex flex-col items-center">
              {productData.price && (
                <p className="text-[40px] font-bold">
                  {String(productData.price).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    " "
                  )}{" "}
                  {currency}
                </p>
              )}

              {productData.priceStart && (
                <>
                  <p className="text-lightGray text-3xl relative z-1">
                    {String(productData.priceStart).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      " "
                    )}{" "}
                    {currency}
                  </p>
                  <hr className="absolute top-[20%] left-[20%] w-[50%] h-[6px] text-lightGray transform -rotate-12" />
                </>
              )}

              {productData.priceDiscount && (
                <p className="mt-5 text-[40px] font-bold">
                  {String(productData.priceDiscount).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    " "
                  )}{" "}
                  {currency}
                </p>
              )}

              <p className="text-accent text-[15px]">
                Нашли дешевле? Снизим цену!
              </p>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-bold text-[30px] text-main pb-[10px]">
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

            <div className="flex flex-col max-w-[436px] pt-[51px] pb-[45px]">
              <div className="flex gap-[34px] pb-[25px]">
                <h2
                  className={`flex flex-col text-[20px] ${
                    active ? "font-bold relative" : "opacity-60"
                  }`}
                  onClick={() => setActive((prev) => !prev)}
                >
                  Характеристики
                  {active && (
                    <span className="w-full h-[3px] bg-accent bottom-[-5px] left-0"></span>
                  )}
                </h2>
                <h2
                  className={`flex flex-col text-[20px] ${
                    active ? "opacity-60" : "font-bold relative"
                  }`}
                  onClick={() => setActive((prev) => !prev)}
                >
                  Наличие в магазине
                  {!active && (
                    <span className="w-full h-[3px] bg-accent bottom-[-5px] left-0"></span>
                  )}
                </h2>
              </div>

              <div>
                <div
                  className={`flex text-[20px] gap-[10px] ${
                    active ? "flex flex-col" : "hidden"
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
                    <p>{productData.engine}</p>
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
                </div>
              </div>
            </div>

            <button className="uppercase text-[14px] bg-accent text-white border-[3px] py-[16px] px-[53px]">
              Купить
            </button>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
