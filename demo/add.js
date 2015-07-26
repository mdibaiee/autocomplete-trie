let data = new Trie();

data.add('go');
data.add('get');
data.add('boo');
data.add('ba');

document.addEventListener('DOMContentLoaded', () => {
  draw();
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
