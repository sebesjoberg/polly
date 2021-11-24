<template>
  <section class="wrapper">
  <div class="wrap_Left">
    <router-link
    v-bind:to="'/poll/'"
    v-slot="{href, navigate}"
    >
      <button :href="href" @click="navigate" class="join">
        {{uiLabels.participatePoll}}
      </button></router-link>

    </div>
  <div class="wrap_Right">
    <router-link
    v-bind:to="'/create/'+lang"
    v-slot="{href, navigate}"
    >
      <button :href="href" @click="navigate" class="create">
        {{uiLabels.createPoll}}
      </button>
  </router-link>


  </div>

</section>



</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "123",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>
<style>
  @import 'https://fonts.googleapis.com/css?family=Pacifico|Dosis';

.wrapper{
  padding:0;
  margin:0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100vw;
  height: 100vh;
}

.wrap_Left{
background-color: #455879;
position: relative;
}

.wrap_Right{
  background-color: #0097a7;
  position: relative;
}

.join{
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  width:15%;
  height: 10%;
  transform: translate(-50%,-50%);
}

.create{
  background-color: #455879;
  color:white;
  position:absolute;
left:50%;
top:50%;
width:15%;
height: 10%;
transform: translate(-50%,-50%);

  border-radius: 10px;
}

</style>
