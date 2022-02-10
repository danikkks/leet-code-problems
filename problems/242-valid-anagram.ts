function isAnagram(s: string, t: string): boolean {
  const symbols = new Map<string, number>();

  for (const symbol of s) {
    const counter = symbols.get(symbol) ?? 0;

    symbols.set(symbol, counter + 1);
  }

  for (const symbol of t) {
    const counter = symbols.get(symbol);

    if (!counter) return false;

    if (counter === 1) {
      symbols.delete(symbol);
    } else {
      symbols.set(symbol, counter - 1);
    }
  }

  return symbols.size === 0;
}

console.log(isAnagram("ab", "a"));
console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("aa", "bb"));
