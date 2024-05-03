<template>
  <div id="app">
    <QuizParent/>
</div>
</template>

<script>
import QuizParent from './components/quizApp/QuizParent.vue';

export default {
  name: 'App',
  components: {  QuizParent}
}
</script>

<style>
html, body, *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
