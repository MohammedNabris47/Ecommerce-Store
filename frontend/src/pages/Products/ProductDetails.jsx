import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { data, refetch, error, isLoading } = useGetProductDetailsQuery(id);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: createReviewLoading }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId: id, rating, comment }).unwrap();
      refetch();
      toast.success("Review Created Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Review Already Exists!");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data?.product, quantity }));
    navigate("/cart");
  };
  return (
    <>
      <div>
        <Link
          to={"/"}
          className="text-white font-semibold hover:underline ml-40 text-[13px]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-10 ml-40">
            <div>
              <img
                src={data?.product?.image}
                alt={data?.product?.name}
                className="w-full xl:w-160 lg:w-160 md:w-120 sm:w-[20rem] mr-10"
              />
              <HeartIcon product={data?.product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                {data?.product?.name}
              </h2>
              <p className="my-1 xl:w-120 lg:w-120 md:w-100 text-[#B0B0B0] text-[13px] font-medium">
                {data?.product?.description}.
              </p>
              <p className="text-xl text-white font-bold">
                ${data?.product?.price}
              </p>

              <div className="flex items-center justify-between w-[20rem]">
                <div>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {data?.product?.brand}
                  </h1>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(data?.product?.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {data?.product?.numReviews}
                  </h1>
                </div>

                <div>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {data?.product?.quantity}
                  </h1>
                  <h1 className="flex items-center mb-3 text-[12px] text-white">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {data?.product?.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <Ratings
                  value={data?.product?.rating}
                  text={`${data?.product?.numReviews} reviews`}
                />

                {data?.product?.countInStock > 0 && (
                  <div>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="p-1 border border-gray-700 bg-black text-gray-700 rounded-lg w-20 outline-0 text-[12px]"
                    >
                      {[...Array(data?.product?.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <button
                  disabled={data?.product?.countInStock === 0}
                  className="border-0 outline-0 cursor-pointer py-1 px-2 rounded-lg mt-2 md:mt-0 bg-white text-black text-[12px] font-semibold"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="container mt-20 flex flex-wrap items-start justify-between ml-30">
              <ProductTabs
                createReviewLoading={createReviewLoading}
                userInfo={userInfo}
                product={data?.product}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
