import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskChart() {
  const [chartData, setChartData] = useState([]);

  // Fetch task percentages from the backend
  useEffect(() => {
    const fetchTaskPercentages = async () => {
      try {
        // GET Request
        const response = await fetch("http://localhost:8080/api/v1/task/vData/percentcounttype", { method: "GET" })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching task percentages:", error);
      }
    };

    fetchTaskPercentages();
  }, []);

  // Prepare data for the doughnut chart
  const data = {
    labels: chartData.map((item) => item.type), // Task types (e.g., todo, pending, done)
    datasets: [
      {
        data: chartData.map((item) => item.count), // Percentages
        backgroundColor: ["lightgreen", "gold", "darkgrey"], // Colors for each type
        borderColor: "#fff", // White border around segments
        borderWidth: 1,
      },
    ],
  };

  // Custom options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Position the legend on the right side
        labels: {
            font: {
                size: 15
            }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
            label: function(context) {
                let label = context.raw + '%';
                return label;
            }
        } 
      }
    },
  };

  return (
    <div className="container mt-4">
      <h3>Task Distribution</h3>
      <div style={{ width: "420px", height: "420px", display: "block", marginLeft: "auto", marginRight: "auto" }}> {/* Set container size */}
        {chartData.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskChart;