import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Box,
  Heart,
  Home,
  MapPin,
  Menu,
  Percent,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <header>
      <div className="flex flex-col justify-between">
        <div className="px-[10px] pt-[29px] pb-[13px] md:px-0 flex items-center justify-between py-[10px] md:py-[23px] font-bold">
          <Menu
            onClick={() => setShow(true)}
            className="min-w-[33px] block md:hidden"
            size={40}
          />
          <ul className="hidden md:flex items-center gap-[10px] md:gap-[25px] lg:gap-[50px]">
            <NavLink to="/shops">
              <p>Магазины</p>
            </NavLink>
            <NavLink to="/promotions">
              <p>Акции</p>
            </NavLink>
            <NavLink to="/delivery">
              <p>Доставка и оплата</p>
            </NavLink>
          </ul>

          <Link to="/">
            <img
              src={assets.logo}
              className="hidden min-w-[81px] lg:flex"
              alt="лого"
            />
            <img
              src={assets.logoMobile}
              className="flex min-w-[81px] lg:hidden h-[21px]"
              alt="лого"
            />
          </Link>

          <div className="items-baseline hidden mdLg:flex">
            <MapPin />
            <p>Одесса, ул.Толбухина 135</p>
          </div>

          <div className="flex items-center gap-[10px]">
            <Heart size={30} />
            <User size={30} />
            <ShoppingCart size={30} />
          </div>
        </div>

        <div>
          <ul className="hidden lg:flex items-center justify-between gap-[60px] bg-basic py-[14px]">
            {/* Квадроциклы */}

            <li className="relative">
              <NavLink to="/quadrocycles">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Квадроциклы
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Катера */}
            <li className="relative">
              <NavLink to="/ships">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Катера
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Гидроциклы */}
            <li className="relative">
              <NavLink to="/hydroycles">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Гидроциклы
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Лодки */}
            <li className="relative">
              <NavLink to="/boats">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Лодки
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Вездеходы */}
            <li className="relative">
              <NavLink to="/allroads">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Вездеходы
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Снегоходы */}
            <li className="relative">
              <NavLink to="/snowmobile">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Снегоходы
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Двигатели */}
            <li className="relative">
              <NavLink to="/engines">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Двигатели
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Запчасти */}
            <li className="relative">
              <NavLink to="/parts">
                {({ isActive }) => (
                  <>
                    <p
                      className={`text-gray-800 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      Запчасти
                    </p>
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          </ul>

          <ul className="flex md:hidden items-center justify-between gap-[15px] bg-basic py-[14px] px-[10px] font-bold">
            <NavLink to="/shops">
              <p className="text-[20px]">Магазины</p>
            </NavLink>
            <NavLink to="/promotions">
              <p className="text-[20px]">Акции</p>
            </NavLink>
            <NavLink to="/delivery">
              <p className="text-[20px] text-nowrap">Доставка</p>
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`h-full flex flex-col pr-[10px] max-w-[320px] absolute top-0 left-0 overflow-hidden overflow-y-scroll bg-white transition-all ${
          show ? "w-full" : "hidden -left-52"
        }`}
      >
        <div className="shadow-xl tetx-[20px] relative">
          <X
            onClick={() => setShow(false)}
            className="w-[30px] absolute right-2 top-2 cursor-pointer hover:text-accent duration-300"
          />

          <NavLink
            to={"/login"}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <User size={20} />
            <p className="text-[20px] hover:text-accent duration-300">Войти</p>
          </NavLink>
          <NavLink
            to={"/register"}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <User size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Регистрация
            </p>
          </NavLink>
          <NavLink
            to={"/favorite"}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Heart size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Избранное
            </p>
          </NavLink>
          <NavLink
            to={"/cart"}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <ShoppingCart size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Корзина
            </p>
          </NavLink>
          <NavLink
            to={"/stores"}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Home size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Магазины
            </p>
          </NavLink>
          <NavLink
            to={"/promotions"}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Percent size={20} />
            <p className="text-[20px] hover:text-accent duration-300">Акции</p>
          </NavLink>
          <NavLink
            to={"/delivery"}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Box size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Доставка и оплата
            </p>
          </NavLink>
          <NavLink
            to={"/quadrocycles"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Квадроциклы
            </p>
          </NavLink>
          <NavLink
            to={"/ships"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">Катера</p>
          </NavLink>
          <NavLink
            to={"/hydrocycles"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Гидроциклы
            </p>
          </NavLink>
          <NavLink
            to={"/allroads"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Вездеходы
            </p>
          </NavLink>
          <NavLink
            to={"/snowmobile"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Снегоходы
            </p>
          </NavLink>
          <NavLink
            to={"/engines"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Двигатели
            </p>
          </NavLink>
          <NavLink
            to={"/parts"}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Запчасти
            </p>
          </NavLink>

          <div className="mt-[65px] mb-[136px] mx-auto pl-[44px] font-bold text-[20px]">
            <p>
              Одесса, <br /> ул.Толбухина 135
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
