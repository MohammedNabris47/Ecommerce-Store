import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <div className="container flex items-start justify-around flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <p className="text-[13px] text-white">
            Your Cart is Empty{" "}
            <Link to={"/shop"} className="hover:underline">
              {" "}
              Go To Shop
            </Link>
          </p>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-lg font-semibold mb-4 text-white ">
                Shopping Cart
              </h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 pb-2">
                  <div className="w-20 h-14">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full object-cover rounded h-full"
                    />
                  </div>

                  <div className="flex-1 ml-3">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-white text-[12px]"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-1 text-white text-[11px]">
                      {item.brand}
                    </div>
                    <div className="mt-1 text-white text-[11px] font-semibold">
                      ${item.price}
                    </div>
                  </div>

                  <div className="w-14">
                    <select
                      className="w-full rounded p-1 text-gray-700 outline-0 bg-black  border border-gray-700 text-[12px]"
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="cursor-pointer border-0 outline-0 text-white text-[12px]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 w-120">
                <div className="p-2 rounded-lg">
                  <h2 className="text-[15px] text-white font-semibold mb-2">
                    Items (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>

                  <div className="text-lg font-bold text-white">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0,
                      )
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-white text-black text-[12px] font-bold cursor-pointer border-0 outline-0 w-full rounded-lg px-2 py-1 mt-2"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
