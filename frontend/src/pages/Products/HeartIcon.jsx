import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import {
  addToFavorites,
  removeFromFavorite,
  setFavorites,
} from "../../redux/features/favorite/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      className="absolute top-2 right-3 cursor-pointer"
      onClick={toggleFavorite}
    >
      {isFavorite ? (
        <FaHeart className="text-white text-[11px]" />
      ) : (
        <FaRegHeart className="text-white text-[11px]" />
      )}
    </div>
  );
};

export default HeartIcon;
