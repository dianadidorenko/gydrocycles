import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PagesNav = ({ title, model = "" }) => {
  return (
    <div className="flex flex-wrap items-center gap-[5px] pt-[46px] pb-[41px] px-[10px] text-lightGray text-[15px]">
      <Link to={"/"}>Главная</Link>
      <ChevronRight size={15} />

      <Link to={`${location}`}>{title}</Link>
      {model && <ChevronRight size={15} />}

      {model && <div className="flex items-center gap-[5px]">{model}</div>}
    </div>
  );
};

export default PagesNav;
