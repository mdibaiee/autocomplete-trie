let data = new Trie();

let json = {
  "color": ["red", "rebecca", "blue", "cyan", "pink", "purple",
            "teal", "black", "white", "orange", "yellow", "green"],
  "name": ["Jack", "James", "Alex", "Adam", "Mahdi", "Josh", "Scott",
           "Pat", "Vincent", "Daniel", "Patrick", "Tim"],
  "app": ["Atom", "Sublime", "Firefox", "Chrome", "Safari", "Mail",
          "Blender", "Sketch", "Slack", "Finder", "Nightly", "Aurora",
          "f.lux", "LookUp", "WunderList", "Instagram", "Toggl"]
};

for (let category in json) {
  for (let item of json[category]) {
    let node = data.add(item);
    node.category = category;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  draw(true);
});
