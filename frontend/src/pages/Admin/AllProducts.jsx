import { Link } from "react-router";
import Loader from "../../components/Loader";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import moment from "moment";
import AdminMenu from "./AdminMenu";
const AllProducts = () => {
  const { data, isLoading, error } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-[13px]">Error Loading Products</p>;
  }

  return (
    <div className="container mx-40">
      <div className="flex flex-col md:flex-row">
        <div className="p-3 md:w-3/4">
          <h1 className="text-lg font-semibold mb-4 text-white ml-4">
            All Products ({data.products.length || 0})
          </h1>

          <div className="flex flex-wrap justify-around items-center">
            {data.products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block overflow-hidden mb-3"
              >
                <div className="flex">
                  <img
                    src={`http://localhost:3500${product.image}`}
                    alt={product.name}
                    className="w-32 object-cover h-32"
                  />

                  <div className="p-3 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-white text-sm font-semibold mb-1">
                        {product.name}
                      </h5>
                      <p className="text-gray-700 text-[13px] font-semibold">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-600 xl:w-[20rem] md:w-[15rem] sm:w-[10rem] text-[13px] mb-3">
                      {product?.description?.substring(0, 150)}...
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2 py-1 text-[12px] font-medium text-black bg-white rounded-lg">
                        Update Product →
                      </span>

                      <p className="text-[13px] text-gray-700">
                        ${product?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/4 p-3 mt-1">
        <AdminMenu />
      </div>
    </div>
  );
};

export default AllProducts;
