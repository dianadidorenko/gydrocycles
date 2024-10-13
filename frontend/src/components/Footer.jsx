import {
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [show, setShow] = useState(false);

  return (
    <footer className="bg-[#F9F9FC] pt-[42px] pb-[22px]">
      <Container>
        <div className="flex flex-col xsSm:flex-row justify-center lg:justify-between flex-wrap gap-x-[42px] px-[10px]">
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

          <nav className="flex flex-col xsSm:hidden pt-[40px]">
            <h2 className="flex justify-between py-[16px] border border-basic text-[#7F7F7F] text-[14px] font-medium">
              Информация <ChevronDown className="text-lightGray" />
            </h2>
          </nav>

          <nav className="hidden text-[14px] xsSm:flex flex-col gap-[10px] px-[10px]">
            <h2 className="font-bold">Интернет-магазин</h2>
            <Link to={"/about"}>Доставка и самовывоз</Link>
            <Link to={"/contact"}>Оплата</Link>
            <Link to={"/promotions"}>Возврат-обмен</Link>
            <Link to={"/shops"}>Новости</Link>
          </nav>

          <nav className="flex flex-col xsSm:hidden pb-[40px]">
            <h2 className="flex justify-between py-[16px] border border-basic text-[#7F7F7F] text-[14px] font-medium">
              Интернет-магазин <ChevronDown className="text-lightGray" />
            </h2>
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
      </Container>
    </footer>
  );
};

export default Footer;
