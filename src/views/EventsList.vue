<template>
  <div>
    <BasicHeader />

    <main class="px-6 md:px-20 py-12">
      <EventBoxes
        :items="eventsState.events"
        :loading="eventsState.loading"
      />

      <BasicPagination
        :current="eventsState.current"
        :total="eventsState.total"
        @onPrev="onPrev"
        @onNext="onNext"
      />
    </main>
  </div>
</template>

<script setup>
  import { onMounted } from "vue"
  import BasicHeader from "@/components/BasicHeader.vue"
  import EventBoxes from "@/components/EventBoxes.vue"
  import BasicPagination from "@/components/BasicPagination.vue"
  import { eventsState, getEventsApi } from "@/composables/useEvents"
  import { useRoute, useRouter } from "vue-router"

  onMounted(() => {

    eventsState.current = Number(route.query.page || 1)
    getEventsApi()

  })

  const router = useRouter()
  const route = useRoute()

  const onPrev = (number) => {

    eventsState.current -= number

    router.push({ query: { page: eventsState.current } })

    getEventsApi()

  }

  const onNext = (number) => {

    eventsState.current += number

    router.push({ query: { page: eventsState.current } })

    getEventsApi()

  }

</script>
