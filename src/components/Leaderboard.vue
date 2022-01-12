<template>
  <section class="wrapper">
  <div class="first">{{uiLabels.first}}: {{this.leaderBoard.nicknames[this.indexes[0]]}}
    {{this.leaderBoard.scores[this.indexes[0]]}} {{uiLabels.points}}
  </div>
  <div class="second">
    {{uiLabels.second}}: {{this.leaderBoard.nicknames[this.indexes[1]]}}
      {{this.leaderBoard.scores[this.indexes[1]]}} {{uiLabels.points}}
  </div>
  <div class="third">
    {{uiLabels.third}}: {{this.leaderBoard.nicknames[this.indexes[2]]}}
      {{this.leaderBoard.scores[this.indexes[2]]}} {{uiLabels.points}}
  </div>
  <div class="fourth">
    {{uiLabels.fourth}}: {{this.leaderBoard.nicknames[this.indexes[3]]}}
      {{this.leaderBoard.scores[this.indexes[3]]}} {{uiLabels.points}}
  </div>
  <div class="fifth">
    {{uiLabels.fifth}}: {{this.leaderBoard.nicknames[this.indexes[4]]}}
      {{this.leaderBoard.scores[this.indexes[4]]}} {{uiLabels.points}}
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

  data: function(){
   return{
     indexes:[]
   }
 },
 created: function(){//put logic to get the indexes of the first 5 places and ourself
  this.indexes=this.findIndicesOfMax(this.leaderBoard.scores, 5)

 },
 methods: {
   //findIndicesOfMax tagen från stackO
   findIndicesOfMax: function (inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
        if (outp.length > count) {

            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
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

.first{

}
</style>
