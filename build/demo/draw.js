'use strict';

var WIDTH = 800;
var HEIGHT = 600;
var MARGIN = 100;

var svg = d3.select('body').append('svg').attr('width', WIDTH + MARGIN).attr('height', HEIGHT + MARGIN).attr('viewBox', '-' + MARGIN / 2 + ' -' + MARGIN / 2 + ' ' + WIDTH + ' ' + HEIGHT);

svg.append('g').attr('class', 'lines');

var tree = d3.layout.tree().size([WIDTH - MARGIN, HEIGHT - MARGIN]);

function draw(small) {
  var nodes = tree.nodes(data.root);
  var links = tree.links(nodes);

  var linkElements = svg.select('g.lines').selectAll('line').data(links);
  linkElements.exit().remove();
  linkElements.enter().append('line');

  linkElements.attr('x1', function (d) {
    return d.source.x;
  }).attr('y1', function (d) {
    return d.source.y;
  }).attr('x2', function (d) {
    return d.target.x;
  }).attr('y2', function (d) {
    return d.target.y;
  }).style('stroke', 'rgb(72, 213, 91)').style('stroke-width', '2px');

  var nodeElements = svg.selectAll('g.node').data(nodes);
  nodeElements.exit().remove();
  var nodesEnter = nodeElements.enter().append('g').attr('class', 'node');

  nodeElements.attr('transform', function (d) {
    return 'translate(' + d.x + ', ' + d.y + ')';
  }).style('font-family', 'monospace').style('font-size', (small ? '6' : '11') + 'px').attr('data-word', function (d) {
    return d.name;
  });

  nodesEnter.append('circle');

  var circles = nodeElements.selectAll('circle');
  circles.attr('r', small ? 15 : 25).style('fill', 'rgb(28, 236, 166)').style('stroke', 'rgb(17, 172, 144)').style('fill', 'rgb(28, 236, 166)').style('stroke', 'rgb(17, 172, 144)').attr('r', small ? 5 : 10).transition().ease(d3.ease('elastic')).duration(700).attr('r', small ? 15 : 25);

  nodesEnter.append('text');
  var texts = svg.selectAll('g.node text').data(nodes);

  texts.attr('dy', 5).html(function (d) {
    return '<tspan>' + d.name.split('').join('</tspan><tspan>') + '</tspan>';
  }).attr('text-anchor', 'middle').style('fill', 'white');
}
