'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var WIDTH = 700;
  var HEIGHT = 600;
  var MARGIN = 100;

  var svg = d3.select('body').append('svg').attr('width', WIDTH + MARGIN).attr('height', HEIGHT + MARGIN).attr('viewBox', '-' + MARGIN / 2 + ' -' + MARGIN / 2 + ' ' + WIDTH + ' ' + HEIGHT);

  svg.append('g').attr('class', 'lines');

  var tree = d3.layout.tree().size([WIDTH - MARGIN, HEIGHT - MARGIN]);

  draw();

  function draw() {
    console.dir(data.root);
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
    }).style('font-family', 'monospace').style('font-size', '11px').attr('data-word', function (d) {
      return d.name;
    });

    nodesEnter.append('circle');

    var circles = nodeElements.selectAll('circle');
    circles.attr('r', 25).style('fill', 'rgb(28, 236, 166)').style('stroke', 'rgb(17, 172, 144)').style('fill', 'rgb(28, 236, 166)').style('stroke', 'rgb(17, 172, 144)').attr('r', 10).transition().ease(d3.ease('elastic')).duration(700).attr('r', 25);

    nodesEnter.append('text');
    var texts = svg.selectAll('g.node text').data(nodes);

    texts.attr('dy', 5).html(function (d) {
      return '<tspan>' + d.name.split('').join('</tspan><tspan>') + '</tspan>';
    }).attr('text-anchor', 'middle').style('fill', 'white');
  }

  // Form and other stuff

  var form = document.querySelector('form');
  var input = document.querySelector('input');
  var explain = document.querySelector('#explain');
  var explainWord = document.querySelector('#explain-word');
  var explainIndex = document.querySelector('#explain-index');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var word = input.value;

    if (!explain.checked) {
      data.add(word);
      draw();

      return;
    }

    var separated = '<span>' + word.split('').join('</span><span>') + '</span>';
    explainWord.innerHTML = separated;
    var indexLeft = explainWord.children[0].offsetLeft;
    var indexMargin = 20;
    var indexWidth = explainWord.children[0].offsetWidth + indexMargin;

    var index = 0;
    var key = '';

    var intv = setInterval(function () {
      d3.selectAll('tspan').attr('class', '');
      d3.selectAll('#explain-word span').attr('class', '');
      d3.selectAll('.node').attr('class', 'node');

      var char = word[index];

      if (!char) {
        clearInterval(intv);

        explainIndex.innerHTML = '';
        explainWord.innerHTML = '';
        return;
      }

      key += char;

      var s = explainWord.children[index];
      s.classList.add('highlight');

      explainIndex.style.left = indexLeft + index * indexWidth + 'px';
      explainIndex.innerHTML = index;

      var node = document.querySelector('[data-word="' + key + '"]');
      if (!node) {
        data.add(word.slice(0, index + 1));
        draw();

        node = document.querySelector('[data-word="' + key + '"]');
      }

      node.classList.add('highlight');

      var text = node.querySelector('text');
      text.children[index].classList.add('highlight');

      index++;
    }, 1000);
  });
});
