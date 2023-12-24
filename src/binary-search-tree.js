const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(data) {
    this.rootNode = data ? new Node(data) : null;
    this.size = this.rootNode ? 1 : 0;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    const insertNode = (node) => {
      if (data < node.data) {
        if (node.left) {
          insertNode(node.left);
        } else {
          node.left = newNode;
          this.size += 1;
        }
      } else
        if (data > node.data) {
          if (node.right) {
            insertNode(node.right);
          } else {
            node.right = newNode;
            this.size += 1;
          }
        }
    };

    if (this.rootNode === null) {
      this.rootNode = newNode;
      this.size += 1;
    } else insertNode(this.rootNode);
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    const searchNode = (node) => {
      if (data === node.data) {
        return node;
      }

      if (data < node.data) {
        if (node.left) {
          return searchNode(node.left);
        }
      } else
        if (data > node.data) {
          if (node.right) {
            return searchNode(node.right);
          }
        }
    };

    return searchNode(this.rootNode) || null;
  }

  remove(/* data */) {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  min() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  max() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }
}

module.exports = {
  BinarySearchTree,
};
