<template>
  <section class="wrapper">
  <div>
    Poll link:
    <input type="text" v-model="pollId"> <!-- Använder vi denna länk? -->
    <button v-on:click="createPoll">
      Create poll
    </button>
    <div>
      {{uiLabels.question}}: <!-- Importerad från labels, dynamiskt språkbyte  -->
      <input type="text" v-model="question"> <!-- Skriv in frågor -->
      <div>
        Answers:
        <input v-for="(_, i) in answers"
               v-model="answers[i]"
               v-bind:key="'answer'+i">  <!-- Skapar flera svar -->
        <button v-on:click="addAnswer"> <!-- lägg till svar genom addAnswer funktionen--> 
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
    <router-link to="/result/">Check result</router-link>
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

.wrapper{
  padding:0;
  margin:0;
  display: grid;

  width: 100vw;
  height: 100vh;
}

.wrap_Left{
  background-color: #455879;
  position: relative;

}

.wrap_Right{
  background-color: #0097a7;
  position: relative;
}

.join{
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  aspect-ratio:9/6;
  height: 15%;
  transform: translate(-50%,-50%);
}

.create{
  font-size: 3vh;
  background-color: #455879;
  color:white;
  position:absolute;
  left:50%;
  top:50%;
  aspect-ratio:9/6;
  height: 15%;
  transform: translate(-50%,-50%);

  border-radius: 10px;
}
.changeLanguage{
  left:75%;
  position:absolute;
  width: 25%;
  height: 5%;
  font-size: 1vw;
}

.flag{
  width:3vw;
  height:auto;


}

</style>
