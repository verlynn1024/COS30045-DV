function init() {
    // Set up the data
    const data = [30, 20, 15, 10, 10, 8, 7];

    // Set up the SVG canvas
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Set up the pie chart parameters
    const pie = d3.pie();

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Set up the arcs
    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    // Draw the arcs
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);

    // Add text labels
    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text(d => d.data);

    // Optional: Create a donut chart
    // .innerRadius(radius * 0.5)
}

// Call the init function to render the chart
window.onload = init;