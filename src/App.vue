<template>
  <v-grid 
    theme="material"
    @click="handleClick($event)" 
    @keydown="handlePress($event)"
    :source="rows" 
    :columns="columns"
    :resize="true"
  />
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
import { ref } from 'vue';

export default {
  components: {
    VGrid,
  },
  name: "App",
  setup() {
    const columns = [
      {
        name: 'Id',
        prop: 'id',
        cellTemplate: (createElement, props) => {
          return createElement('span', {
            style: {
              color: 'black'
            },
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
      console.log(event)
    }

    

    return {
      columns,
      rows,
      handlePress,
      handleClick,
    };
  },
};
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
</style>
