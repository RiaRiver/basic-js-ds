/* eslint-disable import/extensions */
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
          // eslint-disable-next-line no-param-reassign
          node.left = newNode;
          this.size += 1;
        }
      } else
        if (data > node.data) {
          if (node.right) {
            insertNode(node.right);
          } else {
            // eslint-disable-next-line no-param-reassign
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

      return null;
    };

    return searchNode(this.rootNode) || null;
  }

  remove(data) {
    // Functions
    const maxPair = (root) => {
      let currentMax = root || this.rootNode;
      let currentMaxParent = null;

      while (currentMax.right) {
        currentMaxParent = currentMax;
        currentMax = currentMax.right;
      }

      return { maxParent: currentMaxParent, max: currentMax };
    };

    const searchNodes = (node, parent) => {
      if (data === node.data) {
        return { node, parent };
      }

      if (data < node.data) {
        if (node.left) {
          return searchNodes(node.left, node);
        }
      } else
        if (data > node.data) {
          if (node.right) {
            return searchNodes(node.right, node);
          }
        }

      return null;
    };

    const deleteNode = (node) => {
      if (node.left && node.right) {
        const { max, maxParent } = maxPair(node.left);

        if (maxParent) maxParent.right = null;

        if (max !== node.left) max.left = node.left;

        max.right = node.right;

        return max;
      }

      if (!node.left && !node.right) {
        return null;
      }

      return node.left ? node.left : node.right;
    };

    // Main
    if (this.rootNode.data === data) {
      this.rootNode = deleteNode(this.rootNode);
      this.size -= 1;
    }

    const nodes = searchNodes(this.rootNode, null);

    if (nodes) {
      if (nodes.parent.left === nodes.node) {
        nodes.parent.left = deleteNode(nodes.node);
      } else nodes.parent.right = deleteNode(nodes.node);

      this.size -= 1;
    }
  }

  min() {
    let currentMin = this.rootNode;

    while (currentMin.left) {
      currentMin = currentMin.left;
    }

    return currentMin ? currentMin.data : null;
  }

  max() {
    let currentMax = this.rootNode;

    while (currentMax.right) {
      currentMax = currentMax.right;
    }

    return currentMax ? currentMax.data : null;
  }
}

module.exports = {
  BinarySearchTree,
};
