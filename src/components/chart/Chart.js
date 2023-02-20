import React from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  //create a new array of order status
  const array = [];
  orders.map((order) => {
    const { orderStatus } = order;
    array.push(orderStatus);
  });
  const getOrderStatusCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  // const x = getOrderStatusCount(array, "Order Placed...");
  // console.log(x);

  const [x1, x2, x3, x4] = [
    "Order Placed...",
    "Processing...",
    "Shipped",
    "Delivered",
  ];

  const placed = getOrderStatusCount(array, x1);
  const processing = getOrderStatusCount(array, x2);
  const shipped = getOrderStatusCount(array, x3);
  const delivered = getOrderStatusCount(array, x4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  );
};

export default Chart;
