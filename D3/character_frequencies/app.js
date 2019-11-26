let width = 800;
let height = 300;
let barPadding = 10;

d3.select('#reset')
  .on('click', function() {
    d3.selectAll('.letter')
      .remove();

    d3.select('#phrase')
      .text('');

    d3.select('#count')
      .text('');
  });

d3.select('form')
  .on('submit', function() {
    d3.event.preventDefault();
    let input = d3.select('input');
    let text = input.property('value');
    let data = getFrequencies(text);

    let barWidth = width / data.length - barPadding;

    let letters = d3.select('#letters')
                      .attr('width', width)
                      .attr('height', height)
                    .selectAll(".letter")
                    .data(data, d => d.character);
    
    letters
        .classed('new', false)
      .exit()
      .remove();

    let letterEnter = letters
                      .enter()
                      .append('g')
                        .classed('letter', true)
                        .classed('new', true);

    letterEnter.append('rect');
    letterEnter.append('text');

    letterEnter.merge(letters)
      .select('rect')
        .attr('width', barWidth)
        .attr('height', d => d.count / 10 * height)
        .attr('x', (d, i) => (barWidth + barPadding) * i)
        .attr('y', d => height - d.count / 10 * height);
    
    letterEnter.merge(letters)
      .select('text')
        .attr('x', (d, i) => (barWidth + barPadding) * i + barWidth / 2)
        .attr('text-anchor', 'middle')
        .attr('y', d => height - d.count / 10 * height - 10)
        .text(d => d.character);

    d3.select('#phrase')
      .text(`Analysis of: ${text}`);

    input.property('value', '');
  });

function getFrequencies(str) {
  let sorted = str.split('').sort();
  let data = [];

  for (let i = 0; i < sorted.length; i++) {
    let last = data[data.length - 1];

    if(last && last.character === sorted[i]) last.count++;
    else data.push({ character: sorted[i], count: 1 });
  }
  return data;
}