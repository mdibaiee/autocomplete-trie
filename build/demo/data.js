"use strict";

var data = new Trie();

var json = {
  "color": ["Red", "Rebecca", "Blue", "Cyan", "Pink", "Purple", "Teal", "Black", "White", "Orange", "Yellow", "Green"],
  "name": ["Jack", "James", "Alex", "Adam", "Mahdi", "Josh", "Scott", "Pat", "Vincent", "Daniel", "Patrick", "Tim"],
  "app": ["Atom", "Sublime", "Firefox", "Chrome", "Safari", "Mail", "Blender", "Sketch", "Slack", "Finder", "Nightly", "Aurora", "f.lux", "LookUp", "WunderList", "Instagram", "Toggl", "Mailbox"]
};

for (var category in json) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = json[category][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      var node = data.add(item);
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

document.addEventListener('DOMContentLoaded', function () {
  draw(true);
});
