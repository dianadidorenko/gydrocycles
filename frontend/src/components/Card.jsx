import { Heart, Search, ShoppingCartIcon } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Card = ({ item, tableView, swiper = false }) => {
  const sizeClasses = {
    verySm: 16,
    sm: 20,
    lg: 26,
  };

  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${item._id}`}>
      <div
        className={`w-full sm:max-w-[100%] max-h-[430px] relative group border border-[#CDCDCD] hover:shadow-xl transition-all duration-300 cursor-pointer hover:text-accent 
        ${
          tableView === "column"
            ? "relative flex items-center justify-between mdLg:justify-center gap-y-[15px] mdLg:gap-x-[35px] pt-[50px] pb-[50px] mdLg:pt-[50px] px-[10px] mdLg:px-[20px] flex-col md:flex-row"
            : "flex flex-col justify-between max-w-[271px] pb-[35px] xsSm:min-h-[432px] gap-y-[20px] md:gap-y-[5px]"
        }`}
      >
        {(tableView || swiper) && (
          <div className="z-20 absolute right-2 top-2 p-2 flex items-end justify-end">
            <Heart onClick={() => console.log("Heart")} />
          </div>
        )}

        <div
          className={`flex ${tableView === "grid" ? "justify-end w-full" : ""}`}
        >
          {item.promotionType && (
            <div
              className={`flex justify-between gap-[5px] sm:gap-[54px] items-start pr-[5px] w-full ${
                tableView === "column" ? "absolute left-0 top-0" : ""
              }`}
            >
              <p className="flex items-center uppercase font-bold text-[12px] py-2 px-[20px] bg-accent text-white">
                {item.promotionType}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-[8px] mb-[4px]">
          {item.image && (
            <img
              src={item.image[0]}
              alt={item.name}
              className="max-w-[80px] xs:max-w-[120px] xsSm:max-w-[175px] md:max-w-[250px] object-cover"
            />
          )}
        </div>

        <div
          className={`flex items-center justify-center ${
            tableView === "column" && "flex-col gap-1"
          }`}
        >
          <p className="text-[16px] md:text-[18px] max-w-[210px] text-center mb-[7px] px-[5px]">
            {item.name}
          </p>

          {item.price &&
            item.availability === "В наличии" &&
            tableView === "column" && (
              <p className="flex justify-center gap-1 font-bold text-[18px] xs:text-[22px] md:text-[27px] pt-[26px]">
                {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                <span>{currency}</span>
              </p>
            )}

          {item.availability === "Нет в наличии" && tableView === "column" && (
            <div className="flex flex-col items-center">
              <p className="lowercase font-bold text-center">
                {item.availability}
              </p>
              <button className="pt-[13px] text-accent underline">
                Сообщить о поступленини
              </button>
            </div>
          )}
        </div>

        {item.priceStart && (
          <p className="flex justify-center gap-1 font-bold text-[27px] pt-[26px] text-center">
            {String(item.priceStart).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            <span>{currency}</span>
          </p>
        )}

        {item.availability === "Нет в наличии" && tableView === "grid" && (
          <div className="flex flex-col items-center">
            <p className="lowercase font-bold text-center">
              {item.availability}
            </p>
            <button className="pt-[13px] text-accent underline">
              Сообщить о поступленини
            </button>
          </div>
        )}

        {item.availability === "Нет в наличии" &&
          tableView !== "grid" &&
          tableView !== "column" && (
            <div className="flex flex-col items-center">
              <p className="lowercase font-bold text-center">
                {item.availability}
              </p>
              <button className="pt-[13px] text-accent underline">
                Сообщить о поступленини
              </button>
            </div>
          )}

        {item.price &&
          item.availability === "В наличии" &&
          tableView === "grid" && (
            <p className="flex justify-center gap-1 font-bold text-[18px] xs:text-[22px] sm:text-[27px] pt-[26px]">
              {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              <span>{currency}</span>
            </p>
          )}

        {item.availability === "В наличии" && (
          <div className="absolute bottom-0 right-0 rounded-ss-xl bg-accent px-[15px] py-[7px]">
            <ShoppingCartIcon className="text-white" />
            <style jsx="true">{`
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
        <div className="hidden xsSm:flex z-10 absolute top-[50%] h-full w-full left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 items-center justify-center bg-white bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-main text-[16px] text-center text-wrap py-[18px] px-[25px] bg-white/90 md:text-[20px] rounded-[3px] shadow-[0_0_15px_0_rgba(0,0,0,0.2)]">
            посмотреть товар
          </span>
        </div>

        <div className="flex xsSm:hidden z-10 absolute top-[50%] h-full w-full left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 items-center justify-center bg-white bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_0_rgba(0,0,0,0.2)]">
          <Search size={35} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
