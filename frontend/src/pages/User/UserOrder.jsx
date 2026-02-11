import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto ml-20 mt-4">
      <h2 className="text-[16px] font-semibold mb-3 text-white">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                IMAGE
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                ID
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                DATE
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                TOTAL
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                PAID
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                DELIVERED
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-1">
                  <img
                    src={order.orderItems[0]?.image}
                    alt={order.user}
                    className="w-12 h-12 object-cover mb-3"
                  />
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order._id}
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  ${order.totalPrice.toFixed(2)}
                </td>

                <td className="p-1 text-white text-[12px] font-medium">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-600 w-20 rounded-lg text-white text-[12px] font-semibold">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-20 rounded-lg text-white text-[12px] font-semibold">
                      Pending
                    </p>
                  )}
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-600 w-20 rounded-lg text-white text-[12px] font-semibold">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-20 rounded-lg text-white text-[12px] font-semibold">
                      Pending
                    </p>
                  )}
                </td>

                <td className="p-1 text-white text-[12px] font-medium">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-black border border-gray-700 outline-0 cursor-pointer text-[11px] font-semibold py-2 px-2 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
