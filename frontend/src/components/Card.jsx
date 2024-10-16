import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ item, tableView }) => {
  const sizeClasses = {
    verySm: 16,
    sm: 20, // Размер для маленьких экранов
    lg: 26, // Размер для больших экранов
  };
  return (
    <Link to={`/product/${item.id}`} className="w-full flex items-center justify-center">
      <div
        className={`relative group border border-[#CDCDCD] 
        h-full hover:shadow-xl transition-all
        duration-300 cursor-pointer hover:text-accent 
        ${
          tableView === "column"
            ? "flex items-center justify-between mdLg:justify-center gap-y-[15px] mdLg:gap-x-[35px] pt-[20px] pb-[50px] mdLg:pt-[50px] px-[20px] flex-col mdLg:flex-row"
            : "flex flex-col justify-between max-h-[507px] max-w-[271px] pb-[35px]"
        }`}
      >
        {tableView === "column" && (
          <div className="absolute right-2 top-2 p-2 flex items-end justify-end">
            <Heart />
          </div>
        )}

        <div
          className={`flex ${tableView === "grid" ? "justify-end w-full" : ""}`}
        >
          {item.promotionType && tableView === "grid" && (
            <div className="flex justify-between gap-[5px] sm:gap-[54px] items-start pr-[5px] w-full">
              <p className="flex items-center uppercase font-bold text-[12px] py-2 px-[20px] bg-accent text-white">
                {item.promotionType}
              </p>

              <div className="p-2">
                <Heart />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-[8px] mb-[4px]">
          {item.image && (
            <img
              src={item.image[0]}
              alt={item.name}
              className=" mwx-w-[175px] sm:max-w-[250px] object-cover"
            />
          )}
        </div>

        <div
          className={`flex items-center justify-center ${
            tableView === "column" && "flex-col gap-1"
          }`}
        >
          <p className="text-[18px] max-w-[210px] text-center mb-[7px]">
            {item.name}
          </p>

          {item.price &&
            item.availability === "В наличии" &&
            tableView === "column" && (
              <p className="flex justify-center gap-1 font-bold text-[27px] pt-[26px]">
                {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                <span>₴</span>
              </p>
            )}

          {item.availability === "Нет в наличии" && tableView === "column" && (
            <div className="flex flex-col items-center">
              <p className="lowercase font-bold">{item.availability}</p>
              <button className="pt-[13px] text-accent underline">
                Сообщить о поступленини
              </button>
            </div>
          )}
        </div>

        {item.priceStart && (
          <p className="flex gap-1 font-bold text-[27px] pt-[26px]">
            {String(item.priceStart).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            <span>₴</span>
          </p>
        )}

        {item.availability === "Нет в наличии" && tableView === "grid" && (
          <div className="flex flex-col items-center">
            <p className="lowercase font-bold">{item.availability}</p>
            <button className="pt-[13px] text-accent underline">
              Сообщить о поступленини
            </button>
          </div>
        )}

        {item.price &&
          item.availability === "В наличии" &&
          tableView === "grid" && (
            <p className="flex justify-center gap-1 font-bold text-[27px] pt-[26px]">
              {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              <span>₴</span>
            </p>
          )}

        {item.availability === "В наличии" && (
          <div className="absolute bottom-0 right-0 rounded-ss-xl bg-accent px-[15px] py-[7px]">
            <ShoppingCart
              className="text-white"
            />
            <style jsx='true'>{`
              @media (min-width: 320px) {
                .lucide-shopping-cart {
                  width: ${sizeClasses.verySm}px;
                  height: ${sizeClasses.verySm}px;
                }
              }
              @media (min-width: 640px) {
                .lucide-shopping-cart {
                  width: ${sizeClasses.sm}px;
                  height: ${sizeClasses.sm}px;
                }
              }
              @media (min-width: 768px) {
                .lucide-shopping-cart {
                  width: ${sizeClasses.lg}px;
                  height: ${sizeClasses.lg}px;
                }
              }
            `}</style>
          </div>
        )}

        {/* Надпись при наведении */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-main py-[18px] px-[25px] bg-white/90 text-lg text-[20px] rounded-[3px] shadow-[0_0_15px_0_rgba(0,0,0,0.2)]">
            посмотреть товар
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
