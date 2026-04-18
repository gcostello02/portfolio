import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
  },
  kit: {
    adapter: adapter({
      out: "build",
    }),
    serviceWorker: {
      register: true,
    },
    prerender: {
      handleMissingId: "warn",
      handleHttpError: "warn",
    },
  },
};

export default config;
