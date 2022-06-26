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
            v-model="state.form.username"
            class="border-2 border-gray-200 appearance-none rounded-full w-full h-12 px-5 text-secondary leading-tight focus:outline-primary"
            :class="{ 'border-red': loginState?.errors?.username || v$.username.$error }"
            type="email"
            autocomplete="email"
            placeholder="Email address"
            @blur="v$.username.$touch"
          >

          <div
            v-if="v$.username.$error"
            class="text-red mt-2 text-sm text-left"
          >
            The email field is required.
          </div>
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
            v-model="state.form.password"
            class="border-2 border-gray-200 appearance-none rounded-full w-full h-12 px-5 text-secondary mb-3 leading-tight focus:outline-primary"
            :class="{ 'border-red': loginState?.errors?.password || v$.password.$error }"
            type="password"
            autocomplete="current-password"
            placeholder="Password"
            @blur="v$.password.$touch"
          >

          <div
            v-if="v$.password.$error"
            class="text-red mt-2 text-sm text-left"
          >
            The password field is required.
          </div>
        </div>
      </form>
    </div>

    <div class="text-red mb-8">
      {{ loginState.error }}
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
  import { loginState, postLoginApi } from "@/composables/useLogin"
  import { useRouter } from "vue-router"
  import { onMounted, reactive, watch } from "vue"
  import useVuelidate from "@vuelidate/core"
  import { required } from "@vuelidate/validators"

  const router = useRouter()

  onMounted(() => {

    loginState.form = new FormData()

  })

  const state = reactive({
    form: {
      username: "",
      password: ""
    }
  })

  const rules = {
    username: { required },
    password: { required }
  }

  const v$ = useVuelidate(rules, state.form)

  watch(
    () => state.form,
    () => {

      if (!v$.value.$invalid) {

      loginState.form.append('username', state.form.username)
      loginState.form.append('password', state.form.password)

      }
    },
    { deep: true }
  )


  const onLogin = async () => {

    if (!v$.value.$invalid) {

      await postLoginApi(loginState.form)

    }

    if (loginState.isSuccess) {

      await router.push({ name: "CreateEvent" })

    }
  }
</script>
