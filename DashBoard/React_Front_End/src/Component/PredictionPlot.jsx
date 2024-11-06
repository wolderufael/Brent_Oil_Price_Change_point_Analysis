import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClipLoader } from "react-spinners"; // Import spinner

const PredictionPlot = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePredict = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true); // Set loading to true when prediction starts

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/predict",
        "https://brent-oil-price-change-point-analysis.onrender.com/api/predict",
        {
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        }
      );
      console.log(response.data);

      const transformedData = Object.keys(response.data.Date).map((key) => ({
        date: formatDate(response.data.Date[key]),
        predicted_price: response.data["Predicted Price"][key],
      }));

      console.log("Transformed Predictions:", transformedData);
      setPredictions(transformedData);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }

    setLoading(false); // Set loading to false when prediction finishes
  };

  const chartData = {
    labels: predictions.map((prediction) => prediction.date),
    datasets: [
      {
        label: "Predicted Price",
        data: predictions.map((prediction) => prediction["predicted_price"]),
        fill: true,
        borderColor: "#080808",
        backgroundColor: "#fff",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="predict-container">
      <p className="plot-title">Predict Future Prices</p>
      <div className="date-range-container">
        <div>
          <label className="analysis-dropdown-label">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            // minDate={new Date()}
            minDate={new Date("2000-01-01")}
            maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        </div>
        <div>
          <label className="analysis-dropdown-label">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
          />
        </div>
      </div>
      <button className="predict-btn" onClick={handlePredict}>
        Get Predictions
      </button>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#5a1ee7" loading={loading} size={100} />
          <p>Loading predictions...</p>
        </div>
      ) : (
        predictions.length > 0 && (
          <div className="plot">
            <Line
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "#fff",
                    },
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: "Date", color: "red" },
                    ticks: {
                      color: "#fff",
                    },
                  },
                  y: {
                    title: { display: true, text: "Price", color: "red" },
                    ticks: {
                      color: "#fff",
                    },
                  },
                },
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default PredictionPlot;
