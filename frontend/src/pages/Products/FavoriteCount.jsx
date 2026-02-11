import { useSelector } from "react-redux";

const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="bg-white text-black text-[10px] font-bold px-1  rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoriteCount;
