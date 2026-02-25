import type { FC } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const UseScrollBasic: FC = ({}) => {
  //Scroll progress - valor de 0 a 1 em relação ao scroll
  const { scrollXProgress, scrollYProgress, scrollX, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    console.log("scrollXProgress:", value);
  });

  const background = useTransform(scrollYProgress, [0, 1], ["#FFF", "#FDDC0E"]);

  return (
    <motion.div
      style={{
        x: "-50%",
        y: "-50%",
        scaleX: scrollYProgress,
        background,
      }}
      className="fixed left-1/2 top-0 h-4 w-screen bg-yellow-500 z-50"
    />
  );
};

export default UseScrollBasic;
