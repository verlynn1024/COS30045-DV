function init() {
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

  // Initial dataset
  let dataset = [5, 10, 15, 20, 25];

  // Create scales
  const xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width])
    .paddingInner(0.05);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height, 0]);

  // Sort order flag
  let sortOrder = false;

  // Function to update the chart
  function updateChart() {
    // Update scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Select all bars
    const bars = svg.selectAll(".bar")
      .data(dataset);

    // Enter new bars
    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", width)
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d))
      .attr("fill", "slategrey")
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d));

    // Remove extra bars
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", width)
      .remove();

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

    // Add interactivity
    addInteractivity();
  }

  // Function to add interactivity
  function addInteractivity() {
    svg.selectAll(".bar")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "orange");
        
        // Add tooltip
        svg.append("text")
          .attr("class", "tooltip")
          .attr("x", parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2)
          .attr("y", parseFloat(d3.select(this).attr("y")) + 20)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .text(d);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "slategrey");
        
        // Remove tooltip
        svg.select(".tooltip").remove();
      });
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

  // Add data button functionality
  d3.select("#add-btn")
    .on("click", () => {
      const newValue = Math.floor(Math.random() * 25) + 1;
      dataset.push(newValue);
      updateChart();
    });

  // Remove data button functionality
  d3.select("#remove-btn")
    .on("click", () => {
      if (dataset.length > 1) {
        dataset.shift();
        updateChart();
      }
    });

  // Sort function
  function sortBars() {
    sortOrder = !sortOrder;
    
    dataset.sort((a, b) => sortOrder ? d3.ascending(a, b) : d3.descending(a, b));
    
    xScale.domain(d3.range(dataset.length));
    
    svg.selectAll(".bar")
      .data(dataset)
      .transition()
      .duration(1000)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("height", d => height - yScale(d));

    svg.select(".x-axis")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScale));

    addInteractivity();
  }

  // Sort button functionality
  d3.select("#sort-btn")
    .on("click", sortBars);
}

window.onload = init;