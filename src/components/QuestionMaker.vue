<!-- <html> -->
<!-- grid view till svaren med något maxtak
och att denna då alltid håller samma storlek så sidan blir nsygg -->
<template v-if='this.inQuestionMaker'>

  <section class="wrapper">
    <div class="Question">
      <!-- Create question name -->
      {{uiLabels.question}}: <br>
      <input type="text" v-model="question" class="question">
    </div>
    <div class="Answers">
      <!-- Create answers -->
      {{uiLabels.answersInCreate}} <br>
      <div class="answerGrid">
        <input v-for="(_, i) in answers" v-model="answers[i]" v-bind:key="'answer'+i" class="answers">
      </div>
      <div class="answerButtons">
        <button v-on:click="removeAnswer" class="button">
          {{uiLabels.removeAnswer}}
        </button>
        <button v-on:click="addAnswer" class="button">
          {{uiLabels.AddAnswerAlternative}}
        </button>
      </div>
    </div>
    <div class="return">
        <button class="button" v-on:click="goBackToCreate">
          {{uiLabels.saveAndReturn}}
        </button>
    </div>
    <div class="addQuestion">
      <!-- Adds question to the poll, should also move onto create another question -->
      <button v-on:click="addQuestion" class="button">
        {{uiLabels.addQuestion}}
      </button>
      <!--  <input type="number" v-model="questionNumber"> -->
    </div>
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
    display: grid;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: #455879;
  }

  .changeLanguage {
    left: 87.5%;
    position: absolute;
    width: 12.5%;
    height: 5%;
    font-size: 1vw;
  }

  .Question {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: end;
    place-self: center;
    position: relative;
  }

  .question {
    width: 40vw;
    height: 7vh;
  }

  .answers {
    width: 40vw;
    height: 7vh;
    text-align: center;
    overflow: scroll;
  }

  .Answers {
    /*grid-row: 2; */
    place-self: stretch;
    grid-area: 2 / 1/ span 3/ span 3;
    display: grid;
    grid-template-rows: auto 1fr 1fr;
    /*justify-content: center; */
  }

  .answerGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10%;
    grid-row-gap: 10%;
    justify-content: center;
    grid-column-start: 1;
    place-self: center;
  }

  .answerButtons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0%;
    justify-content: center;
  }


  .addQuestion {}

  .button {
    font-size: 3vh;
    background-color: #0097a7;
    color: white;
    border-radius: 10px;
    height: 50%;
    width: 50%;
    place-self: center;
  }
</style>
