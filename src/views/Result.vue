<template>
  <div class="wrapper">
    <div>
      {{question}}
    </div>
    <Bars v-bind:data="data"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      question: "",
      data: {
      }
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
}
</script>

<style>
.wrapper {
  display: grid;
  justify-content: center;
  padding: 0;
  margin: 0;
  background-color: #455879;
}
</style>
