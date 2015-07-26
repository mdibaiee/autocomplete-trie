class Node {
  constructor(value = '', parent) {
    this.name = value;
    this.children = [];
    this.parent = parent;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(value, parent = this.root) {
    for (let i = 0, len = value.length; i < len; i++) {
      if (!parent.children) parent.children = [];
      let node = parent.children.find(child => child.name[i] === value[i]);

      if (!node) {
        node = new Node(value.slice(0, i + 1), parent.name);
        parent.children.push(node);
      }

      parent = node;
    }

    return parent;
  }

  find(value, parent = this.root) {
    for (let i = 0, len = value.length; i < len; i++) {
      parent = parent.children.find(child => child.name[i] === value[i]);

      if (!parent) return null;
    }

    return parent;
  }

  findWords(value, parent = this.root) {
    let top = this.find(value, parent);

    let words = [];

    top.children.forEach(function getWords(node) {
      if (node.category) words.push(node);
      node.children.forEach(getWords);
    });

    return words;
  }
}
