<template>
  <div
    v-if="props.total > 0"
    class="my-14 flex justify-center items-center gap-6"
  >
    <button
      v-if="current > 1 && current <= total"
      class="transition ease-in-out inline-flex items-center py-2 px-4 font-medium text-secondary bg-white rounded-full border border-secondary hover:bg-secondary hover:text-white"
      @click="$emit('onPrev', 1)"
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
      Previous
    </button>

    <button
      v-if="current < total"
      class="transition ease-in-out inline-flex items-center py-2 px-4 font-medium text-secondary bg-white rounded-full border border-secondary hover:bg-secondary hover:text-white"
      @click="$emit('onNext', 1)"
    >
      Next
      <svg
        class="ml-2 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from "vue"

  const props = defineProps({
    current: {
      type: Number,
      required: false,
      default: 1,
    },
    total: {
      type: Number,
      required: false,
      default: 1,
    },
  })

  defineEmits(["onPrev", "onNext"])


</script>
