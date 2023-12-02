<template>
  <p contenteditable @input="onInput" ref="p"></p>
  {{ msg }}




</template>


<script setup>
import { onMounted, ref } from "vue";

const msg = ref("hello world");
const p = ref(null);


onMounted(() => {
  p.value.innerText = msg.value;
});

function onInput(e) {
  msg.value = e.target.innerText;
}
</script>


<style scoped>
[contenteditable] {
  border: 2px solid orange;
  padding: 1rem;
  font-size: 1.5rem;
}

[contenteditable]:focus {
  background-color: rgb(207, 196, 255);
}
</style>
