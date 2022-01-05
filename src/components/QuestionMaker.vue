<!-- <html> -->
<!-- grid view till svaren med något maxtak
och att denna då alltid håller samma storlek så sidan blir nsygg -->
<template>

  <section class="wrapper">

    <div class="Question">
      <label for="Question">{{uiLabels.question}}</label><br>
      <input v-model="id" type="text" class="Question" >
    </div>

    <div class="wrap">
      {{uiLabels.answersInCreate}}
      <div  class="answers">
    <input v-for="i in answers.length"  v-bind:key="i"></div>
    </div>
        <button v-on:click="removeAnswer" class="removeAnswer">
          {{uiLabels.removeAnswer}}
        </button>
        <button v-on:click="addAnswer" class="addAnswer">
          {{uiLabels.AddAnswerAlternative}}
        </button>



        <button class="return" v-on:click="goBackToCreate">
          {{uiLabels.saveAndReturn}}
        </button>


  </section>
</template>

<script>
  import io from 'socket.io-client';
  const socket = io();

  export default {
    name: 'Create',
    props:{
      uiLabels: Object,
      lang: String
    },
    data: function() {
      return {
        pollId: "",
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        languages: ["en", "sv"],
        inQuestionMaker: true,
        inOverview: false
      }
    },

    methods: {
      //createPoll sker i create
      addQuestion: function() {//skickas kanske inte exakt det som behövs för tillfället

        this.questionNumber += 1;
        socket.$emit("madeQuestion", {
          q: this.question,
          a: this.answers,
          qnr: this.questionNumber
        })
      },
      goBackToCreate: function(){
        this.$parent.goBackToCreate();
      },
      addAnswer: function() {
        this.answers.push("");
      },
      removeAnswer: function() {
        this.answers.pop();
      }
      // runQuestion har legat här men borde inte behövas på create sidan
      // lägg till en funktion för att komma tillbaka till Create.vue med sparade frågor
      // trippelchecka kommunikationen mellan de sidorna.
    }
  }
</script>

<style lang="css" scoped>
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color:#0097a7;
    padding:0;
    margin:0;

}
.wrap{
  width:100%;
  height:50%
}
.answers{
  display:grid;
  width:100%;
  height: 100%;
  position: relative;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2,1fr);

}
.answer{
 position: relative;
 width: 100%;
 height: 100%;


}
  .changeLanguage {
    left: 87.5%;
    position: absolute;
    width: 12.5%;
    height: 5%;
    font-size: 1vw;
  }

  .Question {

  }

  .question {
    font-size: 1.5vw;
    background-color: #0097a7;
    color:white;
    border-radius: 10px;
    width:50%;
  }


.removeAnswer{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:20%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-20%,-90%);
}

.addAnswer{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:80%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-80%,-90%);
}



  .return {
    font-size: 2vw;
    background-color: #455879;
    color:white;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:90%;
    width:11.25%;
    height: 15%;
    transform: translate(-50%,-90%);
  }
</style>
