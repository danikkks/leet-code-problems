class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    let result: number[] = [];

    if (root.left) {
        result = result.concat(inorderTraversal(root.left))
    }

    result = result.concat(root.val);

    if (root.right) {
        result = result.concat(inorderTraversal(root.right))
    }

    // if (root.left !== null) result.push(root.left.value);

    return result;
};