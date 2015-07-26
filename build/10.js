"use strict";

var trie = new Trie();

var data = {
  "color": ["red", "rebecca", "blue", "cyan", "pink", "purple", "teal", "black", "white", "orange", "yellow", "green"],
  "name": ["Jack", "James", "Alex", "Adam", "Mahdi", "Josh", "Scott", "Pat", "Vincent", "Daniel", "Patrick", "Tim"],
  "app": ["Atom", "Sublime", "Firefox", "Chrome", "Safari", "Mail", "Blender", "Sketch", "Slack", "Finder", "Nightly", "Aurora", "f.lux", "LookUp", "WunderList", "Instagram", "Toggl"]
};

for (var category in data) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[category][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      var node = trie.add(item);
      node.category = category;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var input = document.querySelector('input');
var results = document.querySelector('#results');

input.addEventListener('keyup', function () {
  results.innerHTML = '';

  var nodes = trie.find(input.value);

  if (!nodes) return;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nodes.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      var category = node.category ? "- " + node.category : '';

      results.innerHTML += "<li>" + node.name + " " + category + "</li>";
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
});

NodeList.prototype.hide = function () {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var node = _step3.value;

      node.classList.add('hidden');
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
};
