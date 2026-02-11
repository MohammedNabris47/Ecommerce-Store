import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, checked, radio, products } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();

  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (categoriesQuery.data?.categories) {
      dispatch(setCategories(categoriesQuery.data.categories));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.data?.products) return;

    let filtered = [...filteredProductsQuery.data.products];

    // PRICE FILTER
    if (priceFilter) {
      const price = Number(priceFilter);
      if (!isNaN(price)) {
        filtered = filtered.filter((product) => product.price <= price);
      }
    }

    dispatch(setProducts(filtered));
  }, [checked, radio, priceFilter, filteredProductsQuery.data, dispatch]);

  const handleBrandClick = (brand) => {
    const productByBrand = filteredProductsQuery.data?.products?.filter(
      (product) => product.brand === brand,
    );

    dispatch(setProducts(productByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);

    dispatch(setChecked(updatedChecked));
  };

  //add brands unique
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data?.products
          .map((product) => product.brand)
          .filter((brand) => brand !== undefined),
      ),
    ),
  ];

  const handlePriceChange = (e) => {
    //update price filter
    setPriceFilter(e.target.value);
  };
  return (
    <>
      <div className="container mx-auto ml-25">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-2 mt-2 mb-2">
            <h2 className="text-center text-white text-[12px] bg-black rounded-full mb-2 px-2 py-1">
              Filter by Categories
            </h2>

            <div className="p-3 w-56">
              {categories.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center ml-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-3 h-3 text-white bg-black border border-gray-700 rounded cursor-pointer"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-[11px] font-medium text-white"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-center text-white text-[12px] bg-black rounded-full mb-2 px-2 py-1">
              Filter by Brands
            </h2>
            <div className="p-3">
              {uniqueBrands.map((brand, i) => (
                <div key={i}>
                  <div className="flex items-center ml-4 mb-3">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      value={brand}
                      onChange={() => handleBrandClick(brand)}
                      className="w-3 h-3 text-white bg-black border border-gray-700 rounded cursor-pointer"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-[11px] font-medium text-white"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-center text-white text-[12px] bg-black rounded-full mb-2 px-2 py-1">
              Filter by Price
            </h2>
            <div className="p-3 w-56">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-2 py-1 placeholder-gray-700 text-[12px] rounded-lg bg-black border border-gray-700 outline-0 text-white"
              />
            </div>

            <div className="p-4 pt-0">
              <button
                className="cursor-pointer border-0 outline-0 text-[12px] font-medium text-white bg-black rounded-lg w-full my-4 py-1 px-2"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="text-center text-white mb-2 text-sm font-medium">
              {products?.length} Products
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((product) => (
                  <div key={product._id} className="p-2">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
