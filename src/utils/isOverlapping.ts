// const isOverlapping = (element1: HTMLElement, element2: HTMLElement) => {
//   const rect1 = element1.getBoundingClientRect();
//   const rect2 = element2.getBoundingClientRect();

import { Coordinate, getIntersection } from './getIntersection';

//   const center1 = {
//     x: rect1.left + rect1.width / 2,
//     y: rect1.top + rect1.height / 2,
//   };
//   // const center2 = {
//   //   x: rect2.left + rect2.width / 2,
//   //   y: rect2.top + rect2.height / 2,
//   // };

//   // Get the rotation angle of element1
//   const transform1 = getComputedStyle(element1).transform;
//   const matrix = new DOMMatrix(transform1);
//   const angle = Math.atan2(matrix.b, matrix.a);

//   // Overlap point coordinate
//   const overlapX1 = rect1.left;
//   const overlapY1 = rect1.top;
//   const overlapCosA = Math.cos(angle);
//   const overlapSinA = Math.sin(angle);
//   const overlapNewX1 = overlapX1 * overlapCosA - overlapY1 * overlapSinA;
//   const overlapNewY1 = overlapX1 * overlapSinA + overlapY1 * overlapCosA;

//   const overlapLeft = Math.round(Math.max(overlapNewX1, rect2.left));
//   const overlapTop = Math.round(Math.max(overlapNewY1, rect2.top));

//   // Calculate the new coordinates of the center of element1 after rotation
//   const cosA = Math.cos(angle);
//   const sinA = Math.sin(angle);
//   const x1 = center1.x - rect1.left;
//   const y1 = center1.y - rect1.top;
//   const newX1 = x1 * cosA - y1 * sinA + rect1.left;
//   const newY1 = x1 * sinA + y1 * cosA + rect1.top;

//   // Check if the center of element1 is within the bounds of element2

//   // const isOverlap =
//   //   newX1 >= rect2.left &&
//   //   newX1 <= rect2.right &&
//   //   newY1 >= rect2.top &&
//   //   newY1 <= rect2.bottom;

//   // return { isOverlap, point: { top: overlapTop, left: overlapLeft } };
//   return { point: { top: overlapTop, left: overlapLeft } };
// };
// // * This fails on angles other than 0, 90, 45

const isOverlapping = (
  element1: HTMLElement,
  element2: HTMLElement,
  relativeElem: HTMLElement
) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  const rect3 = relativeElem.getBoundingClientRect();
  // console.log('parent x:', rect3.x);
  const line1: { start: Coordinate; end: Coordinate } = {
    start: {
      x: rect1.x,
      y: rect1.y,
    },
    end: {
      x: rect1.right,
      y: rect1.bottom,
    },
  };
  const line2: { start: Coordinate; end: Coordinate } = {
    start: {
      x: rect2.x,
      y: rect2.y,
    },
    end: {
      x: rect2.right,
      y: rect2.bottom,
    },
  };

  // console.log(line1, line2);

  return getIntersection(line1, line2);
};

export default isOverlapping;
