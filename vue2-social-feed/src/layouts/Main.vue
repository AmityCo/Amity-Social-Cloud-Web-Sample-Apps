<template>
  <div class="main-layout">
    <header class = 'border-bottom'>
      <nav>
        <slot name="navleft" />
      </nav>
      <div class='title-bar' >
        <template v-if="!title">
          <img class="logo" :src='logo' />
        </template>
        <h1 v-else-if="!supertitle">
          {{ title }}
        </h1>
        <h2 v-else>
          <span class  = "title-supertitle">{{supertitle}}</span>
          {{ title }}
        </h2>
      </div>
      <nav>
        <slot name="navright" />
      </nav>
    </header>
    <slot name="breadcrumb"/>
    <slot/>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import queryString from "query-string"
export default {
  components: {
    Footer,
  },
  props: ['title', 'supertitle'],
  computed : {
    logo: () => `${queryString.parse(location.search).logo ?? require("@/assets/logo.png")}`,
  }
}
</script>

<style lang="stylus" scoped>
.main-layout
  position relative
  display grid
  grid-template-columns 100%
  grid-template-rows min-content 1fr min-content
  width 100vw
  height 100vh

  >:nth-child(2)
    padding-bottom: 3rem;

  header
    background: var(--headerColor)
    display flex
    justify-content space-between
    padding .25rem .75rem
    height: 3.8rem
    z-index 99999
      

    .title-bar
      color: var(--headerTextColor)
      display flex
      align-items center
      height 100%
      margin 0
      h1
        font-size 1.2rem
      h2
        font-size 1rem
        text-align center
        .title-supertitle 
          display block
          font-size 0.5rem
          text-align center
          text-transform uppercase
          font-weight 500
      img
        margin-top 5%
        margin-left: 2%
        height 70%
      img.logo
        border-radius: 2px;
        box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.52);
        background: white;
    nav
      display flex
      gap 1.5rem


      & >>> a
        display flex
        align-items center
        justify-content center
nav
  fill: var(--headerTextColor)

.title-supertitle
  color var(--supertitleTextColor)

</style>
