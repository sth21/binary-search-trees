const Node = (value) => {
    return { leftChild: null, value, rightChild: null};
};

const Tree = () => {
    let root;
    
    const mergeSort = (arr) => {
        if (arr.length < 2) {
            return arr;
        }
        const midPoint = Math.floor(arr.length / 2);
        const leftArr = mergeSort(arr.splice(0, midPoint));
        const rightArr = mergeSort(arr);
        let mergeArr = [];
        while (rightArr.length > 0 || leftArr.length > 0) {
            if (leftArr[0] > rightArr[0]) {
                mergeArr[mergeArr.length] = rightArr[0];
                rightArr.splice(0, 1);
            } else if (rightArr[0] > leftArr[0]) {
                mergeArr[mergeArr.length] = leftArr[0];
                leftArr.splice(0, 1);
            } else if (leftArr.length === 0) {
                mergeArr[mergeArr.length] = rightArr[0];
                rightArr.splice(0, 1);
            } else {
                mergeArr[mergeArr.length] = leftArr[0];
                leftArr.splice(0, 1);
            }
        }
        return mergeArr;
    };

    const buildTree = (array, counter = 0) => {
        // usage one: this.root = this.buildTree(array);
        // usage two: this.root = this.buildRandomizedTree();
        if (array.length < 1) return null;
        if (counter === 0) {
            array = mergeSort(array); // Sort array
            array = [...new Set(array)]; // Remove array duplicates
        }
        let midpoint = Math.floor((array.length - 1) / 2);
        let node = Node(array[midpoint]);
        node.leftChild = buildTree(array.slice(0, midpoint), counter = 1);
        node.rightChild = buildTree(array.slice(midpoint + 1, array.length), counter = 1);
        return node;
    };

    const makeRandomizedArray = () => {
        let array = [];
        for (let i = 0; i < 25; ++i) {
            const num = Math.floor(Math.random() * 25);
            array[i] = num;
        }
        array = [...new Set(array)];
        return array;
    };

    const buildRandomizedTree = () => buildTree(makeRandomizedArray());

    function insertNode (value, node = this.root) {
        if (value > node.value) {
            if (node.rightChild === null) {
                node.rightChild = Node(value)
                return;
            } else {
                insertNode(value, node = node.rightChild);
            }
        } else if (value < node.value) {
            if (node.leftChild === null) {
                node.leftChild = Node(value)
                return;
            } else {
                insertNode(value, node = node.leftChild);
            }     
        } else {
            return;
        }
    }

    function deleteNode (value, node = this.root) {
        let deletedNode = undefined;
        let deletedNodeParent;
        loop1: while (node.leftChild !== null || node.rightChild !== null) {
            if (node.value === value) {
                deletedNode = node;
                break loop1;
            } else if (value > node.value) {
                deletedNodeParent = node;
                node = node.rightChild;
            } else {
                deletedNodeParent = node;
                node = node.leftChild;
            }
        }
        if (node.value === value) deletedNode = node;
        if (deletedNode === undefined) return;
        if (deletedNode.leftChild === null && deletedNode.rightChild === null) {
            (deletedNodeParent.leftChild === deletedNode) ? deletedNodeParent.leftChild = null : deletedNodeParent.rightChild = null;
        } else if (deletedNode.leftChild !== null && deletedNode.rightChild !== null) {
            let searchNode = deletedNode.rightChild;
            let searchNodeParent;
            while (searchNode.leftChild !== null) {
                searchNodeParent = searchNode;
                searchNode = searchNode.leftChild;
            }
            deletedNode.value = searchNode.value;
            searchNodeParent.leftChild = null;
        } else {
            (deletedNode.leftChild !== null) ? deletedNode = deletedNode.leftChild : deletedNode = deletedNode.rightChild;
        }
    }

    function find (value, node = this.root) {
        while (node.leftChild !== null || node.rightChild !== null) {
            if (value === node.value) {
                return node;
            } else if (value > node.value) {
                node = node.rightChild;
            } else {
                node = node.leftChild;
            }
        }
        return (node.value === value) ? node : null;
    }

    function levelOrder (array = []) {
        if (this.root.leftChild === null && this.root.rightChild === null) return [this.root.value];
        const queue = [this.root];
        while (queue.length > 0) {
            array[array.length] = queue[0].value;
            if (queue[0].leftChild !== null) queue[queue.length] = queue[0].leftChild;
            if (queue[0].rightChild !== null) queue[queue.length] = queue[0].rightChild;
            queue.shift();
        }
        return array;
    }

    function inorder (node = this.root, array = []) {
        if (node.leftChild === null && node.rightChild === null) {
            return array.concat([node.value]);
        }
        if (node.leftChild !== null) array = inorder(node.leftChild, array);
        array = array.concat([node.value]);
        if (node.rightChild !== null) array = inorder(node.rightChild, array);
        return array;
    }

    function preorder (node = this.root, array = []) {
        if (node.leftChild === null && node.rightChild === null) {
            return array.concat([node.value]);
        }
        array = array.concat([node.value]);
        if (node.leftChild !== null) array = preorder(node.leftChild, array);
        if (node.rightChild !== null) array = preorder(node.rightChild, array);
        return array;
    }

    function postorder (node = this.root, array = []) {
        if (node.leftChild === null && node.rightChild === null) {
            return array.concat([node.value]);
        }
        if (node.leftChild !== null) array = postorder(node.leftChild, array);
        if (node.rightChild !== null) array = postorder(node.rightChild, array);
        array = array.concat([node.value]);
        return array;
    }

    function depth (node, root = this.root, val = 0) {
        while (root.leftChild !== null || root.rightChild !== null) {
            if (node.value === root.value) {
                return val;
            } else if (node.value > root.value) {
                root = root.rightChild;
                ++val;
            } else {
                root = root.leftChild;
                ++val;
            }
            return (node.value === root.value) ? val : null;
        }
    };

    function height (node) {
        if (node === null) {
            return -1;
        } else if (node.rightChild === null && node.leftChild === null) {
            return 0;
        } else {
            const leftVal = height(node.leftChild) + 1;
            const rightVal = height(node.rightChild) + 1;
            return (leftVal > rightVal) ? leftVal : rightVal;
        }
    };

    function isBalanced (root = this.root) {
        let leftHeight = height(root.leftChild);
        let rightHeight = height(root.rightChild);
        return (leftHeight - rightHeight > 1 || leftHeight - rightHeight < -1) ? false : true;
    };

    function rebalance () {
        this.root = this.buildTree(this.preorder());
    };

    function unbalance () {
        this.insertNode(150);
        this.insertNode(200);
        this.insertNode(250);
        this.insertNode(300);
        this.insertNode(350);
    };

    function driverScript () {
        this.root = this.buildRandomizedTree();
        console.log(this.isBalanced());
        console.log(this.levelOrder());
        console.log(this.preorder());
        console.log(this.postorder());
        console.log(this.inorder());
        this.unbalance();
        console.log(this.isBalanced());
        this.rebalance();
        console.log(this.isBalanced());
        console.log(this.levelOrder());
        console.log(this.preorder());
        console.log(this.postorder());
        console.log(this.inorder());
    }

    return {
        root, 
        buildTree, 
        buildRandomizedTree, 
        insertNode, 
        deleteNode, 
        find, 
        levelOrder, 
        inorder, 
        preorder, 
        postorder, 
        height, 
        depth, 
        isBalanced, 
        rebalance, 
        unbalance, 
        driverScript,
        makeRandomizedArray 
    };
};
