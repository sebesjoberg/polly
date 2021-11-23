<template>
  <section class="wrapper">
  <div class="wrap_Left">
  <button class="join">join</button>
    </div>
  <div class="wrap_Right">
    <router-link
    v-bind:to="'/create/'+lang"
    v-slot="{href, navigate}"
    >
      <button :href="href" @click="navigate" class='whatever-you-want'>
        {{uiLabels.createPoll}}
      </button>
  </router-link>

  <button class="Host">Host</button>
  </div>

</section>

    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>


    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>

</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100vw;
  height: 100vh;
}

.wrap_Left{
  background-color: black;
}

.wrap_Right{
  background-color: Blue;
}
</style>
