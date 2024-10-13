import p_img1 from "./p_img1.png";
import p_img2 from "./p_img2.png";
import p_img3 from "./p_img3.png";
import logo from "./logo.svg";
import logoMobile from "./logo-mobile.png";
import banner from "./banner.jpg";
import banner2 from "./banner2.png";
import banner2Mob from "./banner2-mob.png";
import engine_img1 from "./engine_img1.png";
import category_1 from "./category_1.png";
import category_2 from "./category_2.png";
import category_3 from "./category_3.png";
import category_4 from "./category_4.png";
import category_5 from "./category_5.png";
import category_6 from "./category_6.png";
import accessories_img1 from "./accessories_img1.png";
import accessories_img2 from "./accessories_img2.png";
import accessories_img3 from "./accessories_img3.png";
import parts_img1 from "./parts_img1.png";

export const assets = {
  logo,
  logoMobile,
  banner,
  banner2,
  banner2Mob,
  engine_img1,
  category_1,
  category_2,
  category_3,
  category_4,
  category_5,
  category_6,
  accessories_img1,
  accessories_img2,
  accessories_img3,
  parts_img1,
};

export const categories = [
  { category: "Квадроциклы", category_image: category_1 },
  { category: "Гидроциклы", category_image: category_2 },
  { category: "Катера", category_image: category_3 },
  { category: "Снегоходы", category_image: category_4 },
  { category: "Вездеходы", category_image: category_5 },
  { category: "Двигатели", category_image: category_6 },
];

export const products = [
  {
    _id: "1",
    name: "Гидроцикл BRP SeaDoo GTI 155hp SE Long Blue Metallic",
    code: "366666-2",
    rating: 4,
    country: "Канада",
    seats: 3,
    power: 155,
    enginePower: 0,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo GTI 155",
    priceStart: 714835,
    priceDiscount: 628843,
    promotionType: "SALE",
    maxSpeed: 0,
    availability: "В наличии",
    image: [p_img1],
    category: "Гидроциклы",
  },
  {
    _id: "2",
    name: "Гидроцикл BRP SeaDoo GTI 130hp SE Black/Mango",
    code: "377777-2",
    rating: 3,
    country: "США",
    seats: 3,
    power: 155,
    enginePower: 0,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo GTI 130",
    priceStart: 714835,
    priceDiscount: 628843,
    promotionType: "SALE",
    maxSpeed: 0,
    availability: "В наличии",
    image: [p_img2],
    category: "Гидроциклы",
  },
  {
    _id: "3",
    name: "Гидроцикл BRP SeaDoo GTI 230hp X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 155,
    enginePower: 0,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo GTI 230",
    priceStart: 714835,
    priceDiscount: 628843,
    promotionType: "NEW",
    maxSpeed: 0,
    availability: "Нет в наличии",
    image: [p_img3],
    category: "Гидроциклы",
  },
  {
    _id: "4",
    name: "Лодочный мотор Suzuki DF9.9BRS",
    brand: "Suzuki",
    category: "Моторы",
    priceStart: 128571,
    priceDiscount: 112000,
    promotionType: "АКЦИЯ",
    image: [engine_img1],
    popular: true,
    availability: "В наличии",
  },
  {
    _id: "5",
    name: "Снегоход",
    availability: "В наличии",
  },
  {
    _id: "6",
    name: "Квадроцикл",
    availability: "В наличии",
  },
  {
    _id: "7",
    name: "Катер",
    availability: "В наличии",
  },
  {
    _id: "7",
    name: "Вездеход",
    availability: "В наличии",
  },
  {
    _id: "8",
    name: "Водонепроницаемый рюкзак",
    priceStart: "9800",
    category: "Аксессуары",
    availability: "В наличии",
    image: [accessories_img1],
    popular: true,
  },
  {
    _id: "9",
    name: "Спасательный жилет BRP Men's Airflow PFD",
    priceStart: "6900",
    category: "Аксессуары",
    promotionType: "SALE",
    availability: "В наличии",
    image: [accessories_img2],
    popular: true,
  },
  {
    _id: "10",
    name: "BRP Audio-Premium System",
    priceStart: "68000",
    category: "Электроника",
    availability: "В наличии",
    image: [accessories_img3],
    popular: true,
  },
  {
    _id: "11",
    name: "Спасательное снаряжение",
    category: "Инструменты",
    promotionType: "SALE",
    availability: "Нет в наличии",
    image: [parts_img1],
    popular: true,
  },
];
