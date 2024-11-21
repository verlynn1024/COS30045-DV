const width = 800;
const height = 600;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3.geoMercator()
  .center([145, -37])
  .scale(3500)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const color = d3.scaleQuantize()
    .range([
        "#f2f0f7",
        "#cbc9e2",
        "#9e9ac8",
        "#756bb1",
        "#54278f"
    ]);

d3.csv("VIC_LGA_unemployment.csv").then(function(unemploymentData) {
  color.domain([
    0,
    d3.max(unemploymentData, d => +d.unemployed)
  ]);

  d3.json("LGA_VIC.json").then(function(geojson) {
    geojson.features.forEach(function(feature) {
      const lga = feature.properties.LGA_name;
      const lgaData = unemploymentData.find(d => d.lga === lga);
      feature.properties.unemployed = lgaData ? +lgaData.unemployed : undefined;
    });

    svg.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", d => {
        const value = d.properties.unemployed;
        return value ? color(value) : "#ccc";
      })
      .style("stroke", "white")
      .style("stroke-width", 0.5);
  }).catch(function(error) {
    console.log("Error loading GeoJSON file:", error);
  });

  d3.csv("VIC_city.csv").then(function(cityData) {
    svg.selectAll("circle")
      .data(cityData)
      .enter()
      .append("circle")
      .attr("cx", d => {
        const [lng, lat] = [+d.lng, +d.lat];
        return isNaN(lng) || isNaN(lat) ? 0 : projection([lng, lat])[0];
      })
      .attr("cy", d => {
        const [lng, lat] = [+d.lng, +d.lat];
        return isNaN(lng) || isNaN(lat) ? 0 : projection([lng, lat])[1];
      })
      .attr("r", 3)
      .style("fill", "black");
  });
});