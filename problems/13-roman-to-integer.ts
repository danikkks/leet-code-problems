// https://leetcode.com/problems/roman-to-integer/

const ROMAN_SYMBOLS: Record<string, number> = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000,
};

function romanToInt(s: string): number {
	return tokenizeRomanString(s).map(parseRomanToken).reduce(sum);
}

function tokenizeRomanString(s: string): string[] {
	const tokens: string[] = [""];

	s.split("").forEach((char: string) => {
		if (last(tokens) === "") {
			updateLast(tokens, char);
		} else if (
			ROMAN_SYMBOLS[lastChar(last(tokens))] <= ROMAN_SYMBOLS[char]
		) {
			updateLast(tokens, `${last(tokens)}${char}`);
		} else {
			tokens.push(char);
		}
	});

	return tokens;
}

function parseRomanToken(t: string): number {
	let sum = 0;

	t.split("").forEach((char: string, index) => {
		const prevChar = t[index - 1];

		if (prevChar && ROMAN_SYMBOLS[prevChar] >= ROMAN_SYMBOLS[char]) {
			sum = ROMAN_SYMBOLS[char] + sum;
		} else {
			sum = ROMAN_SYMBOLS[char] - sum;
		}
	});

	return sum;
}

const result1 = romanToInt("III");
const result2 = romanToInt("LVIII");
const result3 = romanToInt("MCMXCIV");

console.log(result1); // 3
console.log(result2); // 58
console.log(result3); // 1994

// utils

function lastChar(array: string): string {
	return array.split("")[array.length - 1];
}

function last<T>(array: T[]): T {
	return array[array.length - 1];
}

function updateLast<T>(array: T[], value: T): void {
	array[array.length - 1] = value;
}

function sum(a: number, b: number) {
	return a + b;
}
