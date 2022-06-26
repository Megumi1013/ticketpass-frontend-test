import axios from "axios"
import { logout } from "@/composables/useLogin"
import { notify } from "@kyvg/vue3-notification"

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(response => {

  return response

}, error => {

  console.error(error)

  if ([401].includes(error.response.status)) {

    logout()
    return

  }

  if ([500,429,502].includes(error.response.status)) {

    notify({
      title: "API Error",
      type: "error",
      text: error.response?.message || error.response?.data?.message || "Unknown Error",
    })

  }

  throw error
})

export function getEvents(params) {
  return api.get("events", { params: params })
}

export function getEventDetail(id) {
  return api.get(`events/${id}`)
}

export function postEvent(params, headers) {
  return api.post("events", params, headers)
}

export function postLogin(params) {
  return api.post("login", params)
}

export function postRefreshToken(params) {
  return api.post("login", params)
}
