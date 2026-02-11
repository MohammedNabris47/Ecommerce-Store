import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import React, { useState } from "react";
import Ratings from "./Ratings";
import SmallProducts from "./SmallProducts";
const ProductTabs = React.memo(
  ({
    createReviewLoading,
    userInfo,
    product,
    rating,
    setRating,
    comment,
    submitHandler,
    setComment,
  }) => {
    const { data, isLoading } = useGetTopProductsQuery();

    const [activeTab, setActiveTab] = useState(1);

    if (isLoading) {
      return <Loader />;
    }

    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
    return (
      <div className="flex flex-col md:flex-row">
        <section className="mr-20">
          <div
            className={`flex-1 p-2 cursor-pointer text-[13px] text-white whitespace-nowrap ${activeTab === 1 ? "font-semibold" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Write Your Review
          </div>
          <div
            className={`flex-1 p-2 cursor-pointer text-[13px] text-white whitespace-nowrap ${activeTab === 2 ? "font-semibold " : ""}`}
            onClick={() => handleTabClick(2)}
          >
            All Reviews
          </div>
          <div
            className={`flex-1  p-2 cursor-pointer text-[13px] text-white whitespace-nowrap ${activeTab === 3 ? "font-semibold " : ""}`}
            onClick={() => handleTabClick(3)}
          >
            Related Products
          </div>
        </section>

        <section>
          {activeTab === 1 && (
            <div className="mt-2">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="my-1">
                    <label
                      htmlFor="rating"
                      className="text-gray-700 text-[13px] font-medium mb-2 block"
                    >
                      Rating
                    </label>

                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="bg-black border border-gray-700 text-gray-700 text-[12px] rounded-lg p-1 xl:w-120 outline-0"
                    >
                      <option value="">Select</option>
                      <option value="1">Inferior</option>
                      <option value="2">Decent</option>
                      <option value="3">Great</option>
                      <option value="4">Excellent</option>
                      <option value="5">Exceptional</option>
                    </select>
                  </div>

                  <div className="my-1">
                    <label
                      htmlFor="comment"
                      className="text-gray-700 text-[12px] font-medium mb-1 block"
                    >
                      Comment
                    </label>

                    <textarea
                      rows={"3"}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      id="comment"
                      className="bg-black border border-gray-700 text-gray-700 text-[12px] rounded-lg p-1 xl:w-120 outline-0"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={createReviewLoading}
                    className="border-0 outline-0 cursor-pointer py-1 px-2 rounded-lg mt-2 md:mt-0 bg-white text-black text-[12px] font-semibold"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <p className="text-white text-[13px]">
                  Please <Link to={"/login"}>Sign in</Link> to write a review
                </p>
              )}
            </div>
          )}
        </section>

        <section>
          {activeTab === 2 && (
            <>
              <div>
                {product.reviews.length === 0 && (
                  <p className="text-white text-[13px]">No Reviews</p>
                )}
              </div>

              <div>
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-2 rounded-lg xl:ml-6 sm:ml-0 xl:w-200 sm:w-100 mb-3"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0] text-[13px]">
                        {review.name}
                      </strong>
                      <p className="text-[#B0B0B0] text-[11px]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <p className="text-[#B0B0B0] text-[12px] my-2">
                      {review.comment}
                    </p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section>
          {activeTab === 3 && (
            <section className="ml-20 flex flex-wrap">
              {!data ? (
                <Loader />
              ) : (
                data.products.map((product) => (
                  <div key={product._id}>
                    <SmallProducts product={product} />
                  </div>
                ))
              )}
            </section>
          )}{" "}
        </section>
      </div>
    );
  },
);

export default ProductTabs;
