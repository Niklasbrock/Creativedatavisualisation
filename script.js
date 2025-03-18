// configuration
const config = {
    canvasWidth: 1400,
    canvasHeight: 1200,
    canvasMargin: 0,
    columns: 10,
    cellWidth: 90,
    cellHeight: 110,
    imageSize: 64,
    imageSizeMax: 256,
    xOffset: 25,
    yOffset: 30,
    marginTop: 100,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50
  };

// Create SVG element inside the div with id "canvas"
var svg = d3.select("#canvas")
  .append("svg")
  .attr("width", config.canvasWidth)
  .attr("height", config.canvasHeight);

svg.append("image")
    .attr("xlink:href", "background.png")
    .attr("width", config.canvasWidth)
    .attr("height", config.canvasHeight)


const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
  };

// Load Pokémon data
d3.csv("pokedex.csv").then(pokemonData => {
  // Filter to first 151 Pokémon
  const kanto = pokemonData.filter(d => +d.id <= 151);
  
  const typeScale = d3.scaleOrdinal()
  .range(Array.from(Object.values(typeColors)))
  .domain(Array.from(Object.keys(typeColors)))

//   X Scale
    const speedScale = d3.scaleLinear()
    .range([config.canvasMargin, (config.canvasWidth - config.canvasMargin)])
    .domain([0, 150])

// Y Scale
    const weightScale = d3.scaleLinear()
    .range([config.marginTop, (config.canvasHeight - config.canvasMargin)])
    .domain([0, 3000])

// Size Scale
    const sizeScale = d3.scaleLinear()
    .range([config.imageSize, config.imageSizeMax])
    .domain([2, 88]) 

    // Add axis labels and description - this won't modify your existing scales or pokemon positioning

    // Add X-axis (Speed) label at the top
    svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("x", config.canvasWidth / 2)
    .attr("y", 20)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Speed →");

    // Add Y-axis (Weight) label on the left
    svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(20, ${config.canvasHeight / 2}) rotate(-90)`)
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("← Weight");

    // Add title
    svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "start")
    .attr("x", 20)
    .attr("y", 40)
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Pokémon Distribution by Speed and Weight");

    // Add legend for the size scale
    svg.append("text")
    .attr("x", 20)
    .attr("y", 70)
    .style("font-size", "14px")
    .text("Image size represents Pokémon height");

    // Small indicator for min/max speed
    svg.append("text")
    .attr("x", 10)
    .attr("y", 100)
    .style("font-size", "12px")
    .text("Min Speed");

    svg.append("text")
    .attr("x", config.canvasWidth - 80)
    .attr("y", 100)
    .style("font-size", "12px")
    .text("Max Speed");

    // Small indicator for min/max weight
    svg.append("text")
    .attr("x", 10)
    .attr("y", 120)
    .style("font-size", "12px")
    .text("Min Weight");

    svg.append("text")
    .attr("x", 10)
    .attr("y", config.canvasHeight - 20)
    .style("font-size", "12px")
    .text("Max Weight");

// Create places for pokemon placement on x / y  
    const graph = svg.selectAll(".pokemon-cell")
    .data(kanto)
    .enter()
    .append("g")
    .attr("class", "pokemon-cell")
    .attr("transform", d => {
        return `translate(${speedScale(d.speed)}, ${weightScale(d.weight)})`;
    });

    
  // Create group elements for each Pokémon
//   const cells = svg.selectAll(".pokemon-cell")
//     .data(kanto)
//     .enter()
//     .append("g")
//     .attr("class", "pokemon-cell")
//     .attr("transform", (d, i) => {
//       const row = Math.floor(i / config.columns);
//       const col = i % config.columns;
//       return `translate(${col * config.cellWidth + config.xOffset}, ${row * config.cellHeight + config.yOffset})`;
//     });
  
  // Add images to each cell
  graph.append("image")
    .attr("xlink:href", d => `/pokemon/${d.id}.png`)
    .attr("width", d => sizeScale(d.height))
    .attr("height", d => sizeScale(d.height))
    .attr("x", (config.cellWidth - config.imageSize) / 2)
  
  // Add text for Pokémon names to each cell
//   graph.append("text")
//     .attr("class", "pokemon-name")
//     .attr("x", config.cellWidth / 2)
//     .attr("y", config.imageSize + 15)
//     .attr("text-anchor", "middle")
//     .text(d => d.name);
// }).catch(error => {
//   console.error("Error loading the CSV file:", error);
//   d3.select("body").append("p").text("Error loading data. Check console for details.");
});