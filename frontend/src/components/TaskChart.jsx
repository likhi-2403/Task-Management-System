import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function TaskChart({ tasks }) {
  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pieData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [pending, progress, completed],
        backgroundColor: [
          "#ffc107",
          "#0dcaf0",
          "#198754",
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [pending, progress, completed],
        backgroundColor: [
          "#ffc107",
          "#0dcaf0",
          "#198754",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="row mt-5">

      <div className="col-lg-6 mb-4">

        <div className="card shadow-lg border-0">

          <div className="card-body">

            <h4 className="text-center mb-4">
              Task Distribution
            </h4>

            <div style={{ height: "320px" }}>
              <Pie data={pieData} options={options} />
            </div>

          </div>

        </div>

      </div>

      <div className="col-lg-6 mb-4">

        <div className="card shadow-lg border-0">

          <div className="card-body">

            <h4 className="text-center mb-4">
              Task Summary
            </h4>

            <div style={{ height: "320px" }}>
              <Bar data={barData} options={options} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TaskChart;