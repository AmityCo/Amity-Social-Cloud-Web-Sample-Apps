<template>
  <div class="theme-manager" :class="scheme">
    <component :is="`style`" v-html="style" />
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    themeColor: () => "000000",
    headerTextColor(){ return 'FFFFFF'},
    headerColor(){return this.getHeaderColor()},
    supertitleTextColor(){ return "EEEEEE"},
    style: ({ cssVar }) => `
      .theme-manager {
        ${cssVar("themeColor")}
        ${cssVar("headerColor")}
        ${cssVar("headerTextColor")}
        ${cssVar("supertitleTextColor")}
      }
    `,
  },

  data: () => ({
    scheme: "light",
  }),

  created() {
    this.listener = ({ matches }) => {this.scheme = matches ? "dark" : "light"}

    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    this.scheme = "light";
    this.mediaQuery.addEventListener("change", this.listener)
  },

  beforeDestroy() {
    this.mediaQuery.removeEventListener("change", this.listener)
  },

  methods: {
    getHeaderColor(){ return this.scheme == 'light' ? 'FFFFFF' : '000000'},
    cssVar(propName) {
        console.log(this);
      return `--${propName}: #${this[propName]};`
    },
  },
};
</script>

<style lang="stylus">
.theme-manager {
  --textColor: black;
  --borderColor: #CFCFCF;
  --schemeColor: white;
  &.dark {
    --textColor: white;
    --borderColor: #2F2F2F;
    --schemeColor: black;
  }
  background var(--schemeColor)
  color:var(--textColor)
}

.icon 
  fill: var(--themeColor)

.border
  border: 1px solid var(--borderColor) !important

.border-top
  border-top: 1px solid var(--borderColor) !important
  
.border-bottom
  border-bottom: 1px solid var(--borderColor) !important


html, body, #app, input,button,textarea
  background var(--schemeColor)
  color:var(--textColor)
  fill: var(--textColor)
  .icon
    fill: var(--textColor)
  .border-top
    border-top: 1px solid var(--borderColor) !important
  .border-bottom
    border-bottom: 1px solid var(--borderColor) !important
  .border
    border: 1px solid var(--borderColor) !important
</style>
