<template>
  <div id="login">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <div class="content has-text-left">
              <b-field label="Username">
                <b-input v-model="username" />
              </b-field>
              <b-field label="Password">
                <b-input
                  type="password"
                  v-model="password"
                  password-reveal
                  @keyup.native.enter="onsubmit"
                />
              </b-field>
            </div>
            <b-button
              type="is-primary"
              expanded
              @click="onsubmit"
              :disabled="!username.length || !password.length"
            >
              <b> Sign In</b>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
  }),

  methods: {
    onsubmit() {
      this.$emit("submit", this.username);
    },
  },
};
</script>

<style lang="scss">
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
}

#login .column {
  min-width: 25vw;
}
</style>
