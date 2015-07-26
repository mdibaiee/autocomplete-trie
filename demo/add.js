document.addEventListener('DOMContentLoaded', () => {
  const WIDTH = 700;
  const HEIGHT = 600;
  const MARGIN = 100;

  let svg = d3.select('body').append('svg')
    .attr('width', WIDTH + MARGIN)
    .attr('height', HEIGHT + MARGIN)
    .attr('viewBox', `-${MARGIN / 2} -${MARGIN / 2} ${WIDTH} ${HEIGHT}`);

  svg.append('g').attr('class', 'lines');

  let tree = d3.layout.tree()
    .size([WIDTH - MARGIN, HEIGHT - MARGIN]);

  draw();

  function draw() {
    console.dir(data.root);
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
      .style('font-size', '11px')
      .attr('data-word', d => d.name);

    nodesEnter.append('circle');

    let circles = nodeElements.selectAll('circle');
    circles.attr('r', 25)
      .style('fill', 'rgb(28, 236, 166)')
      .style('stroke', 'rgb(17, 172, 144)')
      .style('fill', 'rgb(28, 236, 166)')
      .style('stroke', 'rgb(17, 172, 144)')
      .attr('r', 10)
      .transition()
      .ease(d3.ease('elastic'))
      .duration(700)
      .attr('r', 25);


    nodesEnter.append('text');
    let texts = svg.selectAll('g.node text').data(nodes);

    texts.attr('dy', 5)
      .html(d => `<tspan>${d.name.split('').join('</tspan><tspan>')}</tspan>`)
      .attr('text-anchor', 'middle')
      .style('fill', 'white');
  }

  // Form and other stuff

  const form = document.querySelector('form');
  const input = document.querySelector('input');
  const explain = document.querySelector('#explain');
  const explainWord = document.querySelector('#explain-word');
  const explainIndex = document.querySelector('#explain-index');

  form.addEventListener('submit', e => {
    e.preventDefault();

    let word = input.value;

    if (!explain.checked) {
      data.add(word);
      draw();

      return;
    }

    let separated = `<span>${word.split('').join('</span><span>')}</span>`;
    explainWord.innerHTML = separated;
    const indexLeft = explainWord.children[0].offsetLeft;
    const indexMargin = 20;
    const indexWidth = explainWord.children[0].offsetWidth + indexMargin;

    let index = 0;
    let key = '';

    const intv = setInterval(() => {
      d3.selectAll('tspan').attr('class', '');
      d3.selectAll('#explain-word span').attr('class', '');
      d3.selectAll('.node').attr('class', 'node');

      let char = word[index];

      if (!char) {
        clearInterval(intv);

        explainIndex.innerHTML = '';
        explainWord.innerHTML = '';
        return;
      }

      key += char;

      let s = explainWord.children[index];
      s.classList.add('highlight');

      explainIndex.style.left = `${indexLeft + index * indexWidth}px`;
      explainIndex.innerHTML = index;

      let node = document.querySelector(`[data-word="${key}"]`);
      if (!node) {
        data.add(word.slice(0, index + 1));
        draw();

        node = document.querySelector(`[data-word="${key}"]`);
      }

      node.classList.add('highlight');

      let text = node.querySelector('text');
      text.children[index].classList.add('highlight');

      index++;
    }, 1000);

  });
});
