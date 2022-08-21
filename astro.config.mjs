import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import node from "@astrojs/node";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), tailwind(), image()],
  output: "server",
  adapter: netlify(),
});
