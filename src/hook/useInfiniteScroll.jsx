import { useEffect, useRef } from "react";

export default function useInfiniteScroll(loader, callBack) {
  const loderRef = useRef(null);
  useEffect(() => {
    if (loader) return;
    const Observer = new IntersectionObserver(
      (item) => {
        if (item[0].isIntersecting) {
          callBack();
        }
        console.log({ item });
      },
      { threshold: 1 }
    );
    const current = loderRef?.current;
    if (current) {
      Observer.observe(current);
    }
    return () => {
      if (current) Observer.unobserve(current);
    };
  }, [loader, callBack]);
  console.log({ loderRef, loader });

  return loderRef;
}
