<template>
<section class="wrapper">
<div class="question">{{question.q}}</div>
<div class="answers">
<button v-for="i in question.a.length" v-on:click="answer(question.a[i-1])" v-bind:key="i"
v-bind:style="{backgroundColor: this.Colors[i-1]}">
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
  watch: {
    //detta är från w3schools alltså setpropert och :root i style
    question: function(){
    var r = document.querySelector(':root');
    r.style.setProperty('--row', Math.ceil(this.question.a.length/2));
    if(this.question.a.length>1){
      r.style.setProperty('--col', 2);
    }else{
      r.style.setPropert('--col',1);
    }
  }
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);

    }
  }
}
</script>
<style>
:root{
  --col: "";
  --row: "";
}
.wrapper{
  background-color: #455879;
  position: relative;
  width: 98vw;
  height: 97vh;
}
.question{

}
.answers{
  width: 99vw;
  height: 90vh;
  display:grid;
  grid-template-columns: repeat(var(--col), 1fr);
  grid-template-rows: repeat(var(--row),1fr);

}
</style>
