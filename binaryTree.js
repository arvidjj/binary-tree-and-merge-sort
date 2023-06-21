class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.data.toString();
    }
}


class Tree {

    constructor(array, root = null) {
        this.array = array;
        this.root = root
    }

    _buildTree(start, end) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let tempRoot = new Node(this.array[mid]);

        tempRoot.left = this._buildTree(start, mid - 1);
        tempRoot.right = this._buildTree(mid + 1, end);

        return tempRoot;
    }

    _insert(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value > node.data) {
            node.right = this._insert(node.right, value);
        } else if (value < node.data) {
            node.left = this._insert(node.left, value);
        }

        return node;
    }

    _delete(node, value) {
        if (node === null) {
            return null;
        }

        if (value > node.data) {
            node.right = this._delete(node.right, value);
        } else if (value < node.data) {
            node.left = this._delete(node.left, value);
        } else {
            //perform deletion
            if (node.left === null && node.right === null) {
                // node has no children
                node = null;
            } else if (node.left === null) {
                // node has only right child
                node = node.right;
            } else if (node.right === null) {
                //node has only left child
                node = node.left;
            } else {
                //node has both left and right children
                let successorParent = node;
                let successor = node.right;

                while (successor.left !== null) { //recorrer hasta encontrar el menor para reemplazar
                    successorParent = successor;
                    successor = successor.left;
                }

                if (successorParent !== node) {
                    successorParent.left = successor.right;
                } else {
                    successorParent.right = successor.right;
                }

                node.data = successor.data;
            }
        }

        return node;
    }

    _find(node, value) {
        if (node.value === value) {
            return node;
        }

        if (node.value < value) {
            return this._find(node.right, value)
        } else if (node.value > value) {
            return this._find(node.left, value)
        }
    }

    levelOrder(node, func) {
        if (node === null) {
            return [];
        }

        let queue = [];
        let array = [];

        queue.push(node);

        while (queue.length !== 0) {
            let current = queue.shift();
            array.push(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        if (typeof func === 'function') {
            array.forEach(func);
        }

        return array;
    }

    inorder(root, func) {
        if (root == null) return [];

        let array = [];

        if (root.left !== null) {
            array = array.concat(this.inorder(root.left));
        }

        array.push(root.data);

        if (root.right !== null) {
            array = array.concat(this.inorder(root.right));
        }

        if (typeof func === 'function') {
            array.forEach(func);
        }

        return array;
    }


    preorder(root, func) {
        if (root == null) return [];

        let array = [];

        array.push(root.data);
        if (root.left !== null) {
            array = array.concat(this.preorder(root.left));
        }
        if (root.right !== null) {
            array = array.concat(this.preorder(root.right));
        }

        if (typeof func === 'function') {
            array.forEach(func);
        }

        return array;
    }

    postorder(root, func) {
        if (root == null) return [];

        let array = [];

        if (root.left !== null) {
            array = array.concat(this.postorder(root.left));
        }
        if (root.right !== null) {
            array = array.concat(this.postorder(root.right));
        }
        array.push(root.data);

        if (typeof func === 'function') {
            array.forEach(func);
        }

        return array;
    }

    height(node) {
        if (node === null) return -1;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (node === null) return 0;

        let depth = 0;
        let current = node;
        while (current !== this.root) {
            current = this._findParent(current, this.root);
            depth++;
        }

        return depth;
    }

    _findParent(node, current) {
        if (current === null || current === node) return null;

        if (current.left === node || current.right === node) return current;

        let parent = this._findParent(node, current.left);
        if (parent === null) {
            parent = this._findParent(node, current.right);
        }

        return parent;
    }

    isBalanced(node) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        const isLeftBalanced = this.isBalanced(node.left);
        const isRightBalanced = this.isBalanced(node.right);

        return isLeftBalanced && isRightBalanced;
    }

    storeBSTNodes(root, nodes) {
        if (root == null) return;
      
        this.storeBSTNodes(root.right, nodes); 
        nodes.push(root);
        this.storeBSTNodes(root.left, nodes); 
      }
      

    rebalance(root) {
        const nodes = [];
        this.storeBSTNodes(root, nodes);
        const n = nodes.length;
        return this._buildTree(0, n - 1, nodes);
      }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


//FOR TESTING
function script() {
    let array = [];

    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        array.push(randomNumber);
    }

    const tree = new Tree(array);

    //build tree
    tree.root = tree._buildTree(0, array.length - 1);

    //check if balanced
    if (tree.isBalanced(tree.root)) {
        console.log("Tree is balanced.")
    } else {
        console.log("Tree is unbalanced")
    }

    //print in level, pre, post and in
    const printNodeData = (node) => {
        console.log(node);
    }

    console.log("level order: ")
    tree.levelOrder(tree.root, printNodeData);
    console.log("in order: ")
    tree.inorder(tree.root, printNodeData);
    console.log("pre order: ")
    tree.preorder(tree.root, printNodeData);
    console.log("post order: ")
    tree.postorder(tree.root, printNodeData);

    array = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        array.push(randomNumber);
    }

    //ADDING NEW ITEMS
    console.log("adding new items")
    array.forEach((item, index) => {
        if (index !== 0) {
            tree._insert(tree.root, item);
        }
    });

    prettyPrint(tree.root)
    //check if balanced
    if (tree.isBalanced(tree.root)) {
        console.log("Tree is balanced.")
    } else {
        console.log("Tree is unbalanced")
    }

    //Rebalance
    tree.root = tree.rebalance(tree.root);


    prettyPrint(tree.root)
    //check if balanced
    if (tree.isBalanced(tree.root)) {
        console.log("Tree is balanced.")
    } else {
        console.log("Tree is unbalanced")
    }

    //print in level, pre, post and in
    console.log("level order: ")
    tree.levelOrder(tree.root, printNodeData);
    console.log("in order: ")
    tree.inorder(tree.root, printNodeData);
    console.log("pre order: ")
    tree.preorder(tree.root, printNodeData);
    console.log("post order: ")
    tree.postorder(tree.root, printNodeData);
}