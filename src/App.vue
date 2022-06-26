<template>
  <notifications
    position="bottom right"
    :duration="5000"
    classes="ticketpass-notification"
  />
  <router-view />
</template>

<script>
  export default {
    name: "App",
    components: {},
  }
</script>