// Constants for frame dimensions and the frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Constants for vis dimensions
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// Frame for Scatter
const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

const FRAME2 = d3.select("#vis2") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Display Scatter
function displayScatter(FRAME, x, y) {
  
  // Read data and create plot
  d3.csv("data/iris.csv").then((data) => {

    // Find max values
    const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });

    console.log(d.x)

    // Define scale functions that maps our x data values 
    // (domain) to pixel values (range)
    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 1)]) // add some padding  
                      .range([0, VIS_WIDTH]); 

    // Define scale functions that maps our y data values 
    // (domain) to pixel values (range)
    const Y_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_Y + 1)]) // add some padding  
                      .range([VIS_HEIGHT, 0]); 

    // Use X_SCALE and Y_SCALE to plot our points and create value, circles
    let circles = FRAME.selectAll("points") 
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "point")
          .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); })
          .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.bottom); })
          .attr("r", 10)
          .attr("name", (d) => { return "(" + d.x + "," + d.y + ")" });

    // Add x axis to vis
    FRAME.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE).ticks(10)) 
            .attr("font-size", '20px'); 

    // Add y axis to vis
    FRAME.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + 
                "," + (MARGINS.top) + ")") 
          .call(d3.axisLeft(Y_SCALE).ticks(10)) 
            .attr("font-size", '20px'); 
    });

  }

// Display graphs
displayScatter(FRAME1, 'Petal_Length', 'Sepal_Length');
displayScatter(FRAME2, 'Petal_Width', 'Sepal_Width');