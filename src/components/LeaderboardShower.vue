<template>
  <section class="wrapper">
    <div class="amountQuestions" v-if='this.cnr<this.totq'>
      {{uiLabels.question}} {{this.cnr}} {{uiLabels.outOf}} {{this.totq}}
    </div>
    <div class="Finished" v-if='this.cnr==this.totq'>
      {{uiLabels.finalResult}}
    </div>
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
    <button class="nextQuestion button-effect" v-on:click="nextQuestion" v-if='this.cnr<this.totq'>{{uiLabels.nextQuestion}}</button>
    <router-link
        v-bind:to="'/'+this.lang"
        v-slot="{href, navigate}"
        v-else>
            <button :href="href" @click="navigate" class="goBack button-effect">
              {{uiLabels.goBack}}
            </button>
    </router-link>
</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    leaderBoard: Object,
    uiLabels: Object,
    totq: Number,
    cnr: Number
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
},
  nextQuestion: function () {
    this.$emit("nextQuestion");
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
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 50%;
  margin-top: 8%;
}

.amountQuestions{
  color:white;
  font-size: 3vw;
  margin-top: 5%;
}

.Finished{
  color:white;
  font-size: 3vw;
  margin-top: 5%;
}

.nextQuestion{
  background-color: #0097a7;
  font-size: 20px;
  color: white;
  position: absolute;
  width:11.25%;
  height: 15%;
  top:85%;
  left:92%;
  transform: translate(-85%,-92%);
  border-radius:10px;
}

.goBack{
  background-color: #0097a7;
  font-size: 20px;
  color: white;
  position: absolute;
  width:11.25%;
  height: 15%;
  top:85%;
  left:92%;
  transform: translate(-85%,-92%);
  border-radius:10px;
}

.button-effect{
  transition: all 0.2s ease-in-out;
}
.button-effect:hover{
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .8);
}
</style>
