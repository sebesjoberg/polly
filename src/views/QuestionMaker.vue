<!-- <html> -->

<template>
<section class="wrapper">
  <div class="Question">
    {{uiLabels.question}}: <br>
    <input type="text" v-model="question">
  </div>
  <div class="Answers">
    {{uiLabels.answersInCreate}} <br>
    <input v-for="(_, i) in answers" v-model="answers[i]" v-bind:key="'answer'+i">
    <button v-on:click="addAnswer" class="button">
      {{uiLabels.AddAnswerAlternative}}
    </button>
    <button v-on:click="removeAnswer" class="button">
      {{uiLabels.removeAnswer}}
    </button>
  </div>
  <div class="addQuestion">
    <button v-on:click="addQuestion" class="button">
      {{uiLabels.addQuestion}}
    </button>
    <input type="number" v-model="questionNumber">
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
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function() {
  //  this.lang = this.$route.params.lang; //Läs in språk från tidigare sida
  //  this.pollId = this.$route.params.id;
  //  socket.emit("pageLoaded", this.lang); //ladda in sidan med rätt språk

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

.Question{
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: end;
  place-self: center;
  position: relative;
}
.Answers{
  grid-row: 2;
  place-self: center;
  grid-area: 2 / 1/ span 3/ span 3;

}
.addQuestion{

}
.button {
  font-size: 3vh;
  background-color: #0097a7;
  color: white;
  border-radius: 10px;
  height: 50%;
  width: 50%;
}

</style>
