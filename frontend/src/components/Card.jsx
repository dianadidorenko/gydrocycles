import { Heart, ShoppingCart } from "lucide-react";

const Card = ({ item }) => {
  return (
    <div className="w-full max-w-[271px]">
      <div className="relative border border-[#CDCDCD] flex flex-col items-center pb-[25px] h-full hover:shadow-xl transition-all duration-300 cursor-pointer hover:text-accent">
        <div className="flex justify-end w-full">
          {item.promotionType ? (
            <div className="flex justify-between gap-[5px] sm:gap-[54px] items-start pr-[5px] w-full">
              <p className="flex items-center uppercase font-bold text-[12px] py-2 px-[20px] bg-accent text-white">
                {item.promotionType}
              </p>

              <div className="p-2">
                <Heart />
              </div>
            </div>
          ) : (
            <div className="p-2 flex items-end justify-end">
              <Heart />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-[8px] mb-[4px]">
          <img src={item.image[0]} alt={item.name} />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-[18px] max-w-[210px] text-center mb-[7px]">
            {item.name}
          </p>
        </div>

        {item.priceStart ? (
          <p className="flex gap-1 font-bold text-[27px] pt-[26px]">
            {item.priceStart} <span>₴</span>
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="lowercase font-bold">{item.availability}</p>
            <button className="pt-[13px] text-accent underline">
              Сообщить о поступленини
            </button>
          </div>
        )}

        {item.availability === "В наличии" && (
          <div className="absolute bottom-0 right-0 rounded-ss-xl bg-accent px-[15px] py-[7px]">
            <ShoppingCart className=" text-white" size={26} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
