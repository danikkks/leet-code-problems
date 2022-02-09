function majorityElement(nums: number[]): number {
    const majorityNumber = Math.ceil(nums.length / 2);

    if (majorityNumber === 1) {
        return nums[0];
    }

    const counters = new Map();

    for (const num of nums) {
        if (!counters.get(num)) {
            counters.set(num, 1);
        } else {
            const counter = counters.get(num) + 1;

            if (counter >= majorityNumber) {
                return num;
            } else {
                counters.set(num, counter);
            }
        }
    }

    return 0;
};

console.log(majorityElement([3, 2, 3]))