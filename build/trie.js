'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Node = function Node(value, parent) {
  if (value === undefined) value = '';

  _classCallCheck(this, Node);

  this.value = value;
  this.children = [];
  this.parent = parent;
};

var Trie = (function () {
  function Trie() {
    _classCallCheck(this, Trie);

    this.root = new Node();
  }

  _createClass(Trie, [{
    key: 'add',
    value: function add(value) {
      var parent = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

      var _loop = function (i, len) {
        if (!parent.children) parent.children = [];
        var node = parent.children.find(function (child) {
          return child.value[i] === value[i];
        });

        if (!node) {
          node = new Node(value.slice(0, i + 1), parent.value);
          parent.children.push(node);
        }

        parent = node;
      };

      for (var i = 0, len = value.length; i < len; i++) {
        _loop(i, len);
      }

      return parent;
    }
  }, {
    key: 'find',
    value: function find(value) {
      var parent = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

      var _loop2 = function (i, len) {
        parent = parent.children.find(function (child) {
          return child.value[i] === value[i];
        });

        if (!parent) return {
            v: null
          };
      };

      for (var i = 0, len = value.length; i < len; i++) {
        var _ret2 = _loop2(i, len);

        if (typeof _ret2 === 'object') return _ret2.v;
      }

      return parent;
    }
  }, {
    key: 'findWords',
    value: function findWords(value) {
      var parent = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

      var top = this.find(value, parent);
      if (!top) return [];

      var words = [];

      top.children.forEach(function getWords(node) {
        if (node.category) words.push(node);
        node.children.forEach(getWords);
      });

      return words;
    }
  }]);

  return Trie;
})();
