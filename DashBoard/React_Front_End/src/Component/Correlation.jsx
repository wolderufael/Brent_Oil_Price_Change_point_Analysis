import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeatMap } from "@nivo/heatmap";
import { scaleSequential } from "d3-scale";
import { interpolateBlues } from "d3-scale-chromatic";

const HeatMapComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get(
        // "http://localhost:5000/api/corr_matrix"
        "https://brent-oil-price-change-point-analysis.onrender.com/api/corr_matrix"
      ) // Replace with your API endpoint
      .then((response) => {
        const rawData = response.data;

        // Transform the data into an array of objects for the heatmap
        const formattedData = Object.keys(rawData).map((key) => {
          return {
            id: key,
            data: Object.entries(rawData[key]).map(([subKey, value]) => ({
              x: subKey,
              y: value,
            })),
          };
        });

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching the correlation data:", error);
      });
  }, []);

  return (
    <div style={{ height: "500px" ,margin: "0 auto"}}>
      <p className="plot-title">Correlation Matrix</p>
      {data.length > 0 ? (
        <HeatMap
          data={data}
          width={800}
          height={500}
          keys={Object.keys(data[0].data.map((d) => d.x))}
          indexBy="id"
          margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
          colors={
            (value) =>
              scaleSequential(interpolateBlues).domain([-1, 1])(
                value * 0.5 + 0.5
              )
            // scaleSequential(interpolateBlues).domain([-1, 1])(value)
          }
          axisTop={{
            orient: "top",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "",
            legendOffset: 36,
            tickTextColor: "#e21212",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            tickTextColor: "#333",
          }}
          cellOpacity={1}
          cellBorderColor="#ffffff"
          labelTextColor="#333"
          //   cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
          //   labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
          defs={[
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(88, 5, 5, 0.1)",
              rotation: -45,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[{ id: "lines" }]}
          animate={true}
          motionConfig="wobbly"
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default HeatMapComponent;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ResponsiveHeatMap } from "@nivo/heatmap";

// const HeatMapComponent = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/api/corr_matrix") // Replace with your API endpoint
//       .then((response) => {
//         const rawData = response.data;

//         if (rawData && typeof rawData === "object") {
//           const formattedData = Object.keys(rawData).map((key) => {
//             return {
//               id: key,
//               ...rawData[key],
//             };
//           });

//           setData(formattedData);
//         } else {
//           console.error("Unexpected data format:", rawData);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching the correlation data:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Check if data is correctly formatted
//   if (loading) {
//     return <p>Loading data...</p>;
//   } else if (!data.length) {
//     return <p>No data available to display.</p>;
//   }

//   return (
//     <div style={{ height: "500px" }}>
//       <ResponsiveHeatMap
//         data={data}
//         keys={Object.keys(data[0] || {}).filter((key) => key !== "id")}
//         indexBy="id"
//         margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//         colors={{
//           type: "diverging",
//           scheme: "red_yellow_blue",
//           divergeAt: 0.5,
//           minValue: -1,
//           maxValue: 1,
//         }}
//         cellOpacity={1}
//         cellBorderColor="#ffffff"
//         axisTop={{
//           orient: "top",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: -45,
//           legend: "",
//           legendOffset: 36,
//           tickTextColor: "#333", // Darker text color for labels
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "",
//           legendOffset: -40,
//           tickTextColor: "#333", // Darker text color for labels
//         }}
//         labelTextColor={{
//           from: "color",
//           modifiers: [["darker", 1.8]],
//         }}
//         cellHoverOthersOpacity={0.25}
//         animate={true}
//         motionConfig="wobbly"
//       />
//     </div>
//   );
// };

// export default HeatMapComponent;

