<!-- <html> -->

<template>
  <button v-on:click="switchLanguage" class="changeLanguage">
    <img v-bind:src="getFlagUrl()" class="flag">{{uiLabels.changeLanguage}}</button>
  <section class="wrapper">
    <div class="Question">
      <!-- Create question name -->
      {{uiLabels.question}}: <br>
      <input type="text" v-model="question">
    </div>
    <div class="Answers">
      <!-- Create answers -->
      {{uiLabels.answersInCreate}} <br>
      <div class="answerGrid">
        <input v-for="(_, i) in answers" v-model="answers[i]" v-bind:key="'answer'+i" class="answers">
      </div>
      <div class="answerButtons">
      <button v-on:click="addAnswer" class="button">
        {{uiLabels.AddAnswerAlternative}}
      </button>
      <button v-on:click="removeAnswer" class="button">
        {{uiLabels.removeAnswer}}
      </button>
    </div>
    </div>
    <div class="addQuestion">
      <!-- Adds question to the poll, should also move onto crete another question -->
      <button v-on:click="addQuestion" class="button">
        {{uiLabels.addQuestion}}
      </button>
      <input type="number" v-model="questionNumber">
    </div>
    <div class="return">
      <router-link v-bind:to="'/create/'+lang" v-slot="{href, navigate}">
      <button :href="href" @click="navigate" class="button">
        {{uiLabels.saveAndReturn}}
      </button>
      </router-link>
    </div>
  </section>
</template>

<script>
  import io from 'socket.io-client';
  const socket = io();

  export default {
    name: 'Create',
    data: function() {
      return {
        lang: 'en',
        pollId: "",
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        uiLabels: {},
        languages: ["sv", "en"]
      }
    },
    created: function() {
      // this.lang = this.$route.params.lang; //Läs in språk från tidigare sida
      //  this.pollId = this.$route.params.id;
      // socket.emit("pageLoaded", this.lang); //ladda in sidan med rätt språk

      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("pollCreated", (data) =>
        this.data = data)
    },
    methods: {
      //createPoll sker i create
      addQuestion: function() {
        socket.emit("addQuestion", {
          pollId: this.pollId,
          q: this.question,
          a: this.answers
        })
      },
      addAnswer: function() {
        this.answers.push("");
      },
      removeAnswer: function() {
        this.answers.pop();
      },
      getFlagUrl: function() {

        return require('../../data/flag-' + this.languages[1] + '.png')
      },
      switchLanguage: function() {
        var b = this.languages.shift();
        this.languages.push(b);
        this.lang = this.languages[0];
        socket.emit("switchLanguage", this.languages[0])
      }
      // runQuestion har legat här men borde inte behövas på create sidan
      // lägg till en funktion för att komma tillbaka till Create.vue
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

  .answers{
    width: 40vw;
    height: 10vh;
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

  .answerButtons{
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
