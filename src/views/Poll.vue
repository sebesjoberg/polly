<template>


  <div v-if="this.inLobby">
    {{this.pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  <div v-else>
    notinlobby
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "55",
      inLobby: false
    }
  },

  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    }
  },
  joinPoll: function(){
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
  }
}
</script>
