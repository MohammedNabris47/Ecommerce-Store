import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProducts from "../pages/Products/SmallProducts";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-[13px] text-gray-700">{error}</p>;
  }
  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.products.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>

        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
