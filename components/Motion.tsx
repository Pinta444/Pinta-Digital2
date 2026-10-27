"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.2, 0.7, 0.2, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0.25, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const viewport = { once: true, margin: "0px 0px -12% 0px" };
const lift = { y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 20 } };

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  form: motion.form,
} as const;

type GroupProps = {
  as?: keyof typeof tags;
  className?: string;
  children: ReactNode;
  "data-speed"?: string;
};

/** Staggers its RevealItem children in as the group scrolls into view. */
export function Reveal({ as = "div", children, ...rest }: GroupProps) {
  const Tag = tags[as];
  return (
    <Tag variants={group} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </Tag>
  );
}

const itemTags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  li: motion.li,
  article: motion.article,
  figure: motion.figure,
} as const;

type ItemProps = {
  as?: keyof typeof itemTags;
  className?: string;
  children: ReactNode;
  hover?: boolean;
  "aria-label"?: string;
};

export function RevealItem({ as = "div", hover, children, ...rest }: ItemProps) {
  const Tag = itemTags[as];
  return (
    <Tag variants={item} whileHover={hover ? lift : undefined} {...rest}>
      {children}
    </Tag>
  );
}

/** Pulls its child gently toward the cursor on devices with a fine pointer. */
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      className="magnet"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Counts up to the printed value the first time it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const target = parseFloat(value.replace(/,/g, ""));
    if (Number.isNaN(target)) return;
    const decimals = (value.split(".")[1] ?? "").length;
    const comma = value.includes(",");
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        const s = v.toFixed(decimals);
        el.textContent = comma ? Number(s).toLocaleString("en-US") : s;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <b ref={ref}>{value}</b>;
}
