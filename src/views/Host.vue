<template>
<section class="beforeQuiz"><!--allt innan quizen börjar -->

</section>

<section class="betweenQuestion"><!--allt mellan frågor -->

</section>

  <section class="onQuestion"> <!--allt som händer under en fråga -->
  <button class="nextQuestion">
  </button>
</section>

<section class="afterQuiz"><!--allt som händer när quizen är färdig -->
</section>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
//i denna kan man lägga lite vad man vill på stängning och reloading så körs det
//skulle ex kunna låta servern veta att man inte längre är host och att någon annan då kan ta den?

window.onbeforeunload = function(){
    return null;
}
export default {
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit('hostPoll', this.pollId)}

}
</script>

<style>
</style>
