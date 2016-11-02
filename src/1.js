const trie = new Trie();

let data = {
  "color": ["Red", "Rebecca", "Blue", "Cyan", "Pink", "Purple",
            "Teal", "Black", "White", "Orange", "Yellow", "Green"],
  "name": ["Jack", "James", "Alex", "Adam", "Mahdi", "Josh", "Scott",
           "Pat", "Vincent", "Daniel", "Patrick", "Tim"],
  "app": ["Atom", "Sublime", "Firefox", "Chrome", "Safari", "Mail",
          "Blender", "Sketch", "Slack", "Finder", "Nightly", "Aurora",
          "f.lux", "LookUp", "WunderList", "Instagram", "Toggl", "Mailbox"]
};

for (let category in data) {
  for (let item of data[category]) {
    let node = trie.add(item);
    node.category = category;
  }
}

const input = document.querySelector('input');
const results = document.querySelector('#results');

function keyup() {
  results.innerHTML = '';

  const nodes = trie.find(input.value);

  if (!nodes) return;

  for (let node of nodes.children) {
    const category = node.category ? `- ${node.category}` : '';

    results.innerHTML += `<li>${node.value} ${category}</li>`;
  }
}

input.addEventListener('keyup', keyup);

keyup();
