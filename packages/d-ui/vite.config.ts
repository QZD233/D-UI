import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ["src"],
      outDir: "dist",
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "DUI",
      formats: ["es", "umd"],
      fileName: "d-ui",
    },
    rollupOptions: {
      external: [
        "vue",
        "element-plus",
        "@element-plus/icons-vue",
        "pinia",
        "lodash-es",
        "@vueuse/core",
        "axios",
      ],
      output: {
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@element-plus/icons-vue": "ElementPlusIconsVue",
          pinia: "Pinia",
          "lodash-es": "_",
          "@vueuse/core": "VueUse",
          axios: "axios",
        },
      },
    },
    sourcemap: true,
  },
});
