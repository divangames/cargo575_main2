////////////////////////////////////////////////////////
//
// Общая изометрия для векторной сцены и фуры CARGO 575
//
////////////////////////////////////////////////////////

export type Point = [number, number, number];

/** Проекция точки из сцены на плоскость SVG */
export function project([x, y, z]: Point): [number, number] {
  return [420 + x * 0.88 - y * 0.62, 337 + x * 0.29 + y * 0.42 - z];
}

/** Строка точек для polygon */
export function polygon(points: Point[]) {
  return points.map(project).map((p) => p.join(",")).join(" ");
}

/** Path из ломаной в изометрии */
export function line(points: Point[]) {
  return points.map((p, i) => `${i ? "L" : "M"}${project(p).join(" ")}`).join(" ");
}
