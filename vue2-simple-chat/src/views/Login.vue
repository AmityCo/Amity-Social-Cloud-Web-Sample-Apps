<template>
  <div class="login">
    <div class="modal">
      <Amity />
      <h1>Connect with your favorite people</h1>

      <form @submit.prevent="onsubmit">
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button>Continue</button>

        <label>
          <input type="checkbox" name="persistent" value="true" /> Keep me signed in
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import Amity from '@/components/icons/Amity';

export default {
  components: { Amity },

  data: () => ({
    username: "",
    password: "",
  }),

  methods: {
    onsubmit(e) {
      const formdata = Object.fromEntries(new FormData(e.target));
      this.$emit('connect', formdata);
    },
  },
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.login .modal {
  display: grid;
  justify-items: center;
  grid-template-columns: 100%;
  grid-gap: 2rem;
  padding: 1rem;
  background-color: #fff;
}

.login h1 {
  margin: 0;
  text-align: center;
}

.login form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 20rem;
}

.login form > * {
  flex: 1 1 auto;
}

.login form input[required] {
  display: block;
  width: 100%;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid #ccd0d5;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.login form button {
  flex: 0 0 auto;
  display: inline-block;
  margin: 1rem 0;
  padding: 0.9rem 1.8rem;
  background: var(--primary);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
}

.login form label {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  color: #949da8;
  text-align: center;
}

.login form input[type="checkbox"] {
  margin-right: 0.5rem;
}

</style>
