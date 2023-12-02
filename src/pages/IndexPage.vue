<template>
  <q-page class="flex flex-center">
    <img
    alt="Quasar logo"
    src="~assets/quasar-logo-vertical.svg"
    style="width: 200px; height: 200px"
    >
    <div style="height: 300px; width: 500px; background-color: #ccc;">{{ counter }}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import store from 'src/store'
const counter = computed(() => store.state.counter)


export default defineComponent({
  name: 'IndexPage'
})
</script>
