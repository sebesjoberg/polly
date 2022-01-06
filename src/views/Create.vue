<!-- <html> -->

<template>
  <section class="wrapper1" v-if="this.inOverview">

      <!--  här kanske det måste börjas om? dumt att ha en som bestämmer storlek
    kan man inte låta varje objekt få sin storlek för sig-->
      <input type="text" class="pollId" v-model="pollId" placeholder="Poll id">
      <button class="load" v-on:click="createPoll"> {{uiLabels.loadPoll}} </button>
      <div class="grid">
        <button class="question" v-for="i in this.data.questions.length" v-on:click="edit(i-1)" v-bind:key="i">
        {{ this.data.questions[i-1].q }}
      </button></div>


      <button class="AddQuestion" v-on:click="goToAddQuestion" v-if="this.data.questions.length<24">
             {{uiLabels.addQuestion}}
</button>

    <router-link
        v-bind:to="'/'+this.lang"
        v-slot="{href, navigate}">
            <button :href="href" @click="navigate" class="goBack">
              {{uiLabels.goBack}}
            </button>
    </router-link>

    <button v-on:click="switchLanguage" class="changeLanguage">
      <img v-bind:src="getFlagUrl()"
           class="flag">{{uiLabels.changeLanguage}}</button>


  </section>
  <QuestionMaker v-bind:lang='this.lang'
                 v-bind:uiLabels='this.uiLabels'
                 v-bind:questionNumber='this.questionNumber'
                 v-bind:data='this.data'
                 v-bind:inQuestionMaker='this.inQuestionMaker'
                 v-else-if='this.inQuestionMaker'
                 v-on:madeQuestion="addQuestion($event)"/>

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
      pollSave: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {questions: "", correctAnswers:""},//innehåller nu questions kan användas för att redigera på ett vistt ställe eller liknande
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
    socket.on("dataUpdate", (data) =>{

        this.data = data}
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    edit: function(index){
      this.questionNumber=index;
      this.inOverview=false;
      this.inQuestionMaker=true;

    },
    goToAddQuestion: function(){
      this.questionNumber=this.data.questions.length
      this.inOverview=false;
      this.inQuestionMaker=true;
    },
    goBackToCreate: function(){
      this.inOverview=true;
      this.inQuestionMaker=false;
       //sätt qnr här redan
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
      this.pollSave=this.pollId;
      if(this.pollSave.length>0){
      socket.emit("createPoll", {
        pollId: this.pollSave,
        lang: this.lang
      });}
    },
    addQuestion: function(load) {
      socket.emit("addQuestion", {
        pollId: this.pollSave,
        q: load.q,
        a: load.a,
        qnr: load.qnr
      })
      this.inOverview=true;
      this.inQuestionMaker=false;

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
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: fixed;
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

.AddQuestion {
  font-size: 2vw;
  background-color: #455879;
  color:white;
  position:absolute;
  left:70%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-70%,-90%);
  border-radius: 10px;
}
.goBack{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  position:absolute;
  left:30%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-30%,-90%);
  border-radius: 10px;
}
.load{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  position:absolute;
  left:80%;
  top:4%;
  width:11.25%;
  height: 15%;
  transform: translate(-80%,-4%);
  border-radius: 10px;
}


.pollId {
  font-size: 3vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:35%;
  top:5%;
  width:50%;
  height: 10%;
  transform: translate(-35%,-5%);
  text-align: center;
}
.question{
  text-align: center;
  font-size: 1vw;
  color:white;
  overflow:hidden;
  margin:10px;
  background-color:#455879;
}
.grid{
  display: grid;

  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4,1fr);
  position: absolute;
  height: 50%;
  width:100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

}
</style>
