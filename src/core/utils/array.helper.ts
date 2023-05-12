export const random = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
