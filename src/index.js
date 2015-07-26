const trie = new Trie();


const divs = document.querySelectorAll('div');
const colors = {};

for (let div of divs) {
  colors[div.className] = div;

  trie.add(div.className);
}

const input = document.querySelector('input');

input.addEventListener('keyup', () => {
  divs.hide();

  const nodes = trie.all(input.value);

  if (!nodes) return;

  for (let node of nodes) {
    const color = colors[node.value];
    if (!color) continue;

    color.classList.remove('hidden');
  }
});

NodeList.prototype.hide = function() {
  for (let node of this) {
    node.classList.add('hidden');
  }
};
