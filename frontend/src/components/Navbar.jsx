import { Link, NavLink } from "react-router-dom";
import { assets, navCategories } from "../assets/assets";
import {
  Box,
  Heart,
  Home,
  LogOut,
  MapPin,
  Menu,
  Package,
  Percent,
  User,
  X,
} from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);
  const [show, setShow] = useState(false);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <header>
      <div className="flex flex-col justify-between">
        <div className="px-[10px] pt-[29px] pb-[13px] md:px-0 flex items-center justify-between py-[10px] md:py-[23px] font-bold">
          <Menu
            onClick={() => setShow(true)}
            className="min-w-[33px] block mdLg:hidden"
            size={40}
          />
          <ul className="hidden mdLg:flex items-center gap-[10px] md:gap-[25px] lg:gap-[50px]">
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
            <Link to={"/favorites"}>
              <Heart size={28} className="cursor-pointer" />
            </Link>

            <div className="group relative">
              <User
                onClick={() => (token ? null : navigate("/login"))}
                size={30}
                className="cursor-pointer"
              />

              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu -right-2 top-6 pt-4 z-10">
                  <div className="flex flex-col gap-3 w-36 py-3 px-5 bg-[#eee] border border-[#b6b6b6]">
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:text-accent duration-300 flex items-center gap-2"
                    >
                      <Package size={20} /> Заказы
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-accent duration-300 flex items-center gap-2"
                    >
                      <LogOut size={20} /> Выйти
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Link to={"/cart"} className="relative">
                <FiShoppingCart size={28}  />
                {getCartCount() > 0 && (
                  <span className="absolute right-[-1px] bottom-[13px] py-[2px] px-[6px] text-center bg-accent text-white rounded-full text-[9px]">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div>
          <ul className="hidden md:flex items-center justify-between gap-[20px] lg:gap-[60px] bg-basic py-[14px]">
            {navCategories.map((category, index) => (
              <li className="relative" key={index}>
                <NavLink to={`${category.url}`}>
                  {({ isActive }) => (
                    <>
                      <p
                        className={`text-gray-800 ${
                          isActive ? "font-bold" : ""
                        }`}
                      >
                        {category.category}
                      </p>
                      {isActive && (
                        <span className="absolute left-0 right-0 bottom-[-15px] h-[2px] bg-accent" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
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
        className={`h-full flex flex-col pr-[10px] absolute top-0 left-0 z-50 overflow-hidden overflow-y-scroll bg-white transition-all ${
          show ? "w-full h-full" : "hidden -left-52"
        }`}
      >
        <div className="shadow-xl text-[20px] relative">
          <X
            onClick={() => setShow(false)}
            className="w-[30px] absolute right-2 top-2 cursor-pointer hover:text-accent duration-300"
          />

          <NavLink
            to={"/login"}
            onClick={() => setShow(false)}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <User size={20} />
            <p className="text-[20px] hover:text-accent duration-300">Войти</p>
          </NavLink>
          <NavLink
            to={"/register"}
            onClick={() => setShow(false)}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <User size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Регистрация
            </p>
          </NavLink>
          <NavLink
            to={"/favorite"}
            onClick={() => setShow(false)}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Heart size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Избранное
            </p>
          </NavLink>
          <NavLink
            to={"/cart"}
            onClick={() => setShow(false)}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <FiShoppingCart size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Корзина
            </p>
          </NavLink>
          <NavLink
            to={"/stores"}
            onClick={() => setShow(false)}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Home size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Магазины
            </p>
          </NavLink>
          <NavLink
            to={"/promotions"}
            onClick={() => setShow(false)}
            className="flex items-center gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Percent size={20} />
            <p className="text-[20px] hover:text-accent duration-300">Акции</p>
          </NavLink>
          <NavLink
            to={"/delivery"}
            onClick={() => setShow(false)}
            className="flex items-center  gap-[23px] border-b border-b-lightGray pl-[10px] pt-[46px]"
          >
            <Box size={20} />
            <p className="text-[20px] hover:text-accent duration-300">
              Доставка и оплата
            </p>
          </NavLink>
          <NavLink
            to={"/quadrocycles"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Квадроциклы
            </p>
          </NavLink>
          <NavLink
            to={"/ships"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">Катера</p>
          </NavLink>
          <NavLink
            to={"/hydrocycles"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Гидроциклы
            </p>
          </NavLink>
          <NavLink
            to={"/allroads"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Вездеходы
            </p>
          </NavLink>
          <NavLink
            to={"/snowmobile"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Снегоходы
            </p>
          </NavLink>
          <NavLink
            to={"/engines"}
            onClick={() => setShow(false)}
            className="flex gap-[23px] border-b border-b-lightGray pl-[53px] pt-[46px]"
          >
            <p className="text-[20px] hover:text-accent duration-300">
              Двигатели
            </p>
          </NavLink>
          <NavLink
            to={"/parts"}
            onClick={() => setShow(false)}
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
