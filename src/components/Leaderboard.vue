<template>
  <section class="wrapper">
  <div class="1st">{{uiLabels.first}}: {{this.leaderBoard.nicknames[0]}}
    {{this.leaderBoard.scores[0]}} {{uiLabels.points}}
</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    leaderBoard: Object,
    correctAnswer: Boolean,
    uiLabels: Object
  },
  created: function(){//put logic to get the indexes of the first 5 places and ourself

  },
  data: function(){
   return{
     something:0
   }
 }
}
</script>
<style lang="css" scoped>
button:hover{
cursor:pointer;
}
.wrapper{
  background-color: #455879;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
