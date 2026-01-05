import AdminLayout from "./AdminLayout";
import "../../css/admin/dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "../../css/admin/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBagShopping,
  faChartLine,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Placeholder data
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.1)",
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#1cc88a",
      },
      {
        label: "Expenses",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#e74a3b",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="cards">
          <div className="card">
            <div className="cards-icon first">
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div className="card-text">
              <h1>Users</h1>
              <span className="number">0</span>
            </div>
          </div>

          <div className="card">
            <div className="cards-icon first">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="card-text">
              <h1>Profit</h1>
              <span className="number">$0</span>
            </div>
          </div>

          <div className="card">
            <div className="cards-icon first">
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <div className="card-text">
              <h1>Orders</h1>
              <span className="number">0</span>
            </div>
          </div>

          <div className="card">
            <div className="cards-icon first">
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
            <div className="card-text">
              <h1>Income</h1>
              <span className="number">$0</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="first-chart-section">
            <div className="first-chart">
              <div className="chart-title">
                <FontAwesomeIcon icon={faBagShopping} />
                <h3>Order Count</h3>
              </div>
              <Line data={lineData} />
            </div>

            <div className="second-chart">
              <Doughnut data={doughnutData} />
            </div>
          </div>

          <div className="second-chart-section">
            <div className="third-chart">
              <div className="chart-title">
                <FontAwesomeIcon icon={faArrowTrendUp} />
                <h3>Income & Expenses</h3>
              </div>
              <Bar data={barData} />
            </div>

            <div className="browser-box">
              <table className="browser-table">
                <thead>
                  <tr>
                    <th>Browsers</th>
                    <th>Visits</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chrome</td>
                    <td>0</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>Firefox</td>
                    <td>0</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>Safari</td>
                    <td>0</td>
                    <td>0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
