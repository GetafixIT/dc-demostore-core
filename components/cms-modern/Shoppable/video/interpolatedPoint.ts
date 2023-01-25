import { ShoppableVideoPoint } from "../shoppableTypes";

export const interpolatedPoint = (
  p1: ShoppableVideoPoint,
  p2: ShoppableVideoPoint,
  t: number
) => {
  const fac = (t - p1.t) / (p2.t - p1.t);
  const inv = 1 - fac;

  return {
    x: fac * p2.p.x + inv * p1.p.x,
    y: fac * p2.p.y + inv * p1.p.y
  };
};
