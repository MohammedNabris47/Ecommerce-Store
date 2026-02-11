import { useEffect, useState } from "react";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Chart from "react-apexcharts";
import OrderList from "./OrderList";
const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#000"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales ($)",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesData = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesData.map((item) => item.x),
          },
        },
        series: [
          {
            name: "Sales",
            data: formattedSalesData.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);
  return (
    <div>
      <AdminMenu />
      <section className="xl:ml-32 md:ml-16 ">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-3 w-60 mt-4">
            <div className="font-bold rounded w-8 bg-white text-center p-1">
              $
            </div>
            <p className="mt-3 text-white text-[13px]">Total Sales</p>
            <h1 className="font-bold text-[14px] text-white">
              ${isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>

          <div className="rounded-lg bg-black p-3 w-60 mt-4">
            <div className="font-bold rounded w-8 bg-white text-center p-1">
              $
            </div>
            <p className="mt-3 text-white text-[13px]">Total Customers</p>
            <h1 className="font-bold text-[14px] text-white">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>

          <div className="rounded-lg bg-black p-3 w-60 mt-4">
            <div className="font-bold rounded w-8 bg-white text-center p-1">
              $
            </div>
            <p className="mt-3 text-white text-[13px]">All Orders</p>
            <h1 className="font-bold text-[14px] text-white">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-32 mt-10">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-4 -ml-32">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
