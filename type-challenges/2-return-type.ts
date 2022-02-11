const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type A = MyReturnType<typeof fn>;

type MyReturnType<T> = T extends (...args: any[]) => infer I ? I : T;

const returnType: A = 1;
const resutnType2: A = 2;
// const resutnType3: A = 3;
