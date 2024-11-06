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

      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default DashBoard;
