// Set the dimensions and margins of the graph
const margin = { top: 50, right: 30, bottom: 50, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Original dataset
const originalData = [
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

// New dataset
const newData = [
    {x: 2, y: 8},
    {x: 3, y: 5},
    {x: 5, y: 17},
    {x: 6, y: 6},
    {x: 6, y: 12},
    {x: 7, y: 20},
    {x: 8, y: 22},
    {x: 10, y: 11},
    {x: 5, y: 12},
    {x: 6, y: 16}
];

function createScatterPlot(containerId, data, title, xAxisLabel, yAxisLabel) {
    const svg = d3.select(containerId)
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
        .text(title);

    // Create X scale
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([0, width]);

    // Create Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
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

    // Add X-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text(xAxisLabel);

    // Add Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yAxisLabel);

    // Add dots
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3)
        .style("fill", (d, i) => i === data.length - 1 ? "red" : "green");
        // The condition i === data.length - 1 checks if the current data point is the last one in the array.
        // If the condition is true (i.e., it's the last data point), the ternary operator ? returns "red".
        // If the condition is false (i.e., it's not the last data point), the : part of the ternary operator returns "green".

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

function init() {
    // Create original scatter plot
    createScatterPlot("#chart-container", originalData, "Original Scatter Plot", "X", "Y");

    // Create new scatter plot
    createScatterPlot("#chart-container-modified", newData, "Tree Age vs Height Scatter Plot", "Tree Age (year)", "Tree Height (m)");
}

// Initialize the charts when the window loads
window.onload = init;