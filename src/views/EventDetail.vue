<template>
  <div>
    <BasicHeader />

    <main>
      <div v-if="eventsState.eventDetail">
        <div
          v-if="eventsState.eventDetail"
          class="bg-no-repeat bg-cover bg-center w-full"
          :style="`height: 32rem; background-image: url(${eventsState.eventDetail.image})`"
        />
      </div>

      <div class="px-6 py-10 md:px-20">
        <div v-if="eventsState.eventDetail">
          <h1 class="text-2xl mb-2">
            {{ eventsState.eventDetail?.name }}
          </h1>

          <h2 class="text-dark-gray">
            {{ dayjsFormatFromUnix(eventsState.eventDetail?.startDate)
            }}-{{ dayjsFormatFromUnix(eventsState.eventDetail?.endDate) }}
          </h2>

          <p class="max-w-screen-md mx-auto py-8 text-left">
            {{ eventsState.eventDetail?.description }}
          </p>
        </div>

        <div>
          <router-link
            :to="{ name: 'EventsList' }"
            class="transition ease-in-out inline-flex items-center py-2 px-4 font-medium text-secondary bg-white rounded-full border border-secondary hover:bg-secondary hover:text-white"
          >
            <svg
              class="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { onMounted } from "vue"
  import { useRoute } from "vue-router"
  import { eventsState, getEventDetailApi } from "@/composables/useEvents"
  import { dayjsFormatFromUnix } from "@/helpers"
  import BasicHeader from "@/components/BasicHeader.vue"

  const route = useRoute()

  onMounted(() => {

    getEventDetailApi(route.params.id)

  })
</script>
<style scoped>
  p {
    line-height: 1.72;
  }
</style>
