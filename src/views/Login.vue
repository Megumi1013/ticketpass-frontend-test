<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex items-center mb-10">
      <router-link :to="{ name: 'EventsList'}">
        <img
          class="w-56 rounded-full mx-auto"
          src="https://ticketpass.org/_nuxt/img/ticketpass_logo.232ef43.svg"
          alt="Ticketpass"
        >
      </router-link>
    </div>

    <div class="w-full flex-col max-w-sm sm:max-w-md px-6">
      <form
        class="pt-6 pb-6"
        @submit.prevent="onLogin"
      >
        <div class="mb-4">
          <label
            class="block text-secondary text-sm font-bold mb-2 text-left"
            for="email"
          >
            Email address
          </label>

          <input
            id="email"
            class="appearance-none rounded-full w-full h-12 px-5 text-secondary bg-light-gray leading-tight focus:outline-primary"
            type="email"
            autocomplete="email"
            placeholder="Email address"
            @change="authState.form.append('username', $event.target.value)"
          >
        </div>

        <div class="mb-0">
          <label
            class="block text-secondary text-sm font-bold mb-2 text-left"
            for="password"
          >
            Password
          </label>

          <input
            id="password"
            class="appearance-none rounded-full w-full h-12 px-5 text-secondary bg-light-gray mb-3 leading-tight focus:outline-primary"
            type="password"
            autocomplete="current-password"
            placeholder="Password"
            @change="authState.form.append('password', $event.target.value)"
          >
        </div>
      </form>
    </div>

    <div class="text-red mb-8">
      {{ authState.error }}
    </div>

    <button
      class="transition ease-in-out inline-block px-7 py-3 leading-none border rounded-full bg-primary text-white border-primary hover:text-primary hover:bg-white"
      type="button"
      @click="onLogin"
    >
      LOGIN
    </button>
  </div>
</template>

<script setup>
  import { authState, postLoginApi } from "@/composables/useLogin"
  import { useRouter } from "vue-router"
  import { onMounted } from "vue"

  const router = useRouter()

  onMounted(() => {

    authState.form = new FormData()

  })

  const onLogin = async () => {

    await postLoginApi(authState.form)

    if (authState.isSuccess) {

      await router.push({ name: "CreateEvent" })

    }
  }

</script>

<style>

</style>
