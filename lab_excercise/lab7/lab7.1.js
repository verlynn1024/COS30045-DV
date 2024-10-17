// Set up dimensions
const margin = { top: 20, right: 20, bottom: 50, left: 70 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Load and process data
d3.csv("Unemployment_78-95.csv").then(function(data) {
    data.forEach(d => {
        d.date = new Date(d.year, d.month - 1);
        d.number = +d.number;
    });

    // Set up scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.number)])
        .range([height, 0]);

    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.number));

    // Create area generator
    const area = d3.area()
        .x(d => xScale(d.date))
        .y0(height)
        .y1(d => yScale(d.number));

    // Add area to chart
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    // Add line to chart
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add annotation line for half a million unemployed
    svg.append("line")
        .attr("class", "annotation")
        .attr("x1", 0)
        .attr("y1", yScale(500000))
        .attr("x2", width)
        .attr("y2", yScale(500000));

    // Add annotation text
    svg.append("text")
        .attr("x", 10)
        .attr("y", yScale(500000) - 5)
        .attr("fill", "red")
        .text("Half a million unemployed");
});