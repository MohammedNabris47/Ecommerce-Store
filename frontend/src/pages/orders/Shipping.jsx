import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "../../components/ProgressSteps";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || " ");
  const [city, setCity] = useState(shippingAddress.city || " ");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || " ",
  );
  const [country, setCountry] = useState(shippingAddress.country || " ");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };
  return (
    <div className="container mx-auto mt-6">
      <ProgressSteps step1 step2 />

      <div className="mt-14 flex justify-around items-center flex-wrap">
        <form className="w-120" onSubmit={submitHandler}>
          <h1 className="text-[16px] font-medium text-white mb-4">Shipping</h1>
          <div className="mb-3">
            <label className="block text-white mb-1 text-[13px]">Address</label>
            <input
              type="text"
              className="w-full p-1 rounded border border-gray-700 outline-0 text-white text-[12px]"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-white mb-1 text-[13px]">City</label>
            <input
              type="text"
              className="w-full p-1 rounded border border-gray-700 outline-0 text-white text-[12px]"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-white mb-1 text-[13px]">
              Postal Code
            </label>
            <input
              type="text"
              className="w-full p-1 rounded border border-gray-700 outline-0 text-white text-[12px]"
              placeholder="Enter Postal Code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-1 text-[13px]">Country</label>
            <input
              type="text"
              className="w-full p-1 rounded border border-gray-700 outline-0 text-white text-[12px]"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-white mb-1 text-[13px]">
              Select Method
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className=" form-radio cursor-pointer"
                  placeholder="Enter Address"
                  name="paymentMethod"
                  value={"PayPal"}
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2 text-white text-[12px]">
                  PayPal or Credit Card
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="border mt-2 outline-0 cursor-pointer border-gray-700 bg-black py-1 px-2 rounded-lg text-white w-full text-[12px] font-semibold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
