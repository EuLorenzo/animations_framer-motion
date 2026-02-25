import type { FC } from "react";
import UseInView from "~/components/useInView";
import UseScrollAdvanced from "~/components/useScrollAdvanced";
import UseScrollBasic from "~/components/useScrollBasic";
import UseScrollWithContainer from "~/components/useScrollWithContainer";
import WhileInView from "~/components/whileInView";

const Home: FC = () => {
  return (
    <div className="h-[150vh]">
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-black uppercase">
          Framer motion animations
        </h1>
      </div>

      <div className="h-screen bg-amber-100/10 flex justify-center items-center">
        <WhileInView />
      </div>

      <div className="relative h-screen bg-cyan-600/10 flex flex-col justify-center items-center gap-15">
        <h1 className="relative z-0 text-3xl font-black uppercase">
          Scroll Y Progress Advanced
        </h1>
        <UseScrollAdvanced />
      </div>

      <div className="h-screen bg-red-500/10 flex justify-center items-center">
        <UseInView />
      </div>

      <div className="relative h-screen bg-indigo-100/10 flex justify-center items-center">
        <h1 className="relative z-0 text-3xl font-black uppercase">
          Scroll Y Progress Basic ( Yellow div on top )
        </h1>
        <UseScrollBasic />
      </div>

      <div className="relative h-screen bg-amber-400-100/10 flex flex-col gap-15 justify-center items-center">
        <h1 className="relative z-0 text-3xl font-black uppercase">
          Scroll X Progress
        </h1>
        <UseScrollWithContainer />
      </div>
    </div>
  );
};

export default Home;
