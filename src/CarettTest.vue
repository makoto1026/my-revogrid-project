<template>
  <div>
    <div ref="editableDiv" contenteditable="true" @click="onBtn" @input="input" @keydown="handlePress" v-html="formattedValue"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, nextTick } from "vue";

const props = defineProps({
  rowIndex: String,
  model: String,
  save: Function,
  close: Function,
});

const value = ref(Object.values(props.model)[props.rowIndex]);
const formattedValue = ref(value.value);
const editableDiv = ref(null);
let caretPos = 0;

watch(value, (newVal) => {
  formattedValue.value = newVal.replace(/(https?:\/\/[^\s]+)/g, '<span style="color: blue;">$1</span>');
});

function setCaretPosition(newPosition) {
  nextTick(() => {
    const el = editableDiv.value;
    const range = document.createRange();
    const sel = window.getSelection();
    if (el.childNodes.length !== 0) {
    range.setStart(el.childNodes[0], newPosition);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    }
  });
}

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function input(event) {
  const caretPos = window.getSelection().anchorOffset;
  value.value = event.target.innerText;
  setCaretPosition(caretPos);
}

function handlePress(event) {
  const currentPosition = getCaretPosition(editableDiv.value)
  if (event.metaKey === true && event.code === 'Enter') {
    value.value = value.value.substring(0, caretPos) + '\n' + value.value.substring(caretPos);
    setCaretPosition(currentPosition);
    event.preventDefault();
    return;
  }

  if (event.code === 'Enter') {
    props.save(value, false);
  }
}

function onBtn() {
  console.log(props.rowIndex);
}

</script>

<style scoped>
* {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
