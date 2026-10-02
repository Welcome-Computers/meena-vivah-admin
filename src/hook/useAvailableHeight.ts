import { setLayoutHeight } from "@/redux/features/layoutSetting";
import { useAppDispatch } from "@/redux/hooks";
import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const ENABLE_HEIGHT_DEBUG = false;
interface UseAvailableHeightOptions {
  baseHeight?: number;
  subtractRefs?: RefObject<HTMLElement | null>[];
  extraHeight?: number;
  minHeight?: number;
  debugName?: string;
}

export const useAvailableHeight = ({
  baseHeight,
  subtractRefs = [],
  extraHeight = 0,
  minHeight = 0,
  debugName = "unknown",
}: UseAvailableHeightOptions = {}) => {

  const [height, setHeight] = useState(0);
  const dispatch = useAppDispatch() as any;

  useLayoutEffect(() => {
    const calculateHeight = () => {
      // If baseHeight is provided, use it.
      // Otherwise use window height.
      let availableHeight =
        baseHeight ?? window.innerHeight;

      // subtractRefs.forEach((ref) => {
      //   if (!ref.current) return;
      //   availableHeight -= ref.current.getBoundingClientRect().height;
      // });

      subtractRefs.forEach((ref) => {
        if (!ref.current) return;

        const element = ref.current;
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);

        const marginTop = parseFloat(styles.marginTop) || 0;
        const marginBottom = parseFloat(styles.marginBottom) || 0;

        availableHeight -= rect.height + marginTop + marginBottom;
      });

      availableHeight -= extraHeight;

      const finalHeight = Math.max(
        availableHeight,
        minHeight
      );

      if (ENABLE_HEIGHT_DEBUG && process.env.NODE_ENV === "development") {
        console.groupCollapsed(
          `%c[useAvailableHeight] ${debugName}`,
          "color: #11be99; font-weight: bold;"
        );

        console.log(
          "Source:",
          baseHeight !== undefined
            ? "baseHeight"
            : "window.innerHeight"
        );

        console.log("Base height:", availableHeight);
        console.log("Extra height:", extraHeight);
        console.log("Min height:", minHeight);
        console.log("Final height:", finalHeight);

        console.groupEnd();
      }

      setHeight((prev) =>
        prev === finalHeight ? prev : finalHeight
      );
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(
      calculateHeight
    );

    subtractRefs.forEach((ref) => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    // Only necessary when using window height.
    if (baseHeight === undefined) {
      window.addEventListener(
        "resize",
        calculateHeight
      );
    }

    return () => {
      resizeObserver.disconnect();

      if (baseHeight === undefined) {
        window.removeEventListener(
          "resize",
          calculateHeight
        );
      }
    };
  }, [
    baseHeight,
    extraHeight,
    minHeight,
    debugName,
    subtractRefs,
  ]);

  useEffect(() => {
    if (debugName === "ADMIN_LAYOUT" && height !== undefined) {
      dispatch(setLayoutHeight(Math.floor(height)));
    }
  }, [height, debugName, dispatch]);

  return Math.floor(height);
};