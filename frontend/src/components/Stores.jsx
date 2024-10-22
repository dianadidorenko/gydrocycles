import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const Stores = ({ storesInfoProductPage, productData }) => {
  // Состояние для управления показом всех магазинов на маленьких экранах
  const [showAllStores, setShowAllStores] = useState(false);
  // Состояние для отслеживания ширины экрана
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем, мобильный ли экран
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Здесь 768px - условие для mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Вызов при монтировании компонента

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Количество магазинов для отображения на мобильном экране
  const visibleStores =
    isMobile && !showAllStores
      ? storesInfoProductPage.slice(0, 1)
      : storesInfoProductPage;

  return (
    <div className="flex flex-col">
      {visibleStores.map((storeInfo, index) => {
        const storeAvailability = productData.storeInfo?.find(
          (productInfo) => productInfo.storeNumber === storeInfo.storeNumber
        );

        return (
          <div
            key={index}
            className={`flex justify-center gap-[25px] md:gap-0 ${
              isMobile && "items-center"
            } text-center md:text-left md:justify-between flex-col md:flex-row py-[20px] border-b border-lightGray`}
          >
            {/* Адрес */}
            <div className="flex w-full flex-row md:flex-col justify-between max-w-[400px] md:w-[260px]">
              {storesInfoProductPage[0].addressName && index === 0 && (
                <h2 className="hidden md:mb-[41px] md:flex">
                  {storeInfo.addressName}
                </h2>
              )}
              {storeInfo.addressName && (
                <h2 className="flex justify-center text-center font-bold md:font-normal md:hidden">
                  {storeInfo.addressName}
                </h2>
              )}
              <span className="text-right max-w-[200px] xsSm:max-w-[100%] md:text-left">
                {storeInfo.address}
              </span>
            </div>

            {/* Режим работы */}
            <div className="flex w-full flex-col justify-between max-w-[400px] md:w-[200px] mdLg:w-[230px]">
              {storesInfoProductPage[0].workingDaysName && index === 0 && (
                <h2 className="hidden md:mb-[41px] md:flex">
                  {storeInfo.workingDaysName}
                </h2>
              )}
              {storeInfo.workingDaysName && (
                <h2 className="flex text-left font-bold md:font-normal md:hidden">
                  {storeInfo.workingDaysName}
                </h2>
              )}
              <div className="flex w-full flex-col justify-between max-w-[400px] md:w-[250px]">
                <div className="flex justify-between gap-[10px] md:w-[170px]">
                  <span>{storeInfo.workingDays}</span>
                  <span>{storeInfo.workingHours}</span>
                </div>
                <div className="flex justify-between gap-[10px] md:w-[170px]">
                  <span>{storeInfo.weekendDays}</span>
                  <span>{storeInfo.weekendHours}</span>
                </div>
              </div>
            </div>

            {/* Доступно */}
            <div className="flex w-full flex-row md:flex-col justify-between md:justify-start max-w-[400px] md:w-[170px]">
              {storesInfoProductPage[0].availability && index === 0 && (
                <h2 className="hidden md:mb-[41px] md:flex">
                  {storeInfo.availability}
                </h2>
              )}

              {storeInfo.availability && (
                <h2 className="flex justify-center text-center font-bold md:font-normal md:hidden">
                  {storeInfo.availability}
                </h2>
              )}
              <span>
                {storeAvailability
                  ? storeAvailability.availabilityStore
                    ? storeAvailability.availabilityStore
                    : "Нет в наличии"
                  : "Нет в наличии"}
              </span>
            </div>

            {/* Количество */}
            <div className="flex w-full flex-row md:flex-col justify-between md:justify-start max-w-[400px] md:w-[100px]">
              {storesInfoProductPage[0].quantity && index === 0 && (
                <h2 className="hidden md:mb-[41px] md:flex">
                  {storeInfo.quantity}
                </h2>
              )}
              {storeInfo.quantity && (
                <h2 className="flex justify-center text-center font-bold md:font-normal md:hidden">
                  {storeInfo.quantity}
                </h2>
              )}

              <span className="">
                {storeAvailability
                  ? storeAvailability.availabilityQuantity
                    ? storeAvailability.availabilityQuantity
                    : "0"
                  : "0"}
              </span>
            </div>

            <div className="flex justify-end items-end w-full xs2:w-min">
              <button
                disabled={storeInfo.availability === 0}
                className={`text-[14px] md:text-[13px] w-full uppercase py-[10px] px-[40px] bg-accent text-white`}
              >
                Купить
              </button>
            </div>
          </div>
        );
      })}
      {/* Кнопка "Показать еще" на мобильном экране */}
      {isMobile && !showAllStores && (
        <button
          className="text-[15px] text-accent mt-[20px] underline flex justify-center"
          onClick={() => setShowAllStores(true)}
        >
          Показать все магазины <ChevronDown />
        </button>
      )}
      {isMobile && showAllStores && (
        <button
          className="text-[15px] text-accent mt-[20px] underline flex justify-center"
          onClick={() => setShowAllStores(false)}
        >
          Скрыть <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default Stores;
