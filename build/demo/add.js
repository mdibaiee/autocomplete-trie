'use strict';

var data = new Trie();

data.add('go');
data.add('get');
data.add('boo');
data.add('ba');

document.addEventListener('DOMContentLoaded', function () {
  draw();
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
