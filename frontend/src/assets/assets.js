import p_img1 from "./p_img1.png";
import p_img2 from "./p_img2.png";
import p_img3 from "./p_img3.png";
import p_img4 from "./p_img4.png";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.png";
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
import accessories_img4 from "./accessories_img4.png";
import electronics_img1 from "./electronics_img1.png";
import electronics_img2 from "./electronics_img2.png";
import electronics_img3 from "./electronics_img3.png";
import electronics_img4 from "./electronics_img4.png";
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
  accessories_img4,
  electronics_img1,
  electronics_img2,
  electronics_img3,
  electronics_img4,
  parts_img1,
};

export const categories = [
  { category: "Квадроциклы", category_image: category_1, url: "quadrocycles" },
  { category: "Гидроциклы", category_image: category_2, url: "hydrocycles" },
  { category: "Катера", category_image: category_3, url: "ships" },
  { category: "Снегоходы", category_image: category_4, url: "snowmobile" },
  { category: "Вездеходы", category_image: category_5, url: "allroads" },
  { category: "Двигатели", category_image: category_6, url: "engines" },
];

export const navCategories = [
  { category: "Квадроциклы", url: "quadrocycles" },
  { category: "Катера", url: "ships" },
  { category: "Гидроциклы", url: "hydrocycles" },
  { category: "Лодки", url: "boats" },
  { category: "Вездеходы", url: "allroads" },
  { category: "Снегоходы", url: "snowmobile" },
  { category: "Двигатели", url: "engines" },
  { category: "Запчасти", url: "parts" },
];

