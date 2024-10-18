import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ChartNoAxesColumn, Heart, Star } from "lucide-react";
import Container from "../components/Container";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

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
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <Container>
        {/* ************ PAGES VAV ************ */}

        {/* Product Data */}
        <div className="flex gap-[100px] justify-between flex-col sm:flex-row">
          {/* Product Images */}
          <div className="flex flex-col gap-3">
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
                <p className="text-[40px]">
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
                <p className="mt-5 text-[40px] font-medium">
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
            <h1 className="font-bold text-[30px] text-main">
              {productData.name}
            </h1>
            <p className="text-[15px] text-lightGray">
              Код товара: {productData.code}
            </p>
            <div className="flex items-center gap-1 mt-2">
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
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
