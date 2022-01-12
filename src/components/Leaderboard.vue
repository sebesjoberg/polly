<template>
  <section class="wrapper" id='back'>
    <div v-if='this.correctAnswer' class="right"> {{uiLabels.right}}</div>
    <div v-else class="wrong"> {{uiLabels.wrong}}</div>
    <div class="placing">
      <div class="first">{{uiLabels.first}} {{this.leaderBoard.nicknames[this.indexes[0]]}}
        {{this.leaderBoard.scores[this.indexes[0]]}} {{uiLabels.points}}
      </div>
      <div class="second" v-if='this.leaderBoard.nicknames.length>1'>
        {{uiLabels.second}}: {{this.leaderBoard.nicknames[this.indexes[1]]}}
          {{this.leaderBoard.scores[this.indexes[1]]}} {{uiLabels.points}}
      </div>
      <div class="third" v-if='this.leaderBoard.nicknames.length>2'>
        {{uiLabels.third}}: {{this.leaderBoard.nicknames[this.indexes[2]]}}
          {{this.leaderBoard.scores[this.indexes[2]]}} {{uiLabels.points}}
      </div>
      <div class="fourth" v-if='this.leaderBoard.nicknames.length>3'>
        {{uiLabels.fourth}}: {{this.leaderBoard.nicknames[this.indexes[3]]}}
          {{this.leaderBoard.scores[this.indexes[3]]}} {{uiLabels.points}}
      </div>
      <div class="fifth" v-if='this.leaderBoard.nicknames.length>4'>
        {{uiLabels.fifth}}: {{this.leaderBoard.nicknames[this.indexes[4]]}}
          {{this.leaderBoard.scores[this.indexes[4]]}} {{uiLabels.points}}
      </div>
      <div class="me">{{uiLabels.myPoints}}: {{this.leaderBoard.scores[this.self]}}
      </div>
    </div>
</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    leaderBoard: Object,
    correctAnswer: Boolean,
    uiLabels: Object,
    nickname: String
  },

  data: function(){
   return{
     indexes:[],
     self:""
   }
 },
 created: function(){//put logic to get the indexes of the first 5 places and ourself
  this.indexes=this.findIndicesOfMax(this.leaderBoard.scores, 5);
  this.self=this.leaderBoard.nicknames.indexOf(this.nickname);
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
.placing{
  color: white;
  font-size: 4vw;
  display: grid;
  position:absolute;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 75%;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.wrong{
  font-size: 3vw;
  background-color: red;
  color: white;
  width:100%;
  height:10%;
  position: absolute;
  top:2.5%;
  left:50%;
  transform: translate(-50%,-2.5%);
}
.right{
  font-size: 3vw;
  background-color: green;
  color: white;
  width:100%;
  height:10%;
  position: absolute;
  top:2.5%;
  left:50%;
  transform: translate(-50%,-2.5%);
}


</style>
