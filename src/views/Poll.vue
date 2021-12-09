<template>
<div class="lobby" v-if="this.lobby">
gothere
</div>
ta ett nickname och gör en quiztakers object osm har poängen/antalet rött svar

    <Question v-bind:question="question"
              v-on:answer="submitAnswer"
              />

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
      pollId: "inactive poll",
      lobby: true

    }
  },
  created: function () {
    this.pollId = this.$route.params.id //check if null return then
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      this.question={  q: "",a: []};

    }
  }
}
</script>
<style>


</style>
