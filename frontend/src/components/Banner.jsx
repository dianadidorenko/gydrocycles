import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import SwiperNavButtons from "./SwiperNavButtons";
import { assets } from "../assets/assets";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Loader from "../components/Loader";

const mainSliderData = [
  {
    imgPath: assets.banner,
  },
  {
    imgPath: assets.banner,
  },
  {
    imgPath: assets.banner,
  },
  {
    imgPath: assets.banner,
  },
  {
    imgPath: assets.banner,
  },
  {
    imgPath: assets.banner,
  },
];

const MainSlider = () => {
  const { products } = useContext(ShopContext);

  const [randomProduct, setRandomProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const availableProducts = products.filter(
      (item) => item.priceDiscount && item.priceStart
    );
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    setRandomProduct(availableProducts[randomIndex]);
    setLoading(false);
  }, [products]);

  if (loading) return <Loader />;

  if (!randomProduct) return null;

  return (
    <section className="pt-[40px] pb-[80px] lgXl:py-[80px]">
      <Container>
        <div className="flex justify-center flex-col gap-y-[40px] lgXl:flex-row lgXl:justify-between">
          <div className="w-full lgXl:max-w-[870px]">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              navigation
              breakpoints={{}}
              spaceBetween={30}
              pagination={(true, { clickable: true })}

              //   autoplay={true}
            >
              {mainSliderData.map((picture, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    <img
                      src={picture.imgPath}
                      alt="banner"
                      className="w-full h-auto object-cover min-h-[164px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
              {/* swiper navigation */}
              <SwiperNavButtons />
            </Swiper>
          </div>

          <div className="px-[10px] sm:px-0 max-w-[270px] mx-auto">
            <Link to={`/product/${randomProduct._id}`} className="w-full">
              <div className="border border-[#CDCDCD]">
                <div className="flex justify-between gap-[5px] sm:gap-[54px] items-start">
                  <p className="flex items-center uppercase font-bold text-[12px] py-2 px-[20px] bg-accent text-white">
                    {randomProduct.promotionType}
                  </p>
                  <div className="flex flex-col gap-[7px] justify-end items-end pt-[3px] mr-[10px] text-nowrap">
                    <p className="flex text-accent font-bold text-[27px]">
                      {String(randomProduct.priceDiscount).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        " "
                      )}
                      <span className="pl-[1px]">₴</span>
                    </p>
                    <div className="relative">
                      <p className="text-lightGray text-[14px] relative z-1">
                        {String(randomProduct.priceStart).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}{" "}
                        ₴
                      </p>
                      <hr className="absolute top-1/2 left-0 w-full h-[4px] text-lightGray transform -rotate-12" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-[8px] mb-[4px]">
                  <img src={randomProduct.image[0]} alt={randomProduct.name} />
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-bold text-[18px] max-w-[210px] text-center mb-[7px]">
                    {randomProduct.name}
                  </p>
                </div>
                <div className="bg-basic flex text-center justify-center p-[14px]">
                  <p>
                    Акция действует до <br />
                    <span className="text-accent">31.12.2024</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MainSlider;
