<template>
  <v-grid 
    ref="grid"
    theme="material"
    @click="handleClick($event)" 
    @keydown="handlePress($event)"
    @beforecellfocus="focus($event)"
    :source="rows" 
    :columns="columns"
    :resize="true"
  />
</template>

<script setup>
import VGrid from "@revolist/vue3-datagrid";
import { ref } from 'vue';
const grid = ref()

const columns = [
  {
    name: 'Id',
    prop: 'id',
    cellTemplate: (createElement, props) => {
      console.log("apppppppppppp")
      return createElement('div', {
        style: {
          color: 'black'
        },
        repeat: true,
        onkeydown: (event) => {
          console.log("awefa")
          console.log(event)
          if (event.metaKey === true && event.code === 'Enter') {
            event.preventDefault();
          }
        },
        contenteditable: true,
      }, props.model[props.prop]);
    },
  },
  {
    name: 'badge',
    prop: 'badge',
    cellTemplate: (createElement, props) => {
      return createElement('span', {
        style: {
          color: 'white',
          backgroundColor: props.model[props.prop],
          borderRadius: '5px',
          padding: '5px',
        },
      }, props.model[props.prop]);
    }
  },
  {
    name: 'contents',
    prop: 'contents',
    cellTemplate: (createElement, props) => {

      const str = props.model[props.prop];
      const regex = /(https?:\/\/[^\s()（）]+)/g;
      const parts = str.split(regex);

      return createElement('dev', {}, parts.map(part => {
          if (regex.test(part)) {
              return createElement('span', {
                  style: {
                      color: 'blue',
                      textDecoration: 'underline'
                  }
              }, part);
          } else {
              return createElement('span', {}, part);
          }
      }));
    },
  },
];

const rows = ref([
  {
    id: "1",
    badge: "blue",
    contents: "http://www.google.com",
  },
  {
    id: "2",
    badge: "red",
    contents: "テストデータ",
  },
]);

function handleClick(event) {
  const str = event.target.innerText;
  if (event.metaKey && (str.includes('https://') || str.includes('http://'))) {
    window.open(str)
  }
}

function handlePress(event) {
  if (event.metaKey === true && event.code === 'Enter') {
    event.preventDefault();
    const value = rows.value[focusedCell.value.rowIndex][focusedCell.value.prop];
    rows.value[focusedCell.value.rowIndex][focusedCell.value.prop] = value + "追加された";
    grid.value.$el.refresh('all')
  }
}

// フォーカスがあったているセルの情報を保持する
const focusedCell = ref();

function focus(event) {
  focusedCell.value = event.detail
}
</script>


<style>
#app {
  height: 700px;
  width: 500px;
}
revo-grid {
  height: 100%;
  width: 100vw;
}

input {
  white-space: pre-wrap;
}
</style>
