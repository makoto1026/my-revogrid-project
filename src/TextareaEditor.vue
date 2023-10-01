<template>
  <div>
    <div ref="textDom" contenteditable="true" v-text="innerContent" @keydown="handlePress" @input="sync"></div>
    <div>aaaaa{{ innerContent }}</div>
  </div>
</template>
<script setup>
import { ref,defineProps,onMounted, watchEffect} from 'vue';


const props = defineProps({
  rowIndex: String,
  model: String,
  save: Function,
  close: Function,
})

const textDom = ref()
const innerContent = ref(Object.values(props.model)[props.rowIndex])
const content = ref(Object.values(props.model)[props.rowIndex])

function sync (e) {
  content.value = e.target.innerHTML
}

// textDomの再描画が走ったとき
watchEffect(() => {
  if (textDom.value) {
    console.log('aaa');
  }
});



function handlePress(event) {
  if (event.metaKey === true && event.code === 'Enter') {
    // content.value = content.value + '<br>';
    // textDom.value.$el.innerText ="aaaaaaa"
    textDom.value.innerText = "aaaaaaaa"
    event.preventDefault();
    return;
  }

}

onMounted(() => {
  innerContent.value = content.value
})
</script>