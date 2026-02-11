import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="ml-32 mt-8">
      <AdminMenu />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <thead className="w-full">
            <tr className="mb-4">
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                IMAGE
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                ID
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                USER
              </th>
              <th className="py-1 text-[12px] font-semibold text-white text-left">
                DATA
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-1">
                  <img
                    src={order.orderItems[0]?.image}
                    alt={order._id}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order._id}
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order.user ? order.user.username : "N/A"}
                </td>
                <td className="p-1 text-white text-[12px] font-medium">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
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
                      View More
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

export default OrderList;
