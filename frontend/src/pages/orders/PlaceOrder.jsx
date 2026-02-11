import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import ProgressSteps from "../../components/ProgressSteps";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate, cart.paymentMethod]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());

      navigate(`/order/${res.order._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="mt-6">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-14">
        {cart.cartItems.length === 0 ? (
          <Message>No items in cart</Message>
        ) : (
          <div className="overflow-x-auto ml-32">
            <table className="w-full border-collapse border-gray-700">
              <thead>
                <tr>
                  <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                    Image
                  </th>
                  <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                    Product
                  </th>
                  <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                    Quantity
                  </th>
                  <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                    Price
                  </th>
                  <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td className="p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="p-1 text-white text-[12px]">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>

                    <td className="p-1 text-white text-[12px]">
                      {item.quantity}
                    </td>
                    <td className="p-1 text-white text-[12px]">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="p-1 text-white text-[12px]">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 ml-32">
          <h2 className="text-[14px] font-semibold text-white mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between flex-wrap p-4 bg-[#181818]">
            <ul className="text-[12px] text-white">
              <li className="mb-0.5">
                <span className="font-semibold mb-3 text-white">Items:</span> $
                {cart?.itemPrice}
              </li>

              <li className="mb-0.5">
                <span className="font-semibold mb-3 text-white">Shipping:</span>{" "}
                ${cart?.shippingPrice}
              </li>

              <li className="mb-0.5">
                <span className="font-semibold mb-3 text-white">Tax:</span> $
                {cart?.taxPrice}
              </li>
              <li className="mb-0.5">
                <span className="font-semibold mb-3 text-white">Total:</span> $
                {cart?.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-[14px] text-white font-semibold mb-2">
                Shipping
              </h2>
              <div className="text-white text-[12px] font-medium">
                <p className={"text-white text-[13px] font-semibold"}>
                  Address:
                </p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </div>
            </div>

            <div className="text-white text-[12px] font-medium">
              <h2 className="text-[14px] text-white font-semibold mb-2">
                Payment Method
              </h2>
              <p className={"text-white text-[13px] font-semibold"}>Method:</p>
              {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="border mt-4 outline-0 cursor-pointer border-gray-700 bg-black py-2 px-2 rounded-lg text-white w-full text-[12px] font-semibold"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
