let width = 800;
let height = 600;
let padding = 50;
let barPadding = 1;
let data = regionData.filter(d => d.medianAge !== null);
let initialBinCount = 16;



let xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.medianAge))
                .rangeRound([padding, width - padding]);

let histogram = d3.histogram()
                    .domain(xScale.domain())
                    .thresholds(xScale.ticks())
                    .value(d => d.medianAge);

let bins = histogram(data);

let yScale = d3.scaleLinear()
                .domain([0, d3.max(bins, d => d.length)])
                .range([height - padding, padding]);

let bars = d3.select('svg')
                .attr('width', width)
                .attr('height', height);

d3.select('input')
    .property('value', bins.length)
  .on('input', function() {
    let binCount = +d3.event.target.value;
    histogram.thresholds(xScale.ticks(binCount));
    bins = histogram(data);
    yScale.domain([0, d3.max(bins, d => d.length)]);

    d3.select('.y-axis')
        .call(d3.axisLeft(yScale));
    
    d3.select('.x-axis')
        .call(d3.axisBottom(xScale)
                  .ticks(binCount))
        .selectAll('text')
          .attr('y', -3)
          .attr('x', 10)
          .attr('transform', 'rotate(90)')
          .style('text-anchor', 'start');

    let rect = bars
                  .selectAll('rect')
                  .data(bins);
                
    rect
      .exit()
      .remove();

    rect
      .enter()
        .append('rect')
      .merge(rect)
        .attr('x', d => xScale(d.x0))
        .attr('y', d => yScale(d.length))
        .attr('height', d => height - padding - yScale(d.length))
        .attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
        .attr('fill', '#9c27b0');

    d3.select('.bin-count')
        .text(`Number of bins: ${bins.length}`);

  });

bars
  .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .classed('x-axis', true)
  .call(d3.axisBottom(xScale));

bars
  .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .classed('y-axis', true)
  .call(d3.axisLeft(yScale));

bars
  .append('text')
  .attr('x', width / 2)
  .attr('y', height - 10)
  .style('text-anchor', 'middle')
  .text(`Median Age`);

bars
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - height / 2)
  .attr('y', 15)
  .style('text-anchor', 'middle')
  .text(`Frequency`);

bars
  .selectAll('.bar')
  .data(bins)
  .enter()
  .append('rect')
    .attr('x', d => xScale(d.x0))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - padding - yScale(d.length))
    .attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
    .attr('fill', '#9c27b0');