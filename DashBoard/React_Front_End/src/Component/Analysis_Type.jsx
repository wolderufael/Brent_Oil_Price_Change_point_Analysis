import React, { useState } from "react";

const AnalysisType =()=> {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="analysis-dropdown">Select Analysis</label>
      <select
        id="analysis-dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">-- Select an Option --</option>
        <option value="timeSeriesPlot">Time Series Plot</option>
        <option value="changePointDetection">Change Point Detection</option>
      </select>
    </div>
  );
}

export default AnalysisType;
