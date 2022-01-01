<template>
  <section class="wrapper">
hello
</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    leaderBoard: {
    nicknames: [],
    scores:[]},
    correctAnswer: Boolean
  },
  data: function(){
   return{
     something:0
   }
  }
}
</script>
<style lang="css" scoped>
.wrapper{
  background-color: #455879;
  position: fixed;
  width: 98vw;
  height: 97vh;
}
</style>
