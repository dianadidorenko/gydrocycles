import { useSwiper } from "swiper/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <>
      <div
        className={`absolute bottom-[50%] left-[23px] h-[30px] z-10 gap-1 hidden sm:flex`}
      >
        <button
          className={` text-white flex justify-center items-center hover:bg-primary/60 transition-all duration-300`}
          onClick={() => swiper.slidePrev()}
        >
          <SlArrowLeft size={25} />
        </button>
      </div>

      <div
        className={`absolute bottom-[50%] right-[23px] z-10 justify-center gap-1 hidden sm:flex`}
      >
        <button
          className={` text-white flex justify-center items-center hover:bg-primary/60 transition-all duration-300`}
          onClick={() => swiper.slideNext()}
        >
          <SlArrowRight size={25} />
        </button>
      </div>
    </>
  );
};

export default SwiperNavButtons;
