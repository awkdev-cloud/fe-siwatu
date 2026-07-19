"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "zoomIn"
  | "rotateUp"
  | "softPop";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
};

const hiddenVariants: Record<RevealVariant, string> = {
  fadeUp: "translate-y-12 opacity-0",
  fadeDown: "-translate-y-12 opacity-0",
  fadeLeft: "translate-x-12 opacity-0",
  fadeRight: "-translate-x-12 opacity-0",
  zoomIn: "scale-95 opacity-0 blur-sm",
  rotateUp: "translate-y-10 rotate-2 opacity-0",
  softPop: "translate-y-8 scale-[0.98] opacity-0",
};

const visibleClass =
  "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 blur-0";

export default function ScrollReveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 800,
  threshold = 0.18,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionProperty: "opacity, transform, filter",
      }}
      className={`
        transform-gpu
        will-change-transform
        ease-out
        motion-reduce:translate-x-0
        motion-reduce:translate-y-0
        motion-reduce:scale-100
        motion-reduce:rotate-0
        motion-reduce:opacity-100
        motion-reduce:blur-0
        motion-reduce:transition-none
        ${isVisible ? visibleClass : hiddenVariants[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}