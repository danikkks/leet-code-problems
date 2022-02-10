// https://github.com/type-challenges/type-challenges/blob/master/questions/3057-easy-push/README.md

type Result = Push<[1, 2], "3">; // [1, 2, '3']

// type Push<T, I extends any> = T extends (infer U)[] ? (U | I)[] : T;
type Push<T extends any[], I> = [...T, I];

const result: Result = [1, 2, "3"];
