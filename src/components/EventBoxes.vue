<template>
  <div
    v-if="items || items.length > 0"
    class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10"
  >
    <figure
      v-for="(item, index) in items"
      :key="index"
      :class="['relative transition ease-in-out bg-dark-gray rounded-xl text-white shadow-gray-100 hover:shadow-xl hover:-translate-y-1',
               { loading: 'animate-pulse bg-light-gray rounded-lg'}]"
    >
      <router-link
        :to="{ name: 'EventDetail', params: { id: item.id } }"
      >
        <div
          class="bg-cover bg-center h-40 w-full rounded-t-xl"
          :style="`background-image: url(${item.image})`"
        />

        <div :class="['p-8 bg-dark-gray rounded-b-xl', { loading: 'bg-light-gray'}]">
          <div class="space-y-2">
            <h3 :class="['text-lg', { loading: 'animate-pulse bg-white rounded-md'}]">
              {{ item?.name }}
            </h3>

            <p :class="['text-sm', { loading: 'animate-pulse bg-white rounded-md'}]">
              {{ dayjsFormatFromUnix(item?.startDate) }}-{{ dayjsFormatFromUnix(item?.endDate) }}
            </p>
          </div>
          <div class="mt-5">
            <button
              :to="{ name: 'EventDetail', params: { id: item.id } }"
              :class="['transition ease-in-out inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-secondary hover:bg-white mt-4 lg:mt-0',
                       { loading: 'animate-pulse bg-light-white rounded-full'}]"
            >
              View
            </button>
          </div>
        </div>
      </router-link>
    </figure>
  </div>
</template>
<script setup>
  import { defineProps } from "vue"
  import { dayjsFormatFromUnix } from "@/helpers"

  defineProps({
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })
</script>
