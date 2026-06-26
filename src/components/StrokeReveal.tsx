import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Props {
  text: string;
  className?: string;
}

export function StrokeReveal({ text, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  const fillPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundImage = useTransform(
    fillPercent,
    (v: number) =>
      `linear-gradient(to right, var(--foreground) ${v}%, transparent ${v}%)`
  );

  return (
    <div ref={ref} className={`overflow-hidden py-10 sm:py-16 ${className}`}>
      <motion.h2
        className="font-display text-center font-bold uppercase select-none leading-[0.9] tracking-tight"
        style={{
          backgroundImage,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: "1.5px var(--foreground)",
          color: "transparent",
          fontSize: "clamp(2.5rem, 12vw, 10rem)",
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
}
