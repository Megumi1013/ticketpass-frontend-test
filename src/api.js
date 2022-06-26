import axios from "axios"
import { logout } from "@/composables/useLogin"

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

  if ([401].includes(error.response.statusCode)) {

    logout()
    return

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
