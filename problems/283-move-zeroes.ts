/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let counter = 0;
  let step = 0;

  while (step <= nums.length - 1 - counter) {
    if (nums[step] === 0) {
      counter++;
      nums.splice(step, 1);
      nums.push(0);
    } else {
      step++;
    }
  }
}

const array1 = [0, 1, 0, 3, 12];
moveZeroes(array1);

console.log(array1);

/*
[0, 1, 0, 3, 12]
[1, 0, 3, 12, 0]
[1, 3, 12, 0, 0]
*/
