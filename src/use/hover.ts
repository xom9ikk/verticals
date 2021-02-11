import { useState } from 'react';

export const useHover = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return {
    isHovering,
    hoveringProps: {
      onMouseEnter: () => {
        setIsHovering(true);
      },
      onMouseLeave: () => {
        setIsHovering(false);
      },
      onMouseOver: () => {
        setIsHovering(true);
      },
      onMouseOut: () => {
        setIsHovering(false);
      },
    },
  };
};
