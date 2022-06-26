<template>
  <nav class="sm:flex items-center justify-between flex-wrap px-6 py-4 shadow-lg shadow-gray-100">
    <div class="flex items-center flex-shrink-0 lg:mr-6">
      <router-link :to="{ name: 'EventsList' }">
        <img
          class="w-36 rounded-full mx-auto"
          src="https://ticketpass.org/_nuxt/img/ticketpass_logo.232ef43.svg"
          alt=""
        >
      </router-link>
    </div>

    <div class="flex-end flex items-center justify-center">
      <router-link
        :to="{ name: 'CreateEvent' }"
        class="transition ease-in-out mr-4 inline-block text-sm px-7 py-3 leading-none border rounded-full bg-primary text-white border-primary hover:text-primary hover:bg-white mt-4 lg:mt-0"
      >
        CREATE EVENT
      </router-link>

      <router-link
        v-if="!isLoggedIn"
        :to="{ name: 'Login'}"
        class="transition ease-in-out inline-block text-sm px-7 py-3 leading-none border rounded-full border-secondary text-secondary hover:text-white hover:bg-secondary mt-4 lg:mt-0"
      >
        LOGIN
      </router-link>

      <button
        v-else
        class="transition ease-in-out inline-block text-sm px-7 py-3 leading-none border rounded-full border-secondary text-secondary hover:text-white hover:bg-secondary mt-4 lg:mt-0"
        @click="onLogout"
      >
        LOG OUT
      </button>
    </div>
  </nav>
</template>
<script setup>
  import { useStore } from "@/store"
  import { logout } from "@/composables/useLogin"

  const { isLoggedIn } = useStore()

  const onLogout = () => {

    logout()

  }
</script>