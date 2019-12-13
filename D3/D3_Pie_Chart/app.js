let width = 600;
let height = 600;
let minYear = d3.min(birthData, d => d.year);
let maxYear = d3.max(birthData, d => d.year);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let monthColorScale = d3.scaleOrdinal()
                        .domain(months)
                        .range(d3.schemeCategory20);

let quarterColorScale = d3.scaleOrdinal()
                          .domain([0,3])
                          .range(d3.schemeCategory10);

let svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);
svg
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .classed('chart', true);

svg
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .classed('inner-chart', true);

svg
  .append('text')
    .classed('title', true)
    .attr('x', width / 2)
    .attr('y', 30)
    .style('font-size', '2em')
    .style('text-anchor', 'middle');

d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('value', minYear)
  .on('input', () => makeGraph(+d3.event.target.value));

makeGraph(minYear);

function makeGraph(year) {
  let yearData = birthData.filter(d => d.year === year);

  let arcs = d3.pie()
               .value(d => d.births)
               .sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));

  let innerArcs = d3.pie()
                    .value(d => d.births)
                    .sort((a,b) => a.quarter - b.quarter);

  let path = d3.arc()
               .outerRadius(width / 2 - 40)
               .innerRadius(width / 4);

  let innerPath = d3.arc()
                    .innerRadius(0)
                    .outerRadius(width / 4);

  let outer = d3.select('.chart')
                 .selectAll('.arc')
                 .data(arcs(yearData));

  let inner = d3.select('.inner-chart')
                .selectAll('.arc')
                .data(innerArcs(getDataByQuarter(yearData)));

  outer
    .enter()
    .append('path')
      .classed('arc', true)
      .attr('fill', d => monthColorScale(d.data.month))
    .merge(outer)
      .attr('d', path);

  inner
    .enter()
    .append('path')
      .classed('arc', true)
      .attr('fill', d => quarterColorScale(d.data.quarter))
    .merge(inner)
      .attr('d', innerPath);
  
  d3.select('.title')
      .text(`Births by months and quarter for year ${year}`);

}

function getDataByQuarter(data) {
  let quarterTallies = [0, 1, 2, 3].map(n => ({
    quarter: n, births: 0
  }));

  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    let quarter = Math.floor(months.indexOf(row.month) / 3);
    quarterTallies[quarter].births += row.births;
  }

  return quarterTallies;
}