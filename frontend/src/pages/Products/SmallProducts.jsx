import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const SmallProducts = ({ product }) => {
  return (
    <div className="w-[16rem] p-2 ml-10 mt-10">
      <div className="relative -mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />

        <div className="p-2">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-[13px] text-white">{product.name}</h3>
              <span className="bg-gray-300 text-black text-[12px] font-semibold px-2 py-1  rounded-lg">
                ${product.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProducts;
