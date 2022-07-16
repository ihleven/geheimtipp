<template>
  <div class="flex flex-col items-center">
    login: {{ login }}
    <input v-model="username" class="block ring w-96 m-4" />
    <input v-model="password" type="password" class="block ring w-96 m-4" />
    <button @click="submit" class="block ring w-96 m-4">submit</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },

  methods: {
    async submit() {
      // const data = await useLogin(this.username, this.password)

      const data = await $fetch('/api/login', {
        method: 'POST',
        body: new URLSearchParams({
          username: this.username,
          password: this.password
        })
      });
      console.log('login', this.login);
      localStorage.setItem('token', data.ght.JWT);
      window.location.href = "/"
      // return navigateTo('/')
    }
  }
};
</script>
