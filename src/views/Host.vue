<template>
  <section class="invalid" v-if="this.invalid"><!--allt som händer när quizen inte finns -->
  </section>

<section class="beforeQuiz" v-else-if="this.beforeQuiz"> <!--allt innan quizen börjar -->
  <header class="head">
    <h1>Game ID:{{this.pollId}} </h1>
  </header>

  <div class="participants">
    <button class="participant" v-for="i in this.leaderBoard.nicknames.length"
    v-on:click="kick(this.leaderBoard.nicknames[i-1])"
  v-bind:key=i> {{this.leaderBoard.nicknames[i-1]}}

    </button>
  </div>

    <router-link
    v-bind:to="'/'"
    v-slot="{href}"
    >
    <button :href="href" @click="goBack" class="goBack">
      {{uiLabels.goBack}}
    </button></router-link>
    <button class="startQuiz" v-if="this.leaderBoard.nicknames.length>0"
      v-on:click="nextQuestion()"> {{uiLabels.startQuiz}}</button>
</section>




<LeaderBoard v-else-if="this.betweenQuestion"
v-bind:leaderBoard='this.leaderBoard'
v-bind:uiLabels='this.uiLabels'
v-bind:totq='this.totQuestion'
v-bind:cnr='this.currentQuestion'
v-on:nextQuestion='nextQuestion'/>




<section class="onQuestion" v-else-if="this.onQuestion">

  <Question v-bind:question="question"
   v-bind:uiLabels='this.uiLabels'
   v-bind:participants='this.leaderBoard.nicknames.length'
   v-bind:answered='this.answered'
   v-on:endQuestion='endQuestion'
            />
</section>








</template>



<script>
import io from 'socket.io-client';
import Question from '@/components/QuestionShower.vue';
import LeaderBoard from '@/components/LeaderboardShower.vue';
const socket = io();
//i denna kan man lägga lite vad man vill på stängning och reloading så körs det
//skulle ex kunna låta servern veta att man inte längre är host och att någon annan då kan ta den?

export default {
  components: {
    Question,
    LeaderBoard
  },

  data: function(){
    return{
      question: {
        q: "",
        a: []
      },
      leaderBoard:{nicknames:[],
      scores:[]},
      pollId: "inactive poll",
      beforeQuiz: true,
      invalid: false,
      betweenQuestion: false,
      onQuestion: false,
      afterQuiz: false,
      answered:0




    }
  },
    created: function () {

    socket.emit("pageLoaded", this.lang || "en");

    socket.emit('hostPoll', this.$route.params.id)
    socket.on('hosted', (Id) => {
      this.pollId=Id;
    })
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("newQuestion", (q) => {
        this.question = q;
      });
    socket.on("nickNames", (nicknames) =>{

            if(nicknames !== null){

              this.leaderBoard.nicknames = nicknames

            }else{
            this.invalid=true;
          }})
    socket.on("answer",() =>{
      this.answered +=1
    })
    socket.on("leaderboard", (d) =>{
      this.answered=0;
      this.leaderBoard=d.l
      this.totQuestion=d.totq
      this.currentQuestion=d.qnr
      this.betweenQuestion = true
      this.onQuestion = false

    })
        },
        methods: {
          nextQuestion: function(){
            socket.emit("nextQuestion",this.pollId);
            this.beforeQuiz = false
            this.invalid = false
            this.betweenQuestion = false
            this.onQuestion = true
            this.afterQuiz = false
          },
          goBack: function(){
            socket.emit("closePoll",this.pollId);
          },
          kick: function(nick){

            socket.emit("kick",{nickname: nick,
            pollId: this.pollId});
          },
          endQuestion: function(){
            socket.emit("endQuestion", this.pollId )
            }

          }
        }



</script>


<style lang="css" scoped>
button{
  transition: all 0.2s ease-in-out;
}
button:hover{
  cursor:pointer;
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .8);
}
.beforeQuiz{
  width: 100%;
  height: 100%;
  position: fixed;
}
.participant{
  text-align: center;
  overflow:hidden;
  margin:10px;
  background-color:#455879;
}
.participant:hover{
  background-color: #ff2929;
}
.participants{
  background-color: #0097a7;
  width: 100%;
  height: 60%;
  display:grid;
  position: absolute;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(6,1fr);
  border: 2px solid;


}

.head{
  height: 15%;
  width: 100%;

}

.head > h1{
  font-size: 30px;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.goBack{
  font-size: 2vw;
  background-color:#455879;
  color:white;
  border-radius: 10px;
  left:15%;
  top:85%;
  width:11.25%;
  height: 10%;
  position: absolute;
  transform: translate(-15%, -85%);
}
.startQuiz{
  font-size: 2vw;
  background-color:#455879;
  color:white;
  border-radius: 10px;
  left:85%;
  top:85%;
  width:11.25%;
  height: 10%;
  position: absolute;
  transform: translate(-85%, -85%);
}

</style>
