<template>

<section class="errorwrapper" v-if="this.invalid">
<div class="error">{{uiLabels.invalid}}{{this.pollId}}</div>
<router-link
v-bind:to="'/'"
v-slot="{href, navigate}"
>
<button :href="href" @click="navigate" class="goBack_1">
  {{uiLabels.goBack}}
</button></router-link>
</section>

<section class="lobbyWrapper" v-else-if="this.lobby">
  <div class="nickName">
  <label for="nickName">{{uiLabels.nickName}}</label><br>
  <input v-model="nickname" type="text" class="nickName" >
</div>
<button class="setNick" v-on:click="setNickname">
  {{uiLabels.setNick}}
</button>
<router-link
v-bind:to="'/'"
v-slot="{href, navigate}"
>
<button :href="href" @click="navigate" class="goBack_2">
  {{uiLabels.goBack}}
</button></router-link>
<button v-on:click="switchLanguage" class="changeLanguage">
  <img v-bind:src="getFlagUrl()"
  class="flag">{{uiLabels.changeLanguage}}</button>
</section>

<Question v-bind:question="question"
          v-on:answer="submitAnswer"
          v-else-if="this.onQuestion"/>

<LeaderBoard v-bind:leaderBoard='this.leaderBoard'
             v-bind:correctAnswer='this.correctAnswer'
             v-bind:uiLabels='this.uiLabels'
             v-bind:nickname='this.nickname'
             v-else-if="this.result"/>



<section class="waitwrapper" v-else>
<div class="wait">{{uiLabels.wait}}</div>
<div class="loader"></div>
</section>



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
      lobby: false,
      onQuestion: false,
      correctAnswer: false,
      result: false,
      nickname:"",
      setNick: false,
      lang:'en',
      uiLabels:{},
      languages: ['en', 'sv'],
      invalid: true,
      lastanswer:-1




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
    socket.on("newQuestion", (q) => {
        if(this.setNick){ //kan endast joina om man satt sitt nick
        this.question = q;
        this.lobby=false;
        this.onQuestion=true;
        this.result=false;}
        else{ //annars blir man utskickad
          this.invalid=true; //stäng socket behöver inte lyssna nu
          socket.close()
        }
      });
      //server skickar leaderBoard vill vi visa den? kan ha if runt result
      socket.on("leaderboard", (d) => {
        this.leaderBoard=d.l;
        if(d.correctIndexes.includes(this.lastanswer)){
          this.correctAnswer=true;
        }else{
          this.correctAnswer=false;
        }
        this.lastanswer=-1;
        this.onQuestion=false;
        this.result=true;
      });//här får vi alla nickNames som är valda kan även användas till att kolla om pollen existerar
      socket.on("nickNames", (nicknames) =>{
              if(this.invalid){
                this.invalid=false;
                this.onQuestion=false;
                this.lobby=true;
                this.result=false;
              }
              if(nicknames !== null){
                this.leaderBoard.nicknames = nicknames
              }else{
              this.invalid=true//vi stänger socket här eftersom vi inte behöver lyssna längre
              socket.close()

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
        this.setNick = true;
        this.lobby = false;
        this.onQuestion = false;
        this.result = false;
        socket.on("kick",(nickname)=>{

          if(nickname==this.nickname){
            alert(this.uiLabels.kicked)
            setTimeout(function(){
            window.location.href = '/';
         }, 2000);
          }})
        //gör lite mer här efter man satt nick ex gå till question
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
    submitAnswer: function (index) {

      socket.emit("submitAnswer", {pollId: this.pollId, index: index,
        nickname: this.nickname});
      this.lastanswer=index;
      this.onQuestion = false;
      //gör så man får ett waitwindow medans man väntar på svar stora sitt svar någontstans

    }
  }
}
</script>
<style lang="css" scoped>
button {
  transition: all 0.2s ease-in-out;
}
button:hover{
  cursor:pointer;
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .8);
}
.lobbyWrapper{
  background-color: #455879;
  position: fixed;
  width: 100%;
  height: 100%;
}
.waitwrapper{
  background-color: #455879;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;


}
.errorwrapper{
  background-color: #455879;
  position: fixed;
  width: 100%;
  height: 100%;
}
.setNick{
  font-size: 2vw;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:60%;
  top:70%;
  width: 11.25%;
  height: 15%;
  transform: translate(-60%,-70%);
}
.nickName{
  font-size: 3vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  width:50%;
  height: 30%;
  transform: translate(-50%,-50%);
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

.goBack_1{
  font-size: 2vw;
  background-color:#0097a7;
  color:white;
  border-radius: 10px;
  left:15%;
  top:85%;
  width:11.25%;
  height: 10%;
  position: absolute;
}
.goBack_2{
  font-size: 2vw;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:40%;
  top:70%;
  width: 11.25%;
  height: 15%;
  transform: translate(-40%,-70%);
}
.goBack_3{
  font-size: 2vw;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position: absolute;
  left:30%;
  top:50%;

  width: 11.25%;
  height: 15%;
  transform: translate(-30%,-50%);
}
.newNick{
  font-size: 2vw;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position: absolute;
  left:70%;
  top:50%;

  width: 11.25%;
  height: 15%;
  transform: translate(-70%,-50%);
}
.error{
  font-size: 2vw;
  background-color:#455879;
  color:white;
  left:50%;
  top:50%;
  width:11.25%;
  height: 10%;
  position: absolute;
  transform: translate(-50%,-50%);
}
.wait{
  font-size: 2vw;
  color:white;
  margin: auto;

}
.loader {

  width: 10%;
  aspect-ratio: 1;
  border: 10px solid #f3f3f3;
  border-top-color: transparent;
  border-radius: 50%;
  margin: auto;


  animation: spin 2s linear infinite;
}

@keyframes spin {
  to { transform: rotate(1turn); }
}
</style>
