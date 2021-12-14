<template>
<div class="error" v-if="this.invalid">
{{uiLabels.invalid}}{{this.pollId}}
</div>

<section class="lobbyWrapper" v-else-if="this.lobby">
  <div class="nickName">
  <label for="nickName">{{uiLabels.nickName}}</label><br>
  <input v-model="nickname" type="text" class="nickName" >
</div>
<button class="setNick" v-on:click="setNickname">
  {{uiLabels.setNick}}
</button>
<button v-on:click="switchLanguage" class="changeLanguage">
  <img v-bind:src="getFlagUrl()"
  class="flag">{{uiLabels.changeLanguage}}</button>
</section>

<Question v-bind:question="question"
          v-on:answer="submitAnswer"
          v-else-if="this.onQuestion"/>

<LeaderBoard v-bind:leaderBoard="leaderBoard"
             v-bind:correctAnswer="correctAnswer"
             v-else-if="this.result"/>
<div class="waiting" v-else>
waiting for actions to be made
</div>



</template>

<script>

// @ is an alias to /src
import Question from '@/components/Question.vue';
import LeaderBoard from '@/components/Leaderboard.vue';
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'Poll',
  components: {
    Question,
    LeaderBoard
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      leaderBoard:{nicknames:[],
      scores:[]    },
      pollId: "inactive poll",
      lobby: true,
      onQuestion: false,
      correctAnswer: false,
      result: false,
      nickname:"",
      setNick: false,
      lang:'en',
      uiLabels:{},
      languages: ['en', 'sv'],
      invalid: false,




    }
  },
  created: function () {

    this.pollId = this.$route.params.id
    if(this.languages.includes(this.$route.params.lang)){
    this.lang = this.$route.params.lang;
  }
  while(this.lang!==this.languages[0]){
var b = this.languages.shift();
this.languages.push(b);
}

    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", function(q){
        if(this.setNick){
        this.question = q;
        this.lobby=false;
        this.onQuestion=true;
        this.result=false;}
      });
      //server skickar leaderBoard vill vi visa den? kan ha if runt result
      socket.on("LeaderBoard", function(LeaderBoard){
        this.leaderBoard=LeaderBoard;
        this.lobby=false;
        this.onQuestion=false;
        this.result=true;
      });//här får vi alla nickNames som är valda kan även användas till att kolla om pollen existerar
      socket.on("nickNames", (nicknames) =>{

              if(nicknames !== null){
                this.leaderBoard.nicknames = nicknames
              }else{
              this.invalid=true;

             }
      });

    //gör en metod med allt vi vill här?
    //kanske mer sockets som handlar typ leaderboard och liknandeö
  },
  methods: {

    setNickname: function(){
      //tar bort alla whitespaces från nickname
      this.nickname = this.nickname.replace(/\s/g, "")

      if(this.nickname.length>=3){

      if(!this.leaderBoard.nicknames.includes(this.nickname)){
        socket.emit("setNickname", {pollId: this.pollId, nickname: this.nickname});
        //gör lite mer här efter man satt nick
      }else{
      alert(this.uiLabels.occupied)
      }
      }else{
        alert(this.uiLabels.bigger);
      }
    },
    switchLanguage: function() {
      var b = this.languages.shift();
      this.languages.push(b);
      this.lang=this.languages[0];
      socket.emit("switchLanguage", this.languages[0])
    },
    getFlagUrl: function(){

      return require('../../data/flag-'+this.languages[1]+'.png')
    },
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer});
      //gör så man får ett waitwindow medans man väntar på svar stora sitt svar någontstans

    }
  }
}
</script>
<style>
.setNick{
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:70%;
  aspect-ratio:9/6;
  height: 15%;
  transform: translate(-50%,-70%);
}
.nickName{
  font-size: 3vh;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  aspect-ratio:9/6;
  height: 15%;
  transform: translate(-50%,-50%);
}
.lobbyWrapper{
  padding:0;
  margin:0;
  background-color: #455879;
  width: 100vw;
  height: 100vh;
}
.changeLanguage{
  left:87.5%;
  position:absolute;
  width: 12.5%;
  height: 5%;
  font-size: 1vw;
}
</style>
