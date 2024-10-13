import { assets } from "../assets/assets";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Container from "../components/Container";
import PopularItems from "../components/PopularItems";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Banner />
      <Search />
      <Categories />
      <PopularItems />

      <Container>
        <Link to={"/parts"}>
          <div className="w-full">
            <img
              src={assets.banner2}
              alt="banner"
              className="hidden 320px:flex"
            />
            <img
              src={assets.banner2Mob}
              alt="banner"
              className="block 320px:hidden"
            />
          </div>
        </Link>
      </Container>

      <PopularItems />
    </div>
  );
};

export default Home;