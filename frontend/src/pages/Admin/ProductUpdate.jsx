import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id, {
    skip: !id,
  });
  console.log(data);

  const [image, setImage] = useState(data?.product?.image || "");
  const [name, setName] = useState(data?.product?.name || "");
  const [description, setDescription] = useState(
    data?.product?.description || "",
  );
  const [price, setPrice] = useState(data?.product?.price || "");
  const [category, setCategory] = useState(data?.product?.category || "");
  const [brand, setBrand] = useState(data?.product?.brand || "");
  const [stock, setStock] = useState(data?.product?.countInStock || "");
  const [quantity, setQuantity] = useState(data?.product?.quantity || "");
  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (data && data._id) {
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category?._id);
      setBrand(data.product.brand);
      setStock(data.product.countInStock);
      setQuantity(data.product.quantity);
      setImage(data.product.image);
    }
  }, [data]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("image", image);

      const res = await updateProduct({
        productId: id,
        formData,
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Product updated successfully");
        navigate("/admin/all-products");
      }

      // Rest of the code...
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?",
      );
      if (!answer) return;

      const res = await deleteProduct(id).unwrap();

      toast.success(res?.message || "Product deleted successfully");

      navigate("/admin/all-products");
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
            Update/Delete Product
          </h1>

          {image && (
            <div className="text-center">
              <img
                src={`http://localhost:3500${image}`}
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
                  className="p-2 mb-3 w-[20rem] border border-gray-700 outline-0 rounded text-white text-[12px] bg-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                className="bg-white mr-2 text-black font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className="bg-gray-800 mr-2 text-white font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
