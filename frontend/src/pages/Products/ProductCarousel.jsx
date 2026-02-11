import Message from "../../components/Message";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slideToShow: true,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="mb-3 xl:block lg:block md:block mt-8">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="xl:w-150 lg:w-150 md:w-190 sm:w-160">
          {data.products.map(
            ({
              name,
              _id,
              image,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-75"
                />
                <div className="flex justify-between w-108">
                  <div className="mt-2">
                    <h3 className="text-white text-[13px]">{name}</h3>
                    <p className="text-white text-[13px]">${price}</p> <br />
                    <p className="text-white text-[12px]">
                      {description.substring(0, 150)}....
                    </p>
                  </div>

                  <div className="flex justify-between w-30 ml-5">
                    <div className="mt-2">
                      <h3 className="text-white text-[10px] flex items-center mb-2 w-50">
                        <FaStore className="text-white mr-2" /> Brand: {brand}
                      </h3>
                      <h3 className="text-white text-[10px] flex items-center mb-2 w-40">
                        <FaClock className="text-white mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h3>
                      <h3 className="text-white text-[10px] flex items-center mb-2 ">
                        <FaStar className="text-white mr-2" /> Reviews:{" "}
                        {numReviews}
                      </h3>
                    </div>

                    <div className="w-20  mt-2">
                      <div className="flex items-center mb-2 w-30 text-[10px] text-white">
                        <FaStar className="text-white mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </div>
                      <div className="flex items-center mb-2 w-30 text-[10px] text-white">
                        <FaShoppingCart className="text-white mr-2" /> Quantity:{" "}
                        {quantity}
                      </div>
                      <div className="flex items-center mb-2 w-30 text-[10px] text-white">
                        <FaBox className="text-white mr-2" /> In Stock:{" "}
                        {countInStock}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
