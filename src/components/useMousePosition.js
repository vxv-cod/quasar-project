import { ref, toRefs, onMounted, onUnmounted, reactive } from 'vue'

export
// function useMousePosition() {
//   const x = ref(0);
//   const y = ref(0);

//   function update(e) {
//     x.value = e.pageX;
//     y.value = e.pageY;
//   }

//   onMounted(() => {
//     window.addEventListener("mousemove", update);
//   });

//   onUnmounted(() => {
//     window.removeEventListener("mousemove", update);
//   });

//   return { x, y };
// }


function useMousePosition() {
  const pos = ref({
    x: 0,
    y: 0
  });

  function update(e) {
    pos.value.x = e.pageX;
    pos.value.y = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return pos.value
}

// function useMousePosition() {
//   const pos = reactive({
//     x: 0,
//     y: 0
//   });

//   function update(e) {
//     pos.x = e.pageX;
//     pos.y = e.pageY;
//   }

//   onMounted(() => {
//     window.addEventListener("mousemove", update);
//   });

//   onUnmounted(() => {
//     window.removeEventListener("mousemove", update);
//   });
//   return toRefs(pos);
// }
// // const { x, y } = toRefs(pos)
// // const { x, y } = toRefs(useMousePosition())


