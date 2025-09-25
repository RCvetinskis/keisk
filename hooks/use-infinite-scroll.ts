import { useEffect, useRef } from "react";

type Options = {
  onBottomReached?: () => void;
  onTopReached?: () => Promise<void> | void;
  topThreshold?: number;
  bottomThreshold?: number;
};

export function useInfiniteScroll<T extends HTMLElement>({
  onBottomReached,
  onTopReached,
  topThreshold = 50,
  bottomThreshold = 50,
}: Options) {
  const infiniteRef = useRef<T | null>(null);
  const loadingRef = useRef(false);
  const ignoreScrollRef = useRef(false);

  useEffect(() => {
    const container = infiniteRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (loadingRef.current || ignoreScrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (onTopReached && scrollTop <= topThreshold) {
        loadingRef.current = true;
        const previousHeight = container.scrollHeight;

        await onTopReached();

        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight - previousHeight;
          loadingRef.current = false;
        });
        return;
      }

      if (
        onBottomReached &&
        scrollHeight - scrollTop - clientHeight <= bottomThreshold
      ) {
        onBottomReached();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onTopReached, onBottomReached, topThreshold, bottomThreshold]);

  return { infiniteRef, ignoreScrollRef };
}
