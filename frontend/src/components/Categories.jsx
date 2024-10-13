import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { categories } from "../assets/assets";
import Container from "../components/Container";

const Categories = () => {
  return (
    <section className="px-[10px] py-[80px]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] place-items-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`w-full max-w-[370px] min-h-[129px] flex justify-between p-[20px] gap-[13px] border border-[#CDCDCD] hover:shadow-xl transition-all duration-300 rounded-[5px] cursor-pointer ${
                index === 5 ? "pr-[45px] sm:pr-[55px]" : "pr-[20px]"
              }`}
            >
              <div className="flex flex-col justify-between">
                <h2 className="font-bold text-[23px]">{category.category}</h2>
                <Link
                  to="/"
                  className="text-[14px] text-lightGray flex items-center"
                >
                  Подробнее <ChevronRight size={16} />
                </Link>
              </div>
              <div className="flex items-end sm:justify-normal">
                <img
                  src={category.category_image}
                  alt={category.category}
                  className="h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
