<template>
<section class="wrapper">
<div class="question">{{question.q}}</div>
<div class="answers">
<button v-for="i in question.a.length" v-on:click="answer(i-1)" v-bind:key="i"
v-bind:style="{backgroundColor: this.Colors[i-1]}" class="answer">
  {{ question.a[i-1] }}
</button>
</div>
</section>
</template>
<script>

export default {
  name: 'Bars',
  props: {
    question: Object
  },
  data: function(){
   return{
     Colors: ["blue", "red", "purple", "green"]
     //mer färger om man vill ha fler än 4 frågor
   }
  },
  methods: {
    answer: function (index) {

      this.$emit("answer", index);

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
  width: 100%;
  height: 80%;

  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2,1fr);

}
</style>