export const products = [
  // Гидроциклы
  {
    _id: "1",
    name: "Гидроцикл BRP SeaDoo GTI 155hp SE Long Blue Metallic",
    code: "366666-2",
    rating: 4,
    country: "Канада",
    seats: 3,
    power: 155,
    enginePower: 90,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo GTI 155",
    price: 414835,
    maxSpeed: 70,
    availability: "В наличии",
    image: [p_img1],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "2",
    name: "Гидроцикл SeaDoo Spark 3 SE Black/Mango",
    code: "377777-2",
    rating: 3,
    country: "США",
    seats: 3,
    power: 90,
    enginePower: 100,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo Spark 3",
    price: 251435,
    promotionType: "SALE",
    maxSpeed: 80,
    availability: "В наличии",
    image: [p_img2],
    category: "Гидроциклы",
    popularCategory: true,
    storeInfo: [
      {
        storeNumber: "1",
        availabilityStore: "В наличии",
        availabilityQuantity: "4",
      },
      {
        storeNumber: "2",
        availabilityStore: "В наличии",
        availabilityQuantity: "6",
      },
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "3",
    name: "Гидроцикл BRP SeaDoo GTR 230hp X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 230,
    enginePower: 110,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 4",
    model: "SeaDoo GTR 230",
    price: 316825,
    maxSpeed: 90,
    availability: "В наличии",
    image: [p_img3],
    promotionType: "HIT",
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "12",
    name: "Гидроцикл SeaDoo Spark 2 X California green",
    code: "388888-2",
    rating: 3,
    country: "Украина",
    seats: 3,
    power: 130,
    enginePower: 120,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 2",
    model: "SeaDoo Spark 2",
    price: 412935,
    promotionType: "NEW",
    maxSpeed: 150,
    availability: "Нет в наличии",
    image: [p_img4],
    category: "Гидроциклы",
    popularCategory: true,
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "13",
    name: "Гидроцикл SeaDoo Spark 90 X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 300,
    enginePower: 130,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 3",
    model: "SeaDoo Spark 90",
    price: 417815,
    maxSpeed: 200,
    availability: "В наличии",
    image: [p_img5],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "14",
    name: "Гидроцикл BRP SeaDoo GTR 230hp X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 230,
    enginePower: 140,
    engine: "Бензиновый",
    year: 2018,
    brand: "SPH",
    model: "SeaDoo GTR 230",
    price: 324535,
    maxSpeed: 250,
    availability: "В наличии",
    image: [p_img6],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "15",
    name: "Гидроцикл SeaDoo Spark 2 X California green",
    code: "388888-2",
    rating: 3,
    country: "Украина",
    seats: 3,
    power: 130,
    enginePower: 120,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 2",
    model: "SeaDoo Spark 2",
    price: 128571,
    promotionType: "NEW",
    maxSpeed: 150,
    availability: "Нет в наличии",
    image: [p_img4],
    category: "Гидроциклы",
    popularCategory: true,
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "16",
    name: "Гидроцикл SeaDoo Spark 90 X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 300,
    enginePower: 130,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 3",
    model: "SeaDoo Spark 90",
    price: 417815,
    maxSpeed: 200,
    availability: "В наличии",
    image: [p_img5],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "17",
    name: "Гидроцикл BRP SeaDoo GTR 230hp X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 230,
    enginePower: 140,
    engine: "Бензиновый",
    year: 2018,
    brand: "SPH",
    model: "SeaDoo GTR 230",
    price: 324535,
    maxSpeed: 250,
    availability: "В наличии",
    image: [p_img6],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "19",
    name: "Гидроцикл BRP SeaDoo GTI 155hp SE Long Blue Metallic",
    code: "366666-2",
    rating: 4,
    country: "Канада",
    seats: 3,
    power: 155,
    enginePower: 90,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo GTI 155",
    price: 414835,
    maxSpeed: 70,
    availability: "В наличии",
    image: [p_img1],
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "20",
    name: "Гидроцикл SeaDoo Spark 3 SE Black/Mango",
    code: "377777-2",
    rating: 3,
    country: "США",
    seats: 3,
    power: 90,
    enginePower: 100,
    engine: "Бензиновый",
    year: 2018,
    brand: "BRP",
    model: "SeaDoo Spark 3",
    price: 251435,
    promotionType: "SALE",
    maxSpeed: 80,
    availability: "В наличии",
    image: [p_img2],
    category: "Гидроциклы",
    popularCategory: true,
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  {
    _id: "21",
    name: "Гидроцикл BRP SeaDoo GTR 230hp X California green",
    code: "388888-2",
    rating: 3,
    country: "Германия",
    seats: 3,
    power: 230,
    enginePower: 110,
    engine: "Бензиновый",
    year: 2018,
    brand: "Spark 4",
    model: "SeaDoo GTR 230",
    price: 316825,
    maxSpeed: 90,
    availability: "В наличии",
    image: [p_img3],
    promotionType: "HIT",
    category: "Гидроциклы",
    storeInfo: [
      {
        storeNumber: "3",
        availabilityStore: "В наличии",
        availabilityQuantity: "2",
      },
      {
        storeNumber: "4",
        availabilityStore: "В наличии",
        availabilityQuantity: "3",
      },
    ],
  },
  // Моторы
  {
    _id: "18",
    name: "Лодочный мотор Suzuki DF9.9BRS",
    brand: "Suzuki",
    category: "Моторы",
    subCategory: "Гидроциклы",
    priceStart: 258571,
    priceDiscount: 234000,
    promotionType: "АКЦИЯ",
    image: [engine_img1],
    popular: true,
    availability: "В наличии",
  },
  {
    _id: "4",
    name: "Лодочный мотор Suzuki DF9.9BRS",
    brand: "Suzuki",
    category: "Моторы",
    subCategory: "Гидроциклы",
    priceStart: 128571,
    priceDiscount: 112000,
    promotionType: "АКЦИЯ",
    image: [engine_img1],
    popular: true,
    availability: "В наличии",
  },
  // Электроника
  {
    _id: "10",
    name: "BRP Audio-Premium System",
    priceStart: "68000",
    category: "Электроника",
    subCategory: "Гидроциклы",
    availability: "В наличии",
    image: [electronics_img4],
    popular: true,
  },
  {
    _id: "22",
    name: "BRP Audio-портативная система",
    category: "Электроника",
    subCategory: "Гидроциклы",
    promotionType: "SALE",
    availability: "Нет в наличии",
    image: [electronics_img1],
    popular: true,
  },
  {
    _id: "23",
    name: "Garmin Echomap Plus 62cv",
    priceStart: "45800",
    category: "Электроника",
    subCategory: "Гидроциклы",
    availability: "В наличии",
    image: [electronics_img2],
    popular: true,
  },
  {
    _id: "24",
    name: "RF D.E.S.S.TM Key",
    category: "Электроника",
    promotionType: "SALE",
    availability: "Нет в наличии",
    image: [electronics_img3],
    popular: true,
  },
  // Инструменты
  {
    _id: "11",
    name: "Спасательное снаряжение",
    category: "Инструменты",
    promotionType: "SALE",
    availability: "Нет в наличии",
    image: [parts_img1],
    popular: true,
  },
  // Аксессуары
  {
    _id: "8",
    name: "Водонепроницаемый рюкзак",
    priceStart: "9800",
    category: "Аксессуары",
    subCategory: "Гидроциклы",
    availability: "В наличии",
    image: [accessories_img1],
    popular: true,
  },
  {
    _id: "9",
    name: "Спасательный жилет BRP Men's Airflow PFD",
    priceStart: "6900",
    category: "Аксессуары",
    subCategory: "Гидроциклы",
    promotionType: "SALE",
    availability: "В наличии",
    image: [accessories_img2],
    popular: true,
  },
  {
    _id: "25",
    name: "Мужской костюм 3мм",
    priceStart: "7000",
    category: "Аксессуары",
    subCategory: "Гидроциклы",
    availability: "В наличии",
    image: [accessories_img4],
    popular: true,
  },
];

export const categoriesProductPage = [
  { category: "О товаре" },
  { category: "Характеристики" },
  { category: "Отзывы" },
  { category: "Самовывоз" },
  { category: "Доставка" },
  { category: "Сервис" },
  { category: "Гарантия" },
];

export const storesInfoProductPage = [
  {
    addressName: "Адрес",
    storeNumber: "1",
    address: "Одесса, ул. Проспект Шевченко 24",
    workingDaysName: "Режим работы",
    workingDays: "пн-сб:",
    weekendDays: "вс:",
    workingHours: "08:00-19:00",
    weekendHours: "09:00-17:00",
    availability: "Доступно",
    quantity: "Количество ",
  },
  {
    addressName: "Адрес",
    workingDaysName: "Режим работы",
    availability: "Доступно",
    quantity: "Количество ",
    storeNumber: "2",
    address: "Одесса, ул. Екатериненская 63/2",
    workingDays: "пн-сб:",
    weekendDays: "вс:",
    workingHours: "08:00-19:00",
    weekendHours: "09:00-17:00",
  },
  {
    addressName: "Адрес",
    workingDaysName: "Режим работы",
    availability: "Доступно",
    quantity: "Количество ",
    storeNumber: "3",
    address: "Киев, ул. Слабоженко 5",
    workingDays: "пн-сб:",
    weekendDays: "вс:",
    workingHours: "08:00-19:00",
    weekendHours: "09:00-17:00",
  },
  {
    addressName: "Адрес",
    workingDaysName: "Режим работы",
    availability: "Доступно",
    quantity: "Количество ",
    storeNumber: "4",
    address: "Львов, ул. Арнаусткая 168",
    workingDays: "пн-сб:",
    weekendDays: "вс:",
    workingHours: "08:00-19:00",
    weekendHours: "09:00-17:00",
  },
];
