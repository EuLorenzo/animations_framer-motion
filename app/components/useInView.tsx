import { useInView } from "framer-motion";
import { useEffect, useRef, type FC } from "react";
import { motion } from "framer-motion";

const UseInView: FC = () => {
  const ref = useRef(null);
  const inInView = useInView(ref, {
    amount: "all",
  });

  useEffect(() => {
    console.log(`O elemento ${inInView ? "está" : "não está"} está visível!`);
  }, [inInView]);

  return (
    <div
      ref={ref}
      className="relative mx-auto grid h-32 w-96 place-content-center"
    >
      <h1 className="relative z-0 text-3xl font-black uppercase">
        Use In View
      </h1>
      <motion.div
        animate={{ y: inInView ? "-100%" : "0%" }}
        className="absolute bottom-0 left-0 top-0 z-10 w-1/3 bg-indigo-500"
      />
      <motion.div
        animate={{ y: inInView ? "100%" : "0%" }}
        className="absolute bottom-0 left-1/3 top-0 z-10 w-1/3 bg-red-500"
      />
      <motion.div
        animate={{ y: inInView ? "-100%" : "0%" }}
        className="absolute bottom-0 left-2/3 top-0 z-10 w-1/3 bg-indigo-500"
      />
    </div>
  );
};

export default UseInView;
