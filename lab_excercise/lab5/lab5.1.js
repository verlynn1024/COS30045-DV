// Set up the dimensions and margins for the chart
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create the SVG element
const svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Function to generate random data
function generateData() {
  return d3.range(10).map(() => Math.floor(Math.random() * 25) + 1);
}

// Initial dataset
let dataset = generateData();

// Create scales
const xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, width])
  .paddingInner(0.05);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([height, 0]);

// Create and update the bars
function updateChart() {
  // Update the y scale domain
  yScale.domain([0, d3.max(dataset)]);

  // Select all bars
  const bars = svg.selectAll(".bar")
    .data(dataset);

  // Enter new bars
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .merge(bars)
    .transition()
    .duration(500)
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d))
    .attr("fill", "slategrey");

  // Remove extra bars
  bars.exit().remove();

  // Update x-axis
  svg.select(".x-axis")
    .transition()
    .duration(500)
    .call(d3.axisBottom(xScale));

  // Update y-axis
  svg.select(".y-axis")
    .transition()
    .duration(500)
    .call(d3.axisLeft(yScale));
}

// Initial chart render
updateChart();

// Create x-axis
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale));

// Create y-axis
svg.append("g")
  .attr("class", "y-axis")
  .call(d3.axisLeft(yScale));

// Update button functionality
d3.select("#update-btn")
  .on("click", () => {
    dataset = generateData();
    updateChart();
  });