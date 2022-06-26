import { postLogin, postRefreshToken } from "@/api"
import { reactive } from "vue"
import { useStore } from "@/store"
import router from "@/router"

const store = useStore()

const authState = reactive({
  loading: false,
  error: "",
  form: {},
  refreshTokenParams: {},
  isSuccess: false,
})

const postLoginApi = async () => {

  try {
    authState.loading = true

    authState.form.append("grant_type", "password")
    authState.form.append("client_id", process.env.VUE_APP_CLIENT_ID)
    // It should be real client id in real world?

    const response = await postLogin(authState.form)

    store.isLoggedIn = true
    store.accessToken = response.data?.access_token
    store.refreshToken = response.data?.refresh_token

    authState.isSuccess = true

  } catch (error) {

    authState.error = error.response?.data?.message

  } finally {

    authState.loading = false

  }
}

const postRefreshTokenApi = async () => {

  try {
    authState.loading = true

    authState.refreshTokenParams = new FormData()
    authState.refreshTokenParams.append("grant_type", "refresh_token")
    authState.refreshTokenParams.append("client_id", process.env.VUE_APP_CLIENT_ID)
    authState.refreshTokenParams.append("refresh_token", store.refreshToken)

    await postRefreshToken(authState.refreshTokenParams)

  } catch (error) {

    authState.error = error.response?.data?.message

  } finally {

    authState.loading = false

  }
}

const logout = () => {

  store.isLoggedIn = false
  store.accessToken = null
  store.refreshToken = null

  void router.push({ name: "EventsList" })

}

export {
  authState,
  postLoginApi,
  postRefreshTokenApi,
  logout,
}