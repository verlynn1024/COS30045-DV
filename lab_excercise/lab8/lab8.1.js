const width = 800;
const height = 600;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3.geoMercator()
  .center([145, -37]) // Center on Victoria
  .scale(3500) // Scale to zoom in on Victoria 
  .translate([width / 2, height / 2]); 

const path = d3.geoPath().projection(projection);

d3.json("LGA_VIC.json").then(function(geojson) {
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "steelblue")
    .style("stroke", "white")
    .style("stroke-width", 0.5);
});