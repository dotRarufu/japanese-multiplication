import { forwardRef, useState } from 'react';

// eslint-disable-next-line no-empty-pattern
const Intersection = forwardRef<HTMLDivElement>(({}, ref) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => setClicked(true)}
      ref={ref}
      className={`cursor-pointer border-neutral-content border-[0.125em] rounded-full w-[1em] aspect-square absolute z-[99999] hidden ${
        clicked ? 'bg-green-500' : 'bg-neutral'
      }`}
    />
  );
});

export default Intersection;
