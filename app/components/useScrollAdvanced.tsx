import { useRef, type FC } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const UseScrollAdvanced: FC = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    //Leitura disto:
    // "start" no "end" da página
    // "end" no "start" da página
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "180deg"]);

  return (
    <motion.div
      ref={targetRef}
      style={{ rotate }}
      className="mx-auto size-48 bg-indigo-500"
    />
  );
};

export default UseScrollAdvanced;
