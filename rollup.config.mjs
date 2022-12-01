import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "lib/index.js",
    format: "cjs",
    sourcemap: true,
  },
  // {
  //   file: "lib/index.min.js",
  //   format: "iife",
  //   name: "version",
  //   sourcemap: true,
  //   plugins: [terser()],
  // },
  // {
  //   file: "lib/bundle.js",
  //   format: "umd",
  //   interop: "esModule",
  //   name: "hooks",
  //   sourcemap: true,
  // },
  // {
  //   file: "lib/main.js",
  //   format: "esm",
  //   name: "hooks",
  //   sourcemap: true,
  // },

  plugins: [resolve(), babel({ babelHelpers: "inline" }), commonjs()],
  external: ["axios", "react", "yup"],
};
