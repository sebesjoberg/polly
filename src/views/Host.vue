<template>
  <section class="bigWrapper">

<section class="beforeQuiz"> <!--allt innan quizen börjar -->
  <header class="head">
    <h1>Game ID: </h1>
  </header>

  <div class="participants">
    <button class="participant" v-for="i in this.leaderBoard.nicknames.length"
    v-on:click="kickfunchere(i)"
  v-bind:key=i> {{this.leaderBoard.nicknames[i-1]}}

    </button>
  </div>
  <div>
    <router-link
    v-bind:to="'/'"
    v-slot="{href, navigate}"
    >
    <button :href="href" @click="navigate" class="goBack">
      {{uiLabels.goBack}}
    </button></router-link>
  </div>
</section>




<section class="betweenQuestion"> <!--allt mellan frågor -->
</section>

<section class="onQuestion"> <!--allt som händer under en fråga -->
  <button class="endQuestion">
  </button>
  <!--här ska frågan visas anväänd componenten -->
</section>

<section class="afterQuiz"><!--allt som händer när quizen är färdig -->
</section>

<section class="invalid"><!--allt som händer när quizen inte finns -->
</section>

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
  data: function(){
    return{
      leaderBoard:{nicknames:[],
      scores:[]    },
      pollId: "inactive poll",
    }
  },
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang || "en");

    socket.emit('hostPoll', this.pollId)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("nickNames", (nicknames) =>{

            if(nicknames !== null){
              this.leaderBoard.nicknames = nicknames

            }else{
            this.invalid=true;
          }})
        }

}

</script>



<style>
.bigWrapper{
  background-color: #0097a7;
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
  height: 60vh;
  display:grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(6,1fr);
  border: 2px solid;
  margin-top: 5px;
}

.head{
  height: 125px;
  border-bottom: 2px solid;
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
}

</style>
