// Step 1: Set up the data
const dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Set up dimensions
const width = 400;
const height = 300;
const margin = { top: 40, right: 100, bottom: 30, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Step 2: Set up the stack
const stack = d3.stack()
    .keys(["apples", "oranges", "grapes"]);

const series = stack(dataset);

// Step 3: Set up the SVG
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Set up scales
const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, chartWidth])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .range([chartHeight, 0]);

// Set up color scale
const color = d3.scaleOrdinal()
    .domain(["apples", "oranges", "grapes"])
    .range(["#4daf4a", "#ff7f00", "#377eb8"]);

// Step 4: Draw the rectangles
svg.selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", (d, i) => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth());

// Add x-axis
svg.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(i => i + 1));

// Add y-axis
svg.append("g")
    .call(d3.axisLeft(yScale));

// Add legend
const legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .attr("transform", `translate(${chartWidth + 100}, 0)`)
    .selectAll("g")
    .data(["grapes", "oranges", "apples"])
    .join("g")
    .attr("transform", (d, i) => `translate(0,${i * 20})`);

legend.append("rect")
    .attr("x", -19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

legend.append("text")
    .attr("x", -24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(d => d);