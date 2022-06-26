<template>
  <main class="px-6 md:px-20 py-12">
    <div class="flex flex-col items-center">
      <div class="w-full flex-col max-w-sm sm:max-w-md">
        <form
          class="pt-6 pb-6"
          @submit.prevent="onSubmit"
        >
          <div class="mb-4">
            <label
              class="block text-secondary text-sm font-bold mb-2 text-left"
              for="event-name"
            >
              Event name
            </label>

            <input
              id="event-name"
              class="appearance-none rounded-full w-full h-12 px-5 text-secondary bg-light-gray leading-tight focus:outline-primary"
              type="text"
              autocomplete="off"
              placeholder="Event name"
              @change="eventsState.form.append('name', $event.target.value)"
            >

            <div
              v-if="eventsState?.errors?.name"
              class="text-red mt-2 text-sm text-left"
            >
              {{ eventsState.errors.name[0] }}
            </div>
          </div>

          <div class="mb-4">
            <div class="sm:flex justify-between">
              <div class="mb-4 sm:mb-0 sm:w-52">
                <label
                  class="block text-secondary text-sm font-bold mb-2 text-left"
                  for="start-date"
                >
                  Start date
                </label>

                <input
                  id="start-date"
                  class="appearance-none rounded-full w-full h-12 px-5 text-secondary bg-light-gray leading-tight focus:outline-primary"
                  type="date"
                  autocomplete="off"
                  @change="eventsState.form.append('startDate', dayjsFormatToUnix($event.target.value))"
                >

                <div
                  v-if="eventsState?.errors?.startDate"
                  class="text-red mt-2 text-sm text-left"
                >
                  {{ eventsState.errors.startDate[0] }}
                </div>
              </div>

              <div class="sm:w-52">
                <label
                  class="block text-secondary text-sm font-bold mb-2 text-left"
                  for="end-date"
                >
                  End date
                </label>

                <input
                  id="end-date"
                  class="appearance-none rounded-full w-full h-12 px-5 text-secondary bg-light-gray leading-tight focus:outline-primary"
                  type="date"
                  autocomplete="off"
                  @change="eventsState.form.append('endDate', dayjsFormatToUnix($event.target.value))"
                >

                <div
                  v-if="eventsState?.errors?.endDate"
                  class="text-red mt-2 text-sm text-left"
                >
                  {{ eventsState.errors.endDate[0] }}
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label
              class="block text-secondary text-sm font-bold mb-2 text-left"
              for="event-description"
            >
              Event description
            </label>

            <textarea
              id="event-description"
              class="appearance-none rounded-lg w-full h-40 py-4 px-5 text-secondary bg-light-gray leading-tight focus:outline-primary"
              type="text"
              autocomplete="off"
              placeholder="Event description"
              @change="eventsState.form.append('description', $event.target.value)"
            />

            <div
              v-if="eventsState?.errors?.description"
              class="text-red mt-2 text-sm text-left"
            >
              {{ eventsState.errors.description[0] }}
            </div>
          </div>

          <div class="mb-6">
            <div
              class="block text-secondary text-sm font-bold mb-2 text-left"
            >
              Event image
            </div>

            <div
              :class="{ 'drag-enter': imageDragEnter, 'drag-leave': imageDragLeave }"
              @dragenter="imageDragEnter = true; imageDragLeave = false"
              @dragleave="imageDragLeave = true; imageDragEnter = false"
              @drop="onImageDrop"
            >
              <label
                for="event-image"
                class="p-6 relative flex flex-col justify-center items-center w-full h-48 rounded-lg border-2 border-gray border-dashed cursor-pointer hover:bg-light-gray"
              >
                <span class="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    class="mb-3 w-8 h-8 text-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  /></svg>

                  <span class="mb-2 text-sm text-gray">
                    <span class="font-bold">Click to upload</span> or drag and drop
                  </span>

                  <div
                    v-if="imageFilename"
                    class="w-full text-sm bg-light-gray px-5 py-3 min-h-12 rounded-lg mt-2"
                  >
                    {{ imageFilename }}
                  </div>

                  <input
                    id="event-image"
                    type="file"
                    class="absolute opacity-0 mt-2 block w-full text-sm file:bg-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm"
                    @change="onChangeFile"
                  >
                </span>
              </label>
            </div>

            <div
              v-if="eventsState?.errors?.image"
              class="text-red mt-2 text-sm text-left"
            >
              {{ eventsState.errors.image[0] }}
            </div>
          </div>

          <div class="text-red mb-8">
            {{ eventsState.error }}
          </div>

          <button
            class="transition ease-in-out inline-block px-7 py-3 leading-none border rounded-full bg-primary text-white border-primary hover:text-primary hover:bg-white mt-6"
            @click.prevent="onSubmit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { onMounted, ref } from "vue"
  import { eventsState, createEventApi } from "@/composables/useEvents"
  import { dayjsFormatToUnix } from "@/helpers"

  const imageDragEnter = ref(false)
  const imageDragLeave = ref(false)
  const imageFilename = ref(null)

  onMounted(() => {

    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {

      document.body.addEventListener(eventName, preventDefaults, false)

    })

    eventsState.form = new FormData()
    eventsState.errors = {}

  })

  const preventDefaults = (e) => {

    e.preventDefault()
    e.stopPropagation()

  }

  const onSubmit = () => {

    createEventApi(eventsState.form)

  }

  const onChangeFile = (e) => {

    const files = e.target.files || e.dataTransfer.files

    if (!files.length) return

    eventsState.form.append("image", files[0], files[0].name)
    imageFilename.value = files[0].name

  }

  const onImageDrop = (e) => {

    preventDefaults(e)
    onChangeFile(e)

  }
</script>
