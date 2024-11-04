import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { listOfFavorites, products, currency, token, makeFavorite } =
    useContext(ShopContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await listOfFavorites(token);
        setFavorites(favoritesData || []);
      } catch (err) {
        setError("Ошибка при получении избранного");
        toast.error("Ошибка при получении избранного");
      }
    };

    fetchFavorites();
  }, [listOfFavorites, token]);

  const productsMap = products.reduce((map, product) => {
    map[product._id] = product;
    return map;
  }, {});

  const toggleFavorite = async (itemId, isFavorite) => {
    await makeFavorite(itemId, isFavorite);
    setFavorites((prev) =>
      isFavorite ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div>
      <Container>
        <h1 className="text-xl font-bold pt-6">Избранное</h1>
        {favorites.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p>Нет избранных товаров</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-10">
            {favorites.map((favoriteId) => {
              const product = productsMap[favoriteId];

              return product ? (
                <li
                  key={favoriteId}
                  className="relative cursor-pointer border rounded p-2 flex flex-col items-center justify-center text-center hover:shadow-lg duration-300 max-w-[450px] mx-auto"
                >
                  <Heart
                    onClick={() =>
                      toggleFavorite(favoriteId, favorites.includes(favoriteId))
                    }
                    color={favorites.includes(favoriteId) ? "blue" : "gray"}
                    fill={favorites.includes(favoriteId) ? "blue" : "none"}
                    className="cursor-pointer absolute right-4 top-4"
                  />
                  <img src={product.image[0]} alt={product.name} />
                  <h2 className="max-w-[250px] font-bold">{product.name}</h2>
                  <p className="text-2xl font-light">
                    {product.price !== null
                      ? `${Number(product.price).toLocaleString(
                          "ru-RU"
                        )} ${currency}`
                      : "Цена не указана"}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex flex-col items-center justify-center gap-4"
                  >
                    <button className="uppercase text-[14px] bg-accent text-white border-[3px] py-[10px] px-[20px] my-[20px]">
                      Перейти
                    </button>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
