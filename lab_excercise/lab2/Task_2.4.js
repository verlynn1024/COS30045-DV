function init() {
    // Read CSV file
    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        const wombatSightings = data.map(d => ({...d, wombats: +d.wombats})); // Convert wombats to number

        createBarChart(wombatSightings);
    }).catch(error => console.error("Error loading the CSV file:", error));

    const width = 500;
    const height = 150;
    const barPadding = 3;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    function createBarChart(data) {
        // Create color scale for different shades of green
        const colorScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.wombats)])
            .range(["#e5f5e0", "#31a354"]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (width / data.length))
            .attr("y", d => height - (d.wombats * 4))
            .attr("width", width / data.length - barPadding)
            .attr("height", d => d.wombats * 4)
            .attr("fill", d => colorScale(d.wombats));

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.wombats)
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => i * (width / data.length) + (width / data.length - barPadding) / 2)
            .attr("y", d => height - (d.wombats * 4) + 15) // Position text 15 pixels below the top of the bar
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black");
    }
}

window.onload = init;