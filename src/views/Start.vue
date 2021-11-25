<template>
  <section class="wrapper" v-on:mousemove="LoadFix">
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
     <button v-on:click="switchLanguage" class="changeLanguage">
     <img v-bind:src='this.flag_Url'
   class="flag">{{uiLabels.changeLanguage}}</button>

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
      lang: "en",
      flag_Url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
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
    },
    LoadFix : function(){
      //återanvänder koden för language för att kunna gå fram och tillbaka
      //mellan sidor utan att förlora labels
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
  font-size: 3vh;
  background-color: #0097a7;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:50%;
  top:50%;
  aspect-ratio:9/6;
  height: 15%;
  transform: translate(-50%,-50%);
}

.create{
  font-size: 3vh;
  background-color: #455879;
  color:white;
  position:absolute;
left:50%;
top:50%;
aspect-ratio:9/6;
height: 15%;
transform: translate(-50%,-50%);

  border-radius: 10px;
}
.changeLanguage{
  left:75%;
  position:absolute;
  width: 25%;
  height: 5%;
  font-size: 1vw;
 }

 .flag{
   width:3vw;
   height:auto;


 }


</style>
