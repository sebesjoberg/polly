<template>
<div class="lobby" v-if="this.lobby">
lobby here
</div>

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
      leaderBoard:{
        nicknames:[],
        scores:[]
      },
      pollId: "inactive poll",
      lobby: true,
      onQuestion: false,
      correctAnswer: false,
      result: false,



    }
  },
  created: function () {
    this.pollId = this.$route.params.id //check if null return then
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", function(q){
        this.question = q;
        this.lobby=false;
        this.onQuestion=true;
        this.result=false;
      });
      //server skickar leaderBoard vill vi visa den? kan ha if runt result
      socket.on("LeaderBoard", function(LeaderBoard){
        this.leaderBoard=LeaderBoard;
        this.lobby=false;
        this.onQuestion=false;
        this.result=true;
      })

    //gör en metod med allt vi vill här?
    //kanske mer sockets som handlar typ leaderboard och liknandeö
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      //gör så man får ett waitwindow medans man väntar på svar stora sitt svar någontstans

    }
  }
}
</script>
<style>


</style>
