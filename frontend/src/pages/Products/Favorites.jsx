import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  return (
    <div className="ml-40">
      <h1 className="text-lg font-semibold mb-4 text-white ml-4">
        Favorite Products
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
