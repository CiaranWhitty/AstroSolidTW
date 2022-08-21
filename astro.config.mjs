import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), tailwind()],
  output: "server",
  adapter: netlify(),
});
