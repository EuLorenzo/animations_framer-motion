import type { FC } from "react";
import { motion } from "framer-motion";

const WhileInView: FC = ({}) => {
  return (
    <div className="relative mx-auto grid h-32 w-96 place-content-center">
      <h1 className="relative z-0 text-3xl font-black uppercase">
        While In View
      </h1>
      <motion.div
        //Estado inicial
        initial={{ opacity: 1 }}
        //Quando visto
        whileInView={{ opacity: 0 }}
        viewport={{
          //Quando o elemento todo estiver na tela
          //amount: "all",

          //200px antes de entrar na tela
          margin: "-200px",

          //Roda uma vez
          //once: true,
        }}
        onViewportEnter={() => console.log("Entrou!")}
        onViewportLeave={() => console.log("Saiu!")}
        className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-indigo-500"
      ></motion.div>
    </div>
  );
};

export default WhileInView;
