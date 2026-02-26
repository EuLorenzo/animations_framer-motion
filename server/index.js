import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useInView, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "antialiased",
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const UseInView = () => {
  const ref = useRef(null);
  const inInView = useInView(ref, {
    amount: "all"
  });
  useEffect(() => {
    console.log(`O elemento ${inInView ? "está" : "não está"} está visível!`);
  }, [inInView]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "relative mx-auto grid h-32 w-96 place-content-center",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "relative z-0 text-3xl font-black uppercase", children: "Use In View" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: inInView ? "-100%" : "0%" },
            className: "absolute bottom-0 left-0 top-0 z-10 w-1/3 bg-indigo-500"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: inInView ? "100%" : "0%" },
            className: "absolute bottom-0 left-1/3 top-0 z-10 w-1/3 bg-red-500"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: inInView ? "-100%" : "0%" },
            className: "absolute bottom-0 left-2/3 top-0 z-10 w-1/3 bg-indigo-500"
          }
        )
      ]
    }
  );
};
const UseScrollAdvanced = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    //Leitura disto:
    // "start" no "end" da página
    // "end" no "start" da página
    offset: ["start end", "end start"]
  });
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "180deg"]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: targetRef,
      style: { rotate },
      className: "mx-auto size-48 bg-indigo-500"
    }
  );
};
const UseScrollBasic = ({}) => {
  const { scrollXProgress, scrollYProgress, scrollX, scrollY } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    console.log("scrollXProgress:", value);
  });
  const background = useTransform(scrollYProgress, [0, 1], ["#FFF", "#FDDC0E"]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        x: "-50%",
        y: "-50%",
        scaleX: scrollYProgress,
        background
      },
      className: "fixed left-1/2 top-0 h-4 w-screen bg-yellow-500 z-50"
    }
  );
};
const UseScrollWithContainer = () => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    axis: "x",
    offset: ["start end", "end start"]
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "flex w-screen overflow-x-scroll bg-indigo-500/50 py-8",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-screen shrink-0" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            ref: targetRef,
            style: { opacity: scrollXProgress },
            className: "mx-auto size-48 shrink-0 bg-zinc-50"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-screen shrink-0" })
      ]
    }
  );
};
const WhileInView = ({}) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid h-32 w-96 place-content-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "relative z-0 text-3xl font-black uppercase", children: "While In View" }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 1 },
        whileInView: { opacity: 0 },
        viewport: {
          //Quando o elemento todo estiver na tela
          //amount: "all",
          //200px antes de entrar na tela
          margin: "-200px"
          //Roda uma vez
          //once: true,
        },
        onViewportEnter: () => console.log("Entrou!"),
        onViewportLeave: () => console.log("Saiu!"),
        className: "absolute bottom-0 left-0 right-0 top-0 z-10 bg-indigo-500"
      }
    )
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "h-[150vh]",
    children: [/* @__PURE__ */ jsx("div", {
      className: "h-screen flex justify-center items-center",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-black uppercase",
        children: "Framer motion animations"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "h-screen bg-amber-100/10 flex justify-center items-center",
      children: /* @__PURE__ */ jsx(WhileInView, {})
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative h-screen bg-cyan-600/10 flex flex-col justify-center items-center gap-15",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "relative z-0 text-3xl font-black uppercase",
        children: "Scroll Y Progress Advanced"
      }), /* @__PURE__ */ jsx(UseScrollAdvanced, {})]
    }), /* @__PURE__ */ jsx("div", {
      className: "h-screen bg-red-500/10 flex justify-center items-center",
      children: /* @__PURE__ */ jsx(UseInView, {})
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative h-screen bg-indigo-100/10 flex justify-center items-center",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "relative z-0 text-3xl font-black uppercase",
        children: "Scroll Y Progress Basic ( Yellow div on top )"
      }), /* @__PURE__ */ jsx(UseScrollBasic, {})]
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative h-screen bg-amber-400-100/10 flex flex-col gap-15 justify-center items-center",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "relative z-0 text-3xl font-black uppercase",
        children: "Scroll X Progress"
      }), /* @__PURE__ */ jsx(UseScrollWithContainer, {})]
    })]
  });
};
const home = UNSAFE_withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/animations_framer-motion/assets/entry.client-C4vAeVvd.js", "imports": ["/animations_framer-motion/assets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/animations_framer-motion/assets/root-DorY5k6M.js", "imports": ["/animations_framer-motion/assets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": ["/animations_framer-motion/assets/root-y1Ap9gjD.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/animations_framer-motion/assets/home-Biz6ex72.js", "imports": ["/animations_framer-motion/assets/chunk-EPOLDU6W-CP3WDhNt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/animations_framer-motion/assets/manifest-8138119a.js", "version": "8138119a", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/animations_framer-motion/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
