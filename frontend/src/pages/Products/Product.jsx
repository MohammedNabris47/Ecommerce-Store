import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] p-2 relative ml-8">
      <div className="relative ">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] rounded"
        />

        <HeartIcon product={product} />
      </div>

      <div className="p-2">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-white text-[13px] font-medium">
              {product.name}
            </h3>
            <span className="bg-gray-300 text-black text-[12px] font-semibold px-2 py-1  rounded-lg">
              ${product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
