let width = 600;
let height = 600;
let padding = 50;

let data = regionData.filter(mustHaveKeys);

function mustHaveKeys(obj) {
  let keys = [
    'subscribersPer100',
    'adultLiteracyRate',
    'medianAge',
    'urbanPopulationRate'
  ];

  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}

let yScale = d3.scaleLinear()
               .domain(d3.extent(data, d => d.subscribersPer100))
               .range([height - padding, padding]);
              
let xScale = d3.scaleLinear()
               .domain(d3.extent(data, d => d.adultLiteracyRate))
               .range([padding, width - padding]);

let yAxis = d3.axisLeft(yScale)
              .tickSize(-width + 2 * padding)
              .tickSizeOuter(0);

let xAxis = d3.axisBottom(xScale)
              .tickSize(-height + 2 * padding)
              .tickSizeOuter(0);

let colorScale = d3.scaleLinear()
                   .domain(d3.extent(data, d => d.urbanPopulationRate))
                   .range(['green', 'blue']);

let radiusScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.medianAge))
                    .range([5, 30]);

let svg = d3.select('svg')
              .attr('width', width)
              .attr('height', height);

svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', d => xScale(d.adultLiteracyRate))
    .attr('cy', d => yScale(d.subscribersPer100))
    .attr('fill', d => colorScale(d.urbanPopulationRate))
    .attr('r', d => radiusScale(d.medianAge))
    .attr('stroke', '#fff');

svg
  .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

svg
  .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

svg
  .append('text')
  .attr('x', width / 2)
  .attr('y', height - padding)
  .attr('dy', padding / 2)
  .style('text-anchor', 'middle')
  .text(`Literacy Rate, Age 15 & Up`);

svg
  .append('text')
  .attr('x', width / 2)
  .attr('dy', '1em')
  .style('text-anchor', 'middle')
  .style('font-size', '2em')
  .text(`Cellular Subscriptions vs. Literacy Rate`);

svg
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - height / 2)
  .attr('dy', padding / 2)
  .style('text-anchor', 'middle')
  .text(`Cellular Subscribers per 100 People`);