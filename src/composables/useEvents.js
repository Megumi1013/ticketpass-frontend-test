import { getEvents, getEventDetail, postEvent } from "@/api"
import { reactive } from "vue"
import { useStore } from "@/store"
import router from "@/router"

const store = useStore()

const eventsState = reactive({
  events: [],
  eventDetail: null,
  loading: false,
  isSuccess: false,
  error: "",
  errors: {},
  current: 1,
  from: 1,
  total: 1,
  form: {},
})

const getEventsApi = async () => {
  try {
    eventsState.loading = true

    const params = {
      page: eventsState.current,
    }

    const response = await getEvents(params)

    eventsState.events = response.data.data
    eventsState.current = response.data.meta?.current_page
    eventsState.total = response.data.meta?.last_page

  } catch (error) {

    eventsState.error = error.response?.data?.message || 'Unknown Error'

  } finally {

    eventsState.loading = false

  }
}

const getEventDetailApi = async (id) => {
  try {
    eventsState.loading = true

    const response = await getEventDetail(id)

    eventsState.eventDetail = response.data?.data

  } catch (error) {

    eventsState.error = error.response?.data?.message || 'Unknown Error'

  } finally {

    eventsState.loading = false

  }
}

const createEventApi = async () => {

  try {
    eventsState.loading = true

    const headers = {
      Authorization: "Bearer " + store.accessToken,
    }

    const response = await postEvent(eventsState.form, { headers: headers })

    if ("errors" in response.data) {

      eventsState.isSuccess = false
      eventsState.errors = response?.data?.errors

    } else {

      await router.push({name: 'EventDetail', params: { id: response?.data?.data?.id }})

      eventsState.isSuccess = true

    }

  } catch (error) {

    eventsState.error = error.response?.data?.message || 'Unknown Error'

  } finally {

    eventsState.loading = false

  }
}

export {
  eventsState,
  getEventsApi,
  getEventDetailApi,
  createEventApi,
}