import { RefObject, useLayoutEffect, useState } from "react";

interface UseAvailableHeightOptions {
  subtractRefs?: RefObject<HTMLElement | null>[];
  extraHeight?: number;
  minHeight?: number;
}

export const useAvailableHeight = (
  containerRef: RefObject<HTMLElement | null>,
  options: UseAvailableHeightOptions = {}
) => {
  const {
    subtractRefs = [],
    extraHeight = 0,
    minHeight = 0,
  } = options;

  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const calculateHeight = () => {
      const container = containerRef.current;

      if (!container) return;

      let availableHeight = container.getBoundingClientRect().height;

      subtractRefs.forEach((ref) => {
        if (ref.current) {
          availableHeight -= ref.current.getBoundingClientRect().height;
        }
      });

      availableHeight -= extraHeight;

      setHeight(Math.max(availableHeight, minHeight));
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(calculateHeight);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    subtractRefs.forEach((ref) => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    window.addEventListener("resize", calculateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateHeight);
    };
  }, [containerRef, subtractRefs, extraHeight, minHeight]);

  return height;
};