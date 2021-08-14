<template>
  <div class="login">
    <h1>
      <img src="@/assets/logo.png">
    </h1>
    <form action="/login" @submit.prevent="onsubmit">
      <input type="text" v-model="email" placeholder="Enter your username" />
      <!-- <input type="password" v-model="password" placeholder="Password" /> -->
      <span v-if="!!errorText" class="input-error">{{errorText}}</span> 
      <button :disabled="loading">{{loading ? "Preparing..." : "Get Started"}}</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    loading: false,
    errorText: null
  }),
  methods: {
    async onsubmit() {
      this.loading = true;
      const [username, domain] = this.email.split("@");
      await this.$store.dispatch('login', username)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="stylus" scoped> 
.login
  position relative
  padding 1.5rem 2.5rem 2.5rem
  border 1px solid #dbdbdb
  width: 80vw
  max-width 400px
  margin-bottom 150px
  h1
    text-align center
    margin 0 0 .5rem
    img
      width 70%

  form 
    display flex
    flex-direction column
    gap 1rem

    input
      padding .5rem
      border 1px solid #dbdbdb
      background transparent
      border-radius .25rem
      text-align center
      font-size 1.2rem

    button
      margin-top 1rem
      padding .5rem .25rem
      background #0095f6
      border none
      border-radius .25rem
      cursor pointer
      color #fff
      font-weight bold
      font-size 1.2rem

      &[disabled]
        cursor not-allowed
.input-error
  margin-top: -6px;
  font-weight: bold;
  color: red;
</style>
