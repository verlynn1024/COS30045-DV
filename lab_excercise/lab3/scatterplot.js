// Set the dimensions and margins of the graph
const margin = { top: 50, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Dataset
const data = [
    {x: 5, y: 20},
    {x: 25, y: 67},
    {x: 85, y: 21},
    {x: 100, y: 33},
    {x: 220, y: 88},
    {x: 250, y: 50},
    {x: 330, y: 95},
    {x: 410, y: 12},
    {x: 475, y: 44},
    {x: 500, y: 90}
];

function init() {
    // Append the svg object to the body of the page
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Scaled Scatter Plot with Axis");

    // Create X scale
    const xScale = d3.scaleLinear()
        .domain([0, 500])
        .range([0, width]);

    // Create Y scale
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Create X axis
    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat(d => d);

    // Create Y axis
    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => d);

    // Add X axis to SVG
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Add Y axis to SVG
    svg.append("g")
        .call(yAxis);

    // Add dots
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3)
        .style("fill", (d, i) => i === data.length - 1 ? "red" : "green");

    // Add labels
    svg.selectAll("text.label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.x))
        .attr("y", d => yScale(d.y) - 10)
        .text(d => `${d.x},${d.y}`)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "green");
}

window.onload = init;