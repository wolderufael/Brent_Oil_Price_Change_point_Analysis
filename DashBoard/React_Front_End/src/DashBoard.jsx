import { useState } from "react";
import PriceChart from "./Component/Timeserie_plot";
import ChangePoint from "./Component/Change_point_plot";
import HeatMapComponent from "./Component/Correlation";

const DashBoard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="search-params">
      <label className="analysis-dropdown-label" htmlFor="analysis-dropdown">
        Select Analysis
      </label>
      <select
        id="analysis-dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">-- Select an Option --</option>
        <option value="timeSeriesPlot">Time Series Plot</option>
        <option value="changePointDetection">Change Point Detection</option>
        <option value="macroIndices">Macro Economic Correlation</option>
      </select>

      {selectedOption == ("" || "timeSeriesPlot") && <PriceChart />}
      {selectedOption == "changePointDetection" && <ChangePoint />}
      {selectedOption == "macroIndices" && <HeatMapComponent />}

    </div>
  );
};

export default DashBoard;
