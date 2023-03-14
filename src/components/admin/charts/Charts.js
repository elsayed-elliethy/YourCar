import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import useHttp from "../../../hook/use-http";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);
const Charts = ({ type }) => {
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [cars, setCars] = useState([]);
  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        loadedCars.push(ele[1]);
      });
      setCars(loadedCars);
    };
    requestFn(
      {
        url: getCars,
      },
      transformData
    );
  }, [requestFn, getCars]);
  /////////Bar Chart/////////
  const barData = [];
  for (let i = 1; i <= 12; i++) {
    const carsNum = cars.filter(
      (car) =>
        car.addedDate.slice(
          car.addedDate.indexOf("/") + 1,
          car.addedDate.lastIndexOf("/")
        ) === i.toString()
    );
    barData.push(carsNum.length);
  }
  ////
  const barOptions = {
    animation: {
      // duration: 3000,
      // easing: "easeInBounce",
    },
    // animations: {
    //   tension: {
    //     duration: 1000,
    //     easing: 'linear',
    //     from: 1,
    //     to: 0,
    //     loop: true
    //   }
    // },
    maintainAspectRatio: false,
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
  const barLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "december",
  ];
  //////////Doughnut Chart//////////
  const doughnutData = [
    cars.filter((car) => car.category === "New Cars").length,
    cars.filter((car) => car.category === "Used Cars").length,
    cars.filter((car) => car.category === "For Rent").length,
  ];

  const doughnutOptions = {
    position: "center",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const doughnutLabels = ["New cars", "Used cars", "Rent cars"];
  ////////line chart ////
  const lineData = [
    27, 35, 46, 54, 37, 39, 24, 93, 62, 54, 61, 41, 53, 45, 37, 51, 19.47, 65,
    31, 43, 27, 38, 35,
  ];

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  let lineLabels = [];
  for (let i = 1; i <= 24; i++) {
    lineLabels.push(i);
  }
  ///////////////
  return (
    <div>
      {type === "barChart" && (
        <Bar
          options={barOptions}
          data={{
            labels: barLabels,
            datasets: [
              {
                label: "# of Added Cars",
                data: barData,
                backgroundColor: "rgba(255, 70, 5, 0.5)",
                borderColor: "rgba(255, 70, 5, 1)",
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
        />
      )}
      {type === "doughnutChart" && (
        <Doughnut
          options={doughnutOptions}
          data={{
            labels: doughnutLabels,
            datasets: [
              {
                label: "# of Added Cars",
                data: doughnutData,
                backgroundColor: [
                  "rgba(255, 70, 5, 0.5)",
                  "rgba(34, 39, 50, 0.5)",
                  "rgba(43, 203, 186, 0.5)",
                ],
                borderColor: [
                  "rgba(255, 70, 5, 1)",
                  "rgba(34, 39, 50, 1)",
                  "rgba(43, 203, 186, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={300}
          width={500}
        />
      )}
      {type === "lineChart" && (
        <Line
          options={lineOptions}
          data={{
            labels: lineLabels,
            datasets: [
              {
                label: "# of Added Cars",
                data: lineData,
                backgroundColor: [
                  "rgba(255, 70, 5, 0.5)",
                  "rgba(34, 39, 50, 0.5)",
                  "rgba(43, 203, 186, 0.5)",
                ],
                borderColor: [
                  "rgba(255, 70, 5, 1)",
                  "rgba(34, 39, 50, 1)",
                  "rgba(43, 203, 186, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
        />
      )}
    </div>
  );
};

export default Charts;
