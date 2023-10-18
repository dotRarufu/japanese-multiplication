// var lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4)=> {
//     var a_dx = x2 - x1;
//     var a_dy = y2 - y1;
//     var b_dx = x4 - x3;
//     var b_dy = y4 - y3;
//     var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
//     var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
//     return (s >= 0 && s <= 1 && t >= 0 && t <= 1) ? [x1 + t * a_dx, y1 + t * a_dy] : false;
// }

export type Coordinate = { x: number; y: number };

export const getIntersection = (
  line1: { start: Coordinate; end: Coordinate },
  line2: { start: Coordinate; end: Coordinate }
) => {
  const x1 = line1.start.x;
  const x2 = line1.end.x;
  const y1 = line1.start.y;
  const y2 = line1.end.y;

  const x3 = line2.start.x;
  const x4 = line2.end.x;
  const y3 = line2.start.y;
  const y4 = line2.end.y;

  const a_dx = x2 - x1;
  const a_dy = y2 - y1;
  const b_dx = x4 - x3;
  const b_dy = y4 - y3;
  const s =
    (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  const t =
    (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1
    ? [x1 + t * a_dx, y1 + t * a_dy]
    : false;
};
