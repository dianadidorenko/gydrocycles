import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showStore, setShowStore] = useState(false);

  return (
    <footer className="bg-[#F9F9FC] pt-[17px] xsSm:pt-[42px] xsSm:pb-[22px]">
      <Container>
        <div className="flex flex-col xsSm:flex-row justify-center lg:justify-between flex-wrap gap-[42px]">
          <div className="flex flex-col gap-[42px] gap-y-[20px] px-[10px]">
            <p className="text-center xsSm:text-left font-bold text-main text-[14px]">
              Подпишитесь на рассылку <br /> и узнавайте об акциях быстрее
            </p>
            <div className="flex">
              <input
                type="text"
                className="pl-[12px] w-full placeholder:text-lightGray placeholder:text-[14px] py-[8px]"
                placeholder="Введите ваш e-mail"
              />
              <button className="uppercase py-[8px] px-[16px] bg-accent text-white text-[11px]">
                Отправить
              </button>
            </div>
          </div>

          <nav className="hidden text-[14px] xsSm:flex flex-col gap-[10px] px-[10px]">
            <h2 className="font-bold">Информация</h2>
            <Link to={"/about"}>О компании</Link>
            <Link to={"/contact"}>Контакты</Link>
            <Link to={"/promotions"}>Акции</Link>
            <Link to={"/shops"}>Магазины</Link>
          </nav>

          <nav className="flex flex-col xsSm:hidden pt-[40px] cursor-pointer">
            <div className="border-t border-t-basic">
              <h2
                onClick={() => setShowInfo((prev) => !prev)}
                className="flex justify-between py-[16px] pl-[16px] text-[#7F7F7F] text-[14px] font-medium"
              >
                Информация{" "}
                {showInfo ? (
                  <ChevronUp className="text-lightGray" />
                ) : (
                  <ChevronDown className="text-lightGray" />
                )}
              </h2>
              {showInfo && (
                <div className="flex flex-col pl-[16px] gap-2 text-[13px] text-[#2f2f2f]">
                  <Link to={"/about"}>О компании</Link>
                  <Link to={"/contact"}>Контакты</Link>
                  <Link to={"/promotions"}>Акции</Link>
                  <Link to={"/shops"}>Магазины</Link>
                </div>
              )}
            </div>
          </nav>

          <nav className="hidden text-[14px] xsSm:flex flex-col gap-[10px] px-[10px]">
            <h2 className="font-bold">Интернет-магазин</h2>
            <Link to={"/about"}>Доставка и самовывоз</Link>
            <Link to={"/contact"}>Оплата</Link>
            <Link to={"/promotions"}>Возврат-обмен</Link>
            <Link to={"/shops"}>Новости</Link>
          </nav>

          <nav className="flex flex-col xsSm:hidden pb-[40px] cursor-pointer">
            <div className="border-t border-b border-t-basic border-b-basic">
              <h2
                onClick={() => setShowStore((prev) => !prev)}
                className="flex justify-between py-[16px] pl-[16px] text-[#7F7F7F] text-[14px] font-medium"
              >
                Интернет-магазин{" "}
                {showStore ? (
                  <ChevronUp className="text-lightGray" />
                ) : (
                  <ChevronDown className="text-lightGray" />
                )}
              </h2>
              {showStore && (
                <div className="flex flex-col pl-[16px] gap-2 text-[13px] text-[#2f2f2f]">
                  <Link to={"/about"}>Доставка и самовывоз</Link>
                  <Link to={"/contact"}>Оплата</Link>
                  <Link to={"/promotions"}>Возврат-обмен</Link>
                  <Link to={"/shops"}>Новости</Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex gap-[30px] lg:gap-[37px] justify-center items-center px-[10px]">
            <Link to={"/"}>
              <Instagram className="text-main" size={30} />
            </Link>
            <Link to={"/"}>
              <Twitter className="text-main" size={30} />
            </Link>
            <Link to={"/"}>
              <Facebook className="text-main" size={30} />
            </Link>
            <Link to={"/"}>
              <Youtube className="text-main" size={30} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col xsSm:flex-row px-[10px] gap-y-[12px] gap-x-[81px] justify-center pt-[50px] pb-[22px]">
          <Link to={"/"} className="text-[10px] text-[#48494D]">
            Договор оферты
          </Link>
          <Link to={"/"} className="text-[10px] text-[#48494D]">
            Политика обработки персональных данных
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
