<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    RouterView,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
