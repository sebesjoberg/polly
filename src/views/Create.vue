<!-- <html> -->

<template>
  <section class="wrapper1" v-if="this.inOverview">
    <div class="PollCreation">
      <!--  här kanske det måste börjas om? dumt att ha en som bestämmer storlek
    kan man inte låta varje objekt få sin storlek för sig-->
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
    <div class="QuestionName">
      {{uiLabels.question}}:
      <input type="text" v-model="question">
    </div>
    <div class="AddQuestion">
      <nav v-on:click="goToAddQuestion">
        <ul>
          <li>
            {{uiLabels.addQuestion}}
            <span></span><span></span><span></span><span></span>
          </li>
        </ul>
      </nav>
    </div>

    <router-link
        v-bind:to="'/'+this.lang"
        v-slot="{href, navigate}"
        class="GoBackButton"
    >
      <div>
        <nav>
          <ul>
            <li :href="href" @click="navigate">
              {{uiLabels.goBack}}
              <span></span><span></span><span></span><span></span>
            </li>
          </ul>
        </nav>
      </div>
    </router-link>

    <button v-on:click="switchLanguage" class="changeLanguage">
      <img v-bind:src="getFlagUrl()"
           class="flag">{{uiLabels.changeLanguage}}</button>


  </section>
  <QuestionMaker v-bind:lang='this.lang'
                 v-bind:uiLabels='this.uiLabels'
                 v-if='this.inQuestionMaker'
                 v-on:madeQuestion="addQuestion(question)"
                 v-on:return="goBackToCreate"/>

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
      lang: 'en',
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},//innehåller nu questions och qnr använda detta i questionmaker sen
      uiLabels: {},
      languages: ['en', 'sv'],
      inQuestionMaker: false,
      inOverview: true
    }
  },
  created: function() {
    if(this.languages.includes(this.$route.params.lang)){
      this.lang = this.$route.params.lang;
    }
    while(this.lang!==this.languages[0]){
      var b = this.languages.shift();
      this.languages.push(b);
    }
    //kollar så languages är i rätt ordning
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
    goToAddQuestion: function(){
      this.inOverview=false;
      this.inQuestionMaker=true;
    },
    goBackToCreate: function(){
      this.inOverview=true;
      this.inQuestionMaker=false; //sätt qnr här redan
    },
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
    addQuestion: function(load) {
      socket.emit("addQuestion", {
        pollId: this.pollId,
        q: load.question,
        a: load.answers,
        qnr: load.qnr
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
<style lang="css" scoped>
@import 'https://fonts.googleapis.com/css?family=Pacifico|Dosis';
.wrapper1 {
  display: grid;
  height: 100%;
  width: 100%;
  justify-content: center;
  padding: 0;
  margin: 0;
  position: fixed;
  /*width: 99vw;
  height: 97vh;*/
  background-color: #0097a7;
}
.wrapper {
  display: grid;
  justify-content: center;
  padding: 0;
  margin: 0;
  position: fixed;
  width: 99vw;
  height: 97vh;
  background-color: #0097a7;
}
.changeLanguage{
  left:87.5%;
  position:absolute;
  width: 12.5%;
  height: 5%;
  font-size: 1vw;
}
.flag{
  width:2vw;
  height:auto;
}
.PollCreation {
  /*width: 40vw;
  height: 70vh;*/
  place-self: center;
}
.QuestionName {
  grid-row: 2;
  grid-column: 1;
  margin-left: -10%;
  margin-top: 10%;
}

.AddQuestion {
  grid-row: 2;
  grid-column: 1;
  margin-top: 15%;
  margin-left: 20%;
  width: 150%;
}
.GoBackButton{
  margin-left: 30%;
  grid-row: 3;
  grid-column: 1;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 50%;
  width: 50%;
}
nav ul li {
  --c: #455879;
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
  width: 40vw;
  height: 5vw;
  border-radius: 10px;
  text-align: center;
}
</style>
