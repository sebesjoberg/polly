<template>
  <section class="wrapper">
  <div class="1st">{{uiLabels.first}}: {{this.leaderBoard.nicknames[0]}}
    {{this.leaderBoard.scores[0]}} {{uiLabels.points}}
  </div>
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
    var outp = [];
    for (var i = 0; i < this.leaderBoard.scores.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > 5) {
            outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    this.indexes=outp;
  },
  data: function(){
   return{
     indexes:[]
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
