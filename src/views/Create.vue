<template>
  <section class="wrapper">
  <div>
    <div class ="PollCreation" >
      <p style="float:left">Poll link:</p>
    <input type="text" v-model="pollId"> <!-- Använder vi denna länk? -->
    <button v-on:click="createPoll" class ="button">
      Create poll
    </button>
    </div>
    <div>
      {{uiLabels.question}}: <!-- Importerad från labels, dynamiskt språkbyte  -->
      <input type="text" v-model="question"> <!-- Skriv in frågor -->
      <div>
        Answers:
        <input v-for="(_, i) in answers"
               v-model="answers[i]"
               v-bind:key="'answer'+i">  <!-- Skapar flera svar -->
        <button v-on:click="addAnswer" > <!-- lägg till svar genom addAnswer funktionen-->
          Add answer alternative
        </button>
      </div>
    </div>
    <button v-on:click="addQuestion">
      Add question
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>
  </section>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);

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
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>
<style>
@import 'https://fonts.googleapis.com/css?family=Pacifico|Dosis';

.wrapper {
  padding: 0;
  margin: 0;
  display: grid;
  background-color: #455879;
  width: 100vw;
  height: 100vh;
}
.PollCreation{
  position:absolute;
  left:50%;
  top:50%;
  aspect-ratio:9/6;
  transform: translate(-50%,-50%);
}
.button{
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  height: 15%;
}
</style>
