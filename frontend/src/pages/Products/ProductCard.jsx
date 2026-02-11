import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Product added to cart", {
      autoClose: 2000,
    });
  };
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow ">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] font-medium mr-2 px-2 py-0.5 rounded-full">
            {product?.brand}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="cursor-pointer w-full"
            style={{ height: "150px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="p-3">
        <div className="flex justify-between">
          <h5 className="mb-1 text-[12px] text-white">{product?.name}</h5>

          <p className="text-gray-100 font-semibold text-[12px]  bg-black/40 px-2 py-0.5 rounded">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="my-2 text-[11px] text-gray-200">
          {product?.description?.substring(0, 50)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-2 py-1 text-[11px] font-medium text-center text-white bg-black/40 rounded-lg hover:underline"
          >
            Read More →
          </Link>

          <button
            className="p-2 rounded-full cursor-pointer border-0 outline-0 text-white"
            onClick={() => addToCartHandler(product, 1)}
          >
            <AiOutlineShoppingCart size={16} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
