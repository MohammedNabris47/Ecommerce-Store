import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);

      setImage(res.image); // "/uploads/xyz.jpg"
      setImageUrl(`http://localhost:3500${res.image}`); // ✅ FIX
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("image", image); // ✅ FIX HERE

      const res = await createProduct(productData).unwrap();

      toast.success(res.message || `${res?.name}created successfully`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="container xl:mx-40 sm:mx-0">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="text-lg font-semibold mb-4 text-white ml-4">
            Create Product
          </h1>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-50"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-gray-700 px-3 block w-full text-center rounded-lg cursor-pointer font-bold py-10">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-gray-800"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name" className="text-gray-700 text-[14px]">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px]"
                />
              </div>

              <div className="ml-10">
                <label htmlFor="price" className="text-gray-700 text-[14px]">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="quantity" className="text-gray-700 text-[14px]">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px]"
                />
              </div>

              <div className="ml-10">
                <label htmlFor="brand" className="text-gray-700 text-[14px]">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px]"
                />
              </div>
            </div>

            <label htmlFor="description" className="text-gray-700 text-[14px]">
              Description
            </label>
            <br />
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 mb-3 w-[90%] border border-gray-700 outline-0 rounded text-white text-[12px]"
            />

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock" className="text-gray-700 text-[14px]">
                  Count In Stock
                </label>
                <br />
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px]"
                />
              </div>

              <div className="ml-10">
                <label htmlFor="brand" className="text-gray-700 text-[14px]">
                  Category
                </label>
                <br />
                <select
                  placeholder="Select Category"
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 bg-black rounded text-white text-[12px]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {data?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="bg-white mr-2 text-black font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
