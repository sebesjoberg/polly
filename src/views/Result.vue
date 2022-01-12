<template>
  <section class="wrapper">
    <div class="placing">
      <div class="first" v-if='this.leaderBoard.nicknames.length>0'>{{uiLabels.first}} {{this.leaderBoard.nicknames[this.indexes[0]]}}
        {{this.leaderBoard.scores[this.indexes[0]]}} {{uiLabels.points}}
      </div>
      <div class="second" v-if='this.leaderBoard.nicknames.length>1'>
        {{uiLabels.second}} {{this.leaderBoard.nicknames[this.indexes[1]]}}
          {{this.leaderBoard.scores[this.indexes[1]]}} {{uiLabels.points}}
      </div>
      <div class="third" v-if='this.leaderBoard.nicknames.length>2'>
        {{uiLabels.third}} {{this.leaderBoard.nicknames[this.indexes[2]]}}
          {{this.leaderBoard.scores[this.indexes[2]]}} {{uiLabels.points}}
      </div>
      <div class="fourth" v-if='this.leaderBoard.nicknames.length>3'>
        {{uiLabels.fourth}} {{this.leaderBoard.nicknames[this.indexes[3]]}}
          {{this.leaderBoard.scores[this.indexes[3]]}} {{uiLabels.points}}
      </div>
      <div class="fifth" v-if='this.leaderBoard.nicknames.length>4'>
        {{uiLabels.fifth}} {{this.leaderBoard.nicknames[this.indexes[4]]}}
          {{this.leaderBoard.scores[this.indexes[4]]}} {{uiLabels.points}}
      </div>
      <div class="sixth" v-if='this.leaderBoard.nicknames.length>5'>{{uiLabels.first}} {{this.leaderBoard.nicknames[this.indexes[5]]}}
        {{this.leaderBoard.scores[this.indexes[5]]}} {{uiLabels.points}}
      </div>
      <div class="svth" v-if='this.leaderBoard.nicknames.length>6'>
        {{uiLabels.second}} {{this.leaderBoard.nicknames[this.indexes[6]]}}
          {{this.leaderBoard.scores[this.indexes[6]]}} {{uiLabels.points}}
      </div>
      <div class="eigth" v-if='this.leaderBoard.nicknames.length>7'>
        {{uiLabels.third}} {{this.leaderBoard.nicknames[this.indexes[7]]}}
          {{this.leaderBoard.scores[this.indexes[7]]}} {{uiLabels.points}}
      </div>
      <div class="ninth" v-if='this.leaderBoard.nicknames.length>8'>
        {{uiLabels.fourth}} {{this.leaderBoard.nicknames[this.indexes[8]]}}
          {{this.leaderBoard.scores[this.indexes[8]]}} {{uiLabels.points}}
      </div>
      <div class="tenth" v-if='this.leaderBoard.nicknames.length>9'>
        {{uiLabels.fifth}} {{this.leaderBoard.nicknames[this.indexes[9]]}}
          {{this.leaderBoard.scores[this.indexes[9]]}} {{uiLabels.points}}
      </div>
    </div>
  </section>

</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',

  data: function () {
    return {
      leaderBoard:{nicknames:[],
      scores:[]    },
      indexes: [],
      lang:'en',
      uiLabels:{},
      languages: ['en', 'sv'],
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    if(this.languages.includes(this.$route.params.lang)){
    this.lang = this.$route.params.lang;
  }
  while(this.lang!==this.languages[0]){
var b = this.languages.shift();
this.languages.push(b);
}

    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit("result",this.pollId)
    socket.on("rresult", (leaderboard) => {
      this.leaderBoard=leaderboard;
      this.indexes=this.findIndicesOfMax(this.leaderBoard.scores, 10);

    })
  },
  methods: {
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
.wrapper {
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
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
}
</style>
