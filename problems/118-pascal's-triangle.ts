function generate(numRows: number): number[][] {
	const rows: number[][] = [];

	for (let i = 0; i < numRows; i++) {
		if (i === 0) {
			rows.push([1]);
		} else {
			const prev = rows[i - 1];
			const current = [];

			for (let [index, num] of prev.entries()) {
				if (prev[index + 1] !== undefined) {
					current.push(num + prev[index + 1]);
				}
			}

			current.unshift(1);
			current.push(1);

			console.log(prev, current);
			console.log('-----')

			rows.push(current);
		}
	}

	return rows;
};

console.log(generate(5));
