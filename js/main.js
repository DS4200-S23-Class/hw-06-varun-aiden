// Constants for frame dimensions and the frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Constants for vis dimensions
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// Frame for first Scatter
const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Frame for second scatter
const FRAME2 = d3.select("#vis2") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Frame for third vis, bar chart
const FRAME3 = d3.select("#vis3") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Read data and create first plot
d3.csv("data/iris.csv").then((data) => {

  const MAX_X_LENGTH = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
  const MAX_Y_LENGTH = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

  // Define scale functions that maps our x data values 
  // (domain) to pixel values (range)
  const X_SCALE_LENGTH = d3.scaleLinear() 
                           .domain([0, (MAX_X_LENGTH + 1)]) // add some padding  
                           .range([0, VIS_WIDTH]); 

  // Define scale functions that maps our y data values 
  // (domain) to pixel values (range)
  const Y_SCALE_LENGTH = d3.scaleLinear() 
                           .domain([0, (MAX_Y_LENGTH + 1)]) // add some padding  
                           .range([VIS_HEIGHT, 0]); 

  // Use X_SCALE and Y_SCALE to plot our points and create value, circles
  let circles1 = FRAME1.selectAll("points") 
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "point")
        .attr("cx", (d) => { return (X_SCALE_LENGTH(d.Sepal_Length) + MARGINS.left); })
        .attr("cy", (d) => { return (Y_SCALE_LENGTH(d.Petal_Length) + MARGINS.bottom); })
        .attr("r", 4)
        .attr("fill", function (d) {
          if(d.Species === "setosa") {
            return "#00ff99"
          } else if (d.Species === "versicolor") {
            return "#ffcc99"
          } else {
            return "#99ccff"
          }
        });

  // Add x axis to vis
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE_LENGTH).ticks(10)) 
          .attr("font-size", '10px'); 

  // Add y axis to vis
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE_LENGTH).ticks(10)) 
          .attr("font-size", '10px'); 



  // Find max values
  const MAX_X_WIDTH = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
  const MAX_Y_WIDTH = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

  // Define scale functions that maps our x data values 
  // (domain) to pixel values (range)
  const X_SCALE_WIDTH = d3.scaleLinear() 
                          .domain([0, (MAX_X_WIDTH + 1)]) // add some padding  
                          .range([0, VIS_WIDTH]); 

  // Define scale functions that maps our y data values 
  // (domain) to pixel values (range)
  const Y_SCALE_WIDTH = d3.scaleLinear() 
                          .domain([0, (MAX_Y_WIDTH + 1)]) // add some padding  
                          .range([VIS_HEIGHT, 0]); 

  // Use X_SCALE and Y_SCALE to plot our points and create value, circles
  let circles2 = FRAME2.selectAll("points") 
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "point")
        .attr("cx", (d) => { return (X_SCALE_WIDTH(d.Sepal_Width) + MARGINS.left); })
        .attr("cy", (d) => { return (Y_SCALE_WIDTH(d.Petal_Width) + MARGINS.bottom); })
        .attr("r", 4)
        .attr("fill", function (d) {
          if(d.Species === "setosa") {
            return "#00ff99"
          } else if (d.Species === "versicolor") {
            return "#ffcc99"
          } else {
            return "#99ccff"
          }
        });

  // Add x axis to vis
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE_WIDTH).ticks(10)) 
          .attr("font-size", '10px'); 

  // Add y axis to vis
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.bottom + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE_WIDTH).ticks(10)) 
          .attr("font-size", '10px'); 



    // Define scale functions that maps our data x values 
    // (domain) to pixel values (range)
    const X_SCALE_SPECIES = d3.scaleBand()   
                              .range([0, VIS_WIDTH])
                              .domain(data.map((d) => { return d.Species; }))
                              .padding(0.2); 

    // Define scale functions that maps our data y values
    // (domain) to pixel values (range)
    const Y_SCALE_SPECIES = d3.scaleLinear()
                              .domain([0, 60])
                              .range([VIS_HEIGHT, 0]);

    // Use X_SCALE_SPECIES and Y_SCALE_SPECIES to plot graph
    let bars = FRAME3.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rect")
          .attr("class", "bar")  
          .attr("x", (d) => { return (X_SCALE_SPECIES(d.Species) + MARGINS.left); }) 
          .attr("y", 100) 
          .attr("width", X_SCALE_SPECIES.bandwidth())
          .attr("height", 250)
          .attr("fill", function (d) {
            if(d.Species === "setosa") {
            return "#00ff99"
          } else if (d.Species === "versicolor") {
            return "#ffcc99"
          } else {
            return "#99ccff"
          }
          });

    // Add x axis to vis
    FRAME3.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE_SPECIES).ticks(3)) 
            .attr("font-size", '10px'); 

    // Add y axis to vis
    FRAME3.append("g") 
          .attr("transform", "translate(" + MARGINS.bottom + 
                "," + (MARGINS.top) + ")") 
          .call(d3.axisLeft(Y_SCALE_SPECIES).ticks(12)) 
            .attr("font-size", '10px'); 


  // initialize brush area
  FRAME2.call(d3.brush()                 
        .extent([[0,0], [FRAME_WIDTH, FRAME_HEIGHT]])
        // when brush selection changes, update selection for all vis
        .on("start brush", update_select)
      );

  // apply style properties on selection for all vis
  function update_select(event) {
    // Get selection coordinates
    let coords = event.selection;
    
    // apply "selected" style properties to all points in selection
    circles1.classed("selected", function(d){ return brushed(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
    circles2.classed("selected", function(d){ return brushed(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
    bars.classed("selected", function(d){ return brushed(coords, (X_SCALE_WIDTH(d.Sepal_Width)+MARGINS.left), (Y_SCALE_WIDTH(d.Petal_Width)+MARGINS.bottom)) });
  }

  // check whether a point is in the selection or not
  function brushed(coords, cx, cy) {
    let x0 = coords[0][0],
        x1 = coords[1][0],
        y0 = coords[0][1],
        y1 = coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }

});
