const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 100;

let svg = d3.select('body').append('svg')
  .attr('width', WIDTH + MARGIN)
  .attr('height', HEIGHT + MARGIN)
  .attr('viewBox', `-${MARGIN / 2} -${MARGIN / 2} ${WIDTH} ${HEIGHT}`);

svg.append('g').attr('class', 'lines');

let tree = d3.layout.tree()
  .size([WIDTH - MARGIN, HEIGHT - MARGIN]);

function draw(small) {
  let nodes = tree.nodes(data.root);
  let links = tree.links(nodes);

  let linkElements = svg.select('g.lines').selectAll('line').data(links);
  linkElements.exit().remove();
  linkElements.enter().append('line');

  linkElements.attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
    .style('stroke', 'rgb(72, 213, 91)')
    .style('stroke-width', '2px');

  let nodeElements = svg.selectAll('g.node').data(nodes);
  nodeElements.exit().remove();
  let nodesEnter = nodeElements.enter().append('g').attr('class', 'node');

  nodeElements.attr('transform', d => `translate(${d.x}, ${d.y})`)
    .style('font-family', 'monospace')
    .style('font-size', (small ? '6' : '11') + 'px')
    .attr('data-word', d => d.value);

  nodesEnter.append('circle');

  let circles = nodeElements.selectAll('circle');
  circles.attr('r', small ? 15 : 25)
    .style('fill', 'rgb(28, 236, 166)')
    .style('stroke', 'rgb(17, 172, 144)')
    .style('fill', 'rgb(28, 236, 166)')
    .style('stroke', 'rgb(17, 172, 144)')
    .attr('r', small ? 5 : 10)
    .transition()
    .ease(d3.ease('elastic'))
    .duration(700)
    .attr('r', small ? 15 : 25);


  nodesEnter.append('text');
  let texts = svg.selectAll('g.node text').data(nodes);

  texts.attr('dy', 5)
    .html(d => `<tspan>${d.value.split('').join('</tspan><tspan>')}</tspan>`)
    .attr('text-anchor', 'middle')
    .style('fill', 'white');
}
