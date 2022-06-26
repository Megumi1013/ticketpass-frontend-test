import { postLogin, postRefreshToken } from "@/api"
import { reactive } from "vue"
import { useStore } from "@/store"
import router from "@/router"

const store = useStore()

const loginState = reactive({
  loading: false,
  error: "",
  form: {},
  refreshTokenParams: {},
  isSuccess: false,
})

const postLoginApi = async () => {

  try {
    loginState.loading = true

    loginState.form.append("grant_type", "password")
    loginState.form.append("client_id", process.env.VUE_APP_CLIENT_ID)
    // It should be real client id in real world?

    const response = await postLogin(loginState.form)

    store.isLoggedIn = true
    store.accessToken = response.data?.access_token
    store.refreshToken = response.data?.refresh_token

    loginState.isSuccess = true

  } catch (error) {

    loginState.error = error.response?.data?.message || 'Unknown Error'

  } finally {

    loginState.loading = false

  }
}

const postRefreshTokenApi = async () => {

  try {
    loginState.loading = true

    loginState.refreshTokenParams = new FormData()
    loginState.refreshTokenParams.append("grant_type", "refresh_token")
    loginState.refreshTokenParams.append("client_id", process.env.VUE_APP_CLIENT_ID)
    loginState.refreshTokenParams.append("refresh_token", store.refreshToken)

    await postRefreshToken(loginState.refreshTokenParams)

  } catch (error) {

    loginState.error = error.response?.data?.message || 'Unknown Error'

  } finally {

    loginState.loading = false

  }
}

const logout = () => {

  store.isLoggedIn = false
  store.accessToken = null
  store.refreshToken = null

  void router.push({ name: "EventsList" })

}

export {
  loginState,
  postLoginApi,
  postRefreshTokenApi,
  logout,
}