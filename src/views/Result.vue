<template>
  <section>
    <div class="placing">
      <div class="first">{{uiLabels.first}} {{this.leaderBoard.nicknames[this.indexes[0]]}}
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
      uiLabels:{}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit("result",this.pollId)
    socket.on("rresult", (leaderboard) => {
      this.leaderBoard=leaderboard;
      this.indexes=this.findIndicesOfMax(this.leaderBoard.scores, 5);

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
  display: grid;
  justify-content: center;
  padding: 0;
  margin: 0;
  background-color: #455879;
}
</style>
