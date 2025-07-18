import { defu } from 'defu';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { defineNuxtModule, hasNuxtModule, installModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit';
import { a as version, n as name, i as icons, b as addTemplates, t as theme, v as validateLicense } from './shared/ui-pro.CsgJ05mi.mjs';
import 'node:url';
import 'scule';
import 'ofetch';
import 'pkg-types';

const module = defineNuxtModule({
  meta: {
    name,
    version,
    docs: "https://ui.nuxt.com/getting-started/installation/pro/nuxt",
    configKey: "uiPro",
    compatibility: {
      nuxt: ">=3.16.0"
    }
  },
  defaults: {
    license: "",
    mdc: false,
    content: false
  },
  async setup(options, nuxt) {
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, {
      icons
    });
    if (!hasNuxtModule("@nuxt/ui")) {
      await installModule("@nuxt/ui");
    }
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.alias["#ui-pro"] = resolve("./runtime");
    nuxt.options.appConfig.uiPro = defu(nuxt.options.appConfig.uiPro || {}, {});
    nuxt.options.router.options.scrollBehaviorType = "smooth";
    if (hasNuxtModule("@nuxtjs/mdc") || options.mdc || (hasNuxtModule("@nuxt/content") || options.content)) {
      nuxt.options.mdc = defu(nuxt.options.mdc, {
        highlight: {
          theme: {
            light: "material-theme-lighter",
            default: "material-theme",
            dark: "material-theme-palenight"
          }
        },
        components: {
          map: {
            "accordion": "ProseAccordion",
            "accordion-item": "ProseAccordionItem",
            "badge": "ProseBadge",
            "callout": "ProseCallout",
            "card": "ProseCard",
            "card-group": "ProseCardGroup",
            "caution": "ProseCaution",
            "code-collapse": "ProseCodeCollapse",
            "code-group": "ProseCodeGroup",
            "code-icon": "ProseCodeIcon",
            "code-preview": "ProseCodePreview",
            "code-tree": "ProseCodeTree",
            "collapsible": "ProseCollapsible",
            "field": "ProseField",
            "field-group": "ProseFieldGroup",
            "icon": "ProseIcon",
            "kbd": "ProseKbd",
            "note": "ProseNote",
            "steps": "ProseSteps",
            "tabs": "ProseTabs",
            "tabs-item": "ProseTabsItem",
            "tip": "ProseTip",
            "warning": "ProseWarning"
          }
        }
      });
      addComponentsDir({
        path: resolve("./runtime/components/prose"),
        prefix: "Prose",
        pathPrefix: false,
        global: true
      });
    }
    if (hasNuxtModule("@nuxt/content") || options.content) {
      addComponentsDir({
        path: resolve("./runtime/components/content"),
        pathPrefix: false,
        prefix: nuxt.options.ui?.prefix || "U"
      });
    }
    if (hasNuxtModule("@nuxtjs/color-mode")) {
      addComponentsDir({
        path: resolve("./runtime/components/color-mode"),
        pathPrefix: false,
        prefix: nuxt.options.ui?.prefix || "U"
      });
    } else {
      addImportsDir(resolve("./runtime/composables/color-mode"));
    }
    addComponentsDir({
      path: resolve("./runtime/components"),
      pathPrefix: false,
      prefix: nuxt.options.ui?.prefix || "U",
      ignore: ["color-mode/**", "content/**", "prose/**"]
    });
    addImportsDir(resolve("./runtime/composables"));
    addTemplates(options, nuxt);
    const theme$1 = theme || { env: "NUXT_UI_PRO_LICENSE", link: "https://ui.nuxt.com/pro" };
    const key = process.env[theme$1.env] || nuxt.options.uiPro?.license;
    if (nuxt.options.dev || nuxt.options._prepare || nuxt.options.test) {
      if (nuxt.options.dev && !key) {
        consola.box(
          colors.greenBright("Nuxt UI Pro") + `

Missing \`${theme$1.env}\` env variable, please add it to your \`.env\`.

` + colors.blueBright(`Purchase Nuxt UI Pro at ${theme$1.link} to build your app in production.`)
        );
      }
      return;
    }
    // nuxt.hook("build:before", async () => {
    //   await validateLicense({ key, theme: theme$1, dir: nuxt.options.rootDir });
    // });
  }
});

export { module as default };
