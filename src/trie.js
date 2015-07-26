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

  all(search) {
    let node = this.find(search);

    if (!node) return null;

    let all = [node];

    node.children.forEach(function addToAll(child) {
      all.push(child);
      child.children.forEach(addToAll);
    });

    return all;
  }
}
