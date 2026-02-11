import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaypal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [order, paypal, loadingPaypal, errorPayPal, paypalDispatch]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error.data || "Payment Failed");
      }
    });
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId).unwrap();
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"}>{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col ml-32 md:flex-row">
      <div className="md:w-2/3 pr-2">
        <div className="border gray-700 mt-4 pb-2 mb-4">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-gray-700 border-b">
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
                      Unit Price
                    </th>
                    <th className="px-1 py-1 text-left text-white text-[12px] font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, i) => (
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
                        ${item.price}
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
        </div>
      </div>

      <div className="md:w-1/3 -ml-24">
        <div className="mt-4 border-gray-700 pb-1 mb-3">
          <h2 className="text-[14px] font-medium text-white mb-4">Shipping</h2>
          <div className="mt-3 mb-3 text-white text-[12px]">
            <p className="text-white text-[12px] font-semibold">Order: </p>{" "}
            {order._id}
          </div>

          <div className="mt-3 mb-3 text-white text-[12px]">
            <p className="text-white text-[12px] font-semibold">Name: </p>{" "}
            {order.user.username}
          </div>

          <div className="mt-3 mb-3 text-white text-[12px]">
            <p className="text-white text-[12px] font-semibold">Email: </p>{" "}
            {order.user.email}
          </div>

          <div className="mt-3 mb-3 text-white text-[12px]">
            <p className="text-white text-[12px] font-semibold">Address: </p>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </div>

          <div className="mt-3 mb-3 text-white text-[12px]">
            <p className="text-white text-[12px] font-semibold">Method: </p>{" "}
            {order.paymentMethod}
          </div>

          {order.isPaid ? (
            <Message variant={"success"}>Paid on {order.paidAt}</Message>
          ) : (
            <Message variant={"danger"}>Not Paid</Message>
          )}
        </div>

        <h2 className="text-[14px] font-medium text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2 text-white text-[12px]">
          <span>Items</span>
          <span>${order.itemPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-white text-[12px]">
          <span>Shipping</span>
          <span>${order.shippingPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2 text-white text-[12px]">
          <span>Tax</span>
          <span>${order.taxPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2 text-white text-[12px]">
          <span>Total</span>
          <span>${order.totalPrice.toFixed(2)}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />} {""}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="cursor-pointer px-2 py-2 rounded-lg text-[12px] font-bold w-full bg-black border border-gray-700 outline-0 text-white"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
