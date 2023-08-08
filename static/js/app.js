// Fetch JSON data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    const names = data.names;
    const samples = data.samples;
    const dropdown = d3.select("#selDataset");

    // Populate the dropdown with sample names
    names.forEach(function(name) {
      dropdown.append("option").text(name).property("value", name);
    });

    // Function to update the chart based on selected sample
    function updateChart(selectedSample) {
      const selectedData = samples.find(sample => sample.id === selectedSample);
      const sampleValues = selectedData.sample_values.slice(0, 10).reverse();
      const otuIds = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
      const otuLabels = selectedData.otu_labels.slice(0, 10).reverse();

      const trace = {
        type: "bar",
        orientation: "h",
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        hoverinfo: "text",
      };

      const layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
      };

      const data = [trace];

      // Corrected target ID: "bar" instead of "barChart"
      Plotly.newPlot("bar", data, layout);
    }

    // Initial chart update
    updateChart(names[0]);

    // Event listener for dropdown change
    dropdown.on("change", function() {
      const selectedSample = dropdown.property("value");
      updateChart(selectedSample);
    });
  })
  .catch(function(error) {
    console.error("Error loading the JSON file:", error);
  });

 // Fetch JSON data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then(function(data) {
  const names = data.names;
  const samples = data.samples;
  const metadata = data.metadata;
  const dropdown = d3.select("#selDataset");

  // Populate the dropdown with sample names
  names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
  });

  // Function to update the charts based on selected sample
  function updateCharts(selectedSample) {
    const selectedData = samples.find(sample => sample.id === selectedSample);
    const selectedMetadata = metadata.find(sample => sample.id === parseInt(selectedSample));

    // Bubble Chart
    const traceBubble = {
      x: selectedData.otu_ids,
      y: selectedData.sample_values,
      text: selectedData.otu_labels,
      mode: "markers",
      marker: {
        size: selectedData.sample_values,
        color: selectedData.otu_ids,
        colorscale: "Earth",
      },
    };

    const layoutBubble = {
      title: "OTU Bubble Chart",
      xaxis: {
        title: "OTU ID",
        dtick: 500, // Set the interval between x-axis tick values to 500
      },
      yaxis: { title: "Sample Values" },
    };

    const dataBubble = [traceBubble];

    Plotly.newPlot("bubble", dataBubble, layoutBubble);

    // Demographic Info
    const demographicInfo = selectedMetadata ? Object.entries(selectedMetadata) : [];
    const demographicPanel = d3.select("#sample-metadata");
    demographicPanel.html(""); // Clear previous content

    demographicInfo.forEach(([key, value]) => {
      demographicPanel.append("p").text(`${key}: ${value}`);
    });
  }

  // Initial chart update
  updateCharts(names[0]);

  // Event listener for dropdown change
  dropdown.on("change", function() {
    const selectedSample = dropdown.property("value");
    updateCharts(selectedSample);
  });
})
.catch(function(error) {
  console.error("Error loading the JSON file:", error);
});


   // Gauge Chart

  // Fetch JSON data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then(function(data) {
  const names = data.names;
  const samples = data.samples;
  const metadata = data.metadata;
  const dropdown = d3.select("#selDataset");

  // Populate the dropdown with sample names
  names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
  });

  // Function to update the charts based on selected sample
  function updateCharts(selectedSample) {
    const selectedData = samples.find(sample => sample.id === selectedSample);
    const selectedMetadata = metadata.find(sample => sample.id === parseInt(selectedSample));

    // Bar Chart (similar to your existing code)
    const washingFrequency = selectedMetadata ? selectedMetadata.wfreq : 0; // Update this to get washing frequency
    const gaugeData = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency", font: { size: 16 } }, // Update the title
        gauge: {
          axis: { range: [0, 9] }, // Update the range for weekly washing frequency
          steps: [
            { range: [0, 1], color: "rgb(247, 242, 236)" },   // Color for 0
            { range: [1, 2], color: "rgb(243, 237, 227)" },   // Color for 1
            { range: [2, 3], color: "rgb(241, 234, 219)" },   // Color for 2
            { range: [3, 4], color: "rgb(232, 226, 202)" },   // Color for 3
            { range: [4, 5], color: "rgb(216, 213, 181)" },   // Color for 4
            { range: [5, 6], color: "rgb(197, 196, 165)" },   // Color for 5
            { range: [6, 7], color: "rgb(177, 178, 149)" },   // Color for 6
            { range: [7, 8], color: "rgb(157, 161, 135)" },   // Color for 7
            { range: [8, 9], color: "rgb(139, 145, 124)" }    // Color for 8-9
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: washingFrequency
          }
        }
      }
    ];

    const layoutGauge = {
      width: 400,
      height: 300,
      margin: { t: 0, b: 0 },
      paper_bgcolor: "white",
      font: { color: "darkblue", family: "Arial" }
    };

    Plotly.newPlot("gauge", gaugeData, layoutGauge);
  }

  // Initial chart update
  updateCharts(names[0]);

  // Event listener for dropdown change
  dropdown.on("change", function() {
    const selectedSample = dropdown.property("value");
    updateCharts(selectedSample);
  });
})
.catch(function(error) {
  console.error("Error loading the JSON file:", error);
});
