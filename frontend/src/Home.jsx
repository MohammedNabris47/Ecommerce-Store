import { Link, useParams } from "react-router";
import Header from "./components/Header";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Product from "./pages/Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl mt-36 ml-40 text-white font-medium">
              Special Products
            </h1>

            <Link
              to={"/shop"}
              className="bg-white text-black text-[12px] rounded-lg px-4 py-1 mt-36 mr-28 font-semibold"
            >
              Shop
            </Link>
          </div>
          <div className="flex justify-center flex-wrap mt-8">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
