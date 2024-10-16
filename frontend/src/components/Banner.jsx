import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import SwiperNavButtons from "./SwiperNavButtons";
import { assets, products } from "../assets/assets";
import Container from "../components/Container";
import { Link } from "react-router-dom";

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
            {products.map((item, index) => {
              if (item.name === "Лодочный мотор Suzuki DF9.9BRS") {
                return (
                  <Link
                    to={`/product/${item._id}`}
                    key={index}
                    className="w-full"
                  >
                    <div className="border border-[#CDCDCD]">
                      <div className="flex justify-between gap-[5px] sm:gap-[54px] items-start">
                        <p className="flex items-center uppercase font-bold text-[12px] py-2 px-[20px] bg-accent text-white">
                          {item.promotionType}
                        </p>
                        <div className="flex flex-col gap-[7px] justify-end items-end pt-[3px] mr-[10px] text-nowrap">
                          <p className="flex text-accent font-bold text-[27px]">
                            {String(item.priceDiscount).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              " "
                            )}
                            <span className="pl-[1px]">₴</span>
                          </p>
                          <div className="relative">
                            <p className="text-lightGray text-[14px] relative z-1">
                              {String(item.priceStart).replace(
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
                        <img src={item.image[0]} alt={item.name} />
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="font-bold text-[18px] max-w-[210px] text-center mb-[7px]">
                          {item.name}
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
                );
              }
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MainSlider;
