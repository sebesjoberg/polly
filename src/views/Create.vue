<!-- <html> -->

<template>
<section class="wrapper">
  <div class="PollCreation">
    <!--  <p style="float:left">Poll link:</p> -->
    <input type="text" class="pollId" v-model="pollId" placeholder="Poll link"> <br>
      <nav v-on:click="createPoll">
        <ul>
          <li>
            {{uiLabels.creatingPoll}}
            <span></span><span></span><span></span><span></span>
          </li>
        </ul>
      </nav>
  </div>
  <div class="Question">
    {{uiLabels.question}}:
    <input type="text" v-model="question">
  </div>
  <div class="AddQuestion">
    <router-link
        v-bind:to="'/QuestionMaker/'+lang"
        v-slot="{href, navigate}"
    >
      <div>
        <nav v-on:click="addQuestion">
          <ul>
            <li :href="href" @click="navigate">
              {{uiLabels.addQuestion}}
              <span></span><span></span><span></span><span></span>
            </li>
          </ul>
        </nav>
      </div>
    </router-link>
    <input type="number" v-model="questionNumber">
  </div>
  <div>
    <nav v-on:click="runQuestion">
      <ul>
        <li>
          {{uiLabels.runQuestion}}
          <span></span><span></span><span></span><span></span>
        </li>
      </ul>
    </nav>
  </div>
  <router-link
      v-bind:to="'/#/'+lang"
      v-slot="{href, navigate}"
  >
    <div>
      <nav v-on:click="goBack">
        <ul>
          <li :href="href" @click="navigate">
            {{uiLabels.goBack}}
            <span></span><span></span><span></span><span></span>
          </li>
        </ul>
      </nav>
    </div>
  </router-link>


  {{data}}
  <router-link v-bind:to="'/result/'+pollId">{{uiLabels.CheckResult}}</router-link>
  <button v-on:click="switchLanguage" class="changeLanguage">
  <img v-bind:src="getFlagUrl()"
  class="flag">{{uiLabels.changeLanguage}}</button>
</section>

</template>

<script>
import QuestionMaker from '@/components/QuestionMaker.vue'
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  components: {
    QuestionMaker
  },
  data: function() {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      languages: ['en', 'sv']
    }
  },
  created: function() {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    //lägg till något som get ett unikt id

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
    getFlagUrl: function(){

      return require('../../data/flag-'+this.languages[1]+'.png')
    },
    switchLanguage: function() {
      var b = this.languages.shift();
      this.languages.push(b);
      this.lang=this.languages[0];
      socket.emit("switchLanguage", this.languages[0])
    },
    createPoll: function() {
      socket.emit("createPoll", {
        pollId: this.pollId,
        lang: this.lang
      })
    },
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
    runQuestion: function() {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber
      })
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
.changeLanguage{
  left:87.5%;
  position:absolute;
  width: 12.5%;
  height: 5%;
  font-size: 1vw;
 }

.PollCreation {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: span 2;
  place-self: center;
  top: -50%;
  font-size: 80%;
}

.Question {}

.Answers {}

.AddQuestion {}


.button {
  font-size: 3vh;
  background-color: transparent;
  color: white;
  border-radius: 10px;
  height: 50%;
  width: 50%;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 50%;
  width: 50%;
}

nav ul li {
  --c: #0097a7;
  color: black;
  font-size: 16px;
  border: 0.3em solid var(--c);
  border-radius: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  font-family: sans-serif;
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 3em;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;

}

nav ul li span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: var(--c);
  transform: translateY(150%);
  border-radius: 50%;
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  transition-delay: calc((var(--n) - 1) * 0.1s);
  z-index: -1;
}

nav ul li:hover {
  color: white;
}

nav ul li:hover span {
  transform: translateY(0) scale(2);
}

nav ul li span:nth-child(1) {
  --n: 1;
}

nav ul li span:nth-child(2) {
  --n: 2;
}

nav ul li span:nth-child(3) {
  --n: 3;
}

nav ul li span:nth-child(4) {
  --n: 4;
}

/*<div class="Answers"> här ligger kod för answerknappar
detta eftersom det inte funkat att kommentera bort dem
i template
    {{uiLabels.answersInCreate}}
    <input v-for="(_, i) in answers" v-model="answers[i]" v-bind:key="'answer'+i">
    <button v-on:click="addAnswer" class="button">
      {{uiLabels.AddAnswerAlternative}}
    </button>
    <button v-on:click="RemoveAnswer" class="button">
      {{uiLabels.removeAnswer}}
    </button>
  </div>*/


.pollId {
  margin: 10px;
  width: 40vw;
  height: 5vw;
  border-radius: 10px;
  text-align: center;
}
</style>
