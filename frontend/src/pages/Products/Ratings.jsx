import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const fullStar = Math.floor(value);
  const halfStar = value - fullStar > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar - halfStar;
  return (
    <div className="flex items-center">
      {[...Array(fullStar)].map((_, i) => (
        <FaStar key={i} className={`text-white ml-1 text-[12px]`} />
      ))}

      {halfStar === 1 && (
        <FaStarHalfAlt className={`text-white ml-1 text-[12px]`} />
      )}
      {[...Array(emptyStar)].map((_, i) => (
        <FaRegStar key={i} className={`text-white ml-1 text-[12px]`} />
      ))}

      <span className={`rating-text text-white ml-1 text-[12px]`}>
        {text && text}
      </span>
    </div>
  );
};

export default Ratings;
