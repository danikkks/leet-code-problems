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

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (!nums.length) {
        return null;
    }

    const middleNumberIndex = Math.ceil((nums.length - 1) / 2);
    const middleNumber = nums[middleNumberIndex];

    const left = nums.slice(0, middleNumberIndex);
    const right = nums.slice(middleNumberIndex + 1, nums.length);

    const node = new TreeNode(
        middleNumber,
        sortedArrayToBST(left),
        sortedArrayToBST(right),
    );

    return node;
};

console.log(JSON.stringify(sortedArrayToBST([-10, -3, 0, 5, 9]), null, 4));
console.log('----------')
console.log(JSON.stringify(sortedArrayToBST([-10, -3, -1, 0, 2, 5, 9, 11]), null, 4));