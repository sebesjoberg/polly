<template>
  <section class="wrapper">
    <div class ="PollCreation" >
    <!--  <p style="float:left">Poll link:</p> -->
    <input type="text" class="pollId" v-model="pollId" placeholder="Poll link"> <br>
    <button v-on:click="createPoll" class ="button">
      {{uiLabels.creatingPoll}}
    </button>
    </div>
    <div class="Question">
      {{uiLabels.question}}:
      <input type="text" v-model="question">
    </div>
    <div class= "Answers">
      {{uiLabels.answersInCreate}}
        <input v-for="(_, i) in answers"
               v-model="answers[i]"
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer" class ="button">
          {{uiLabels.AddAnswerAlternative}}
        </button>
        <button v-on:click="RemoveAnswer" class ="button">
          {{uiLabels.removeAnswer}}
        </button>
    </div>
    <div class="AddQuestion">
    <button v-on:click="addQuestion" class ="button">
      {{uiLabels.addQuestion}}
    </button>
    <input type="number" v-model="questionNumber">
    </div>
    <button v-on:click="runQuestion" class="questionButton" >
      {{uiLabels.runQuestion}}
    </button>
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">{{uiLabels.CheckResult}}</router-link>
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
    //lägg till något som get ett unikt id man får bara välja namn

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
    RemoveAnswer: function () {
      this.answers.pop();
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
  display: grid;
  justify-content: center;
  padding: 0;
  margin: 0;
  background-color: #455879;

}
.PollCreation{
  grid-row:1;
  grid-column-start: 1;
  grid-column-end: span 2;
  place-self: center;
  top: -50%;
  font-size: 80%;
  /* aspect-ratio:9/6; */

}
.Question{

}
.Answers{

}
.AddQuestion{

}
.questionButton{
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  width: 60%;
}

.button{
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  height: 50%;
  width: 50%;
}



.pollId {
  margin: 10px;
  width: 40vw;
  height: 5vw;
  border-radius: 10px;
  text-align: center;
}

</style>
