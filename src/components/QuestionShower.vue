<template>
<section class="wrapper">
<div class="question">{{question.q}}</div>
<div class="answers">
<button v-for="i in question.a.length" v-on:click="answer(question.a[i-1])" v-bind:key="i"
v-bind:style="{backgroundColor: this.Colors[i-1]}" class="answer">
  {{ question.a[i-1] }}
</button>
</div>
<button class="endQuestion" v-on:click="endQuestion">{{uiLabels.endQuestion}}</button>
<div class="players">
  {{this.participants}}
</div>
<div class="clock">
  <span id="seconds"></span>
</div>

</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    question: Object,
    uiLabels: Object,
    participants: Number

  },
  data: function(){
   return{
     Colors: ["blue", "red", "purple", "green"]
     //mer färger om man vill ha fler
   }
  },

  created: function(){

    //Tagit baskod av timer från stackoverflow
    var sec=0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }

    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec);
    }, 1000);

},

  methods: {

    endQuestion: function () {
      clearInterval()
      this.$emit("endQuestion", );
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
.question{
 width:100%;
 height:20%;
 font-size: 6vw;
 color:white;
 overflow:hidden;
 text-align: center;
 position: relative;
 top:2.5%;
 left:50%;
 transform: translate(-50%,-2.5%);
}
.answer{
  margin:5%;
  font-size: 2vw;
  color:white;
  overflow:hidden;
  text-align: center;
  position: relative;
}
.answers{
  width: 80%;
  height: 80%;

  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2,1fr);

}

.endQuestion{
  background-color: #0097a7;
  font-size: 20px;
  color: white;
  position: absolute;
  width:11.25%;
  height: 15%;
  top:37%;
  left:88%;
  transform: translate(-37%,-88%);
}

.players{
  color: white;
  position: absolute;
  font-size: 100px;
  top:60%;
  left:90%;
  transform: translate(-60%,-90%);
}

.clock{
  color: white;
  position: absolute;
  font-size: 100px;
  top:80%;
  left:92%;
  transform: translate(-80%,-92%);
}

</style>
