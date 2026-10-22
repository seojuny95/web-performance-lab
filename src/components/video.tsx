"use client";

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

type VideoProps = Omit<
  ComponentPropsWithoutRef<"video">,
  "height" | "loading" | "src" | "width"
> & {
  height: number;
  loading?: "eager" | "lazy";
  src: string;
  width: number;
};

export function Video({
  height,
  loading = "eager",
  preload,
  src,
  style,
  width,
  ...props
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const shouldLoad = loading === "eager" || isInViewport;

  useEffect(() => {
    const video = videoRef.current;

    if (loading !== "lazy" || !video) {
      return;
    }

    const Observer = globalThis.IntersectionObserver;

    if (typeof Observer !== "function") {
      const frameId = window.requestAnimationFrame(() => {
        setIsInViewport(true);
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new Observer(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      setIsInViewport(true);
      observer.disconnect();
    });

    observer.observe(video);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <video
      {...props}
      height={height}
      preload={shouldLoad ? preload : "none"}
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
      width={width}
    />
  );
}
