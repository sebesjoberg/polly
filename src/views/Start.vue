<template>

  <!--Denna section innehåller join -->
  <section class="second_wrapper" v-if="this.clickedjoin" v-on:mousemove="Loadfix">
    <div class="input_1">

      <label for="input_1">{{uiLabels.inputId}}</label><br>
      <input v-model="id" type="text" class="input_1" >
    </div>
    <router-link
    v-bind:to="'/poll/'+this.id"
    v-slot="{href, navigate}"
    >
    <button :href="href" @click="navigate" class="join_2">
      {{uiLabels.participatePoll}}
    </button></router-link>

    <button v-on:click="switchLanguage" class="changeLanguage_2">
      <img v-bind:src="getFlagUrl()"
      class="flag">{{uiLabels.changeLanguage}}</button>
      <button class="goBack_1" v-on:click="join">
        {{uiLabels.goBack}}
      </button>
    </section>

    <!--Denna section innehåller Host -->
    <section class="third_wrapper" v-else-if="this.clickedhost" v-on:mousemove="Loadfix">
      <div class="input_2">
        <label for="input_2">{{uiLabels.inputId}}</label><br>
        <input v-model="id" type="text" class="input_2" >
      </div>
      <router-link
      v-bind:to="'/host/'+this.id"
      v-slot="{href, navigate}"
      >
      <button :href="href" @click="navigate" class="host_2">
        {{uiLabels.HostPoll}}
      </button></router-link>
      <button v-on:click="switchLanguage" class="changeLanguage_2">
        <img v-bind:src="getFlagUrl()"
        class="flag">{{uiLabels.changeLanguage}}</button>
        <button class="goBack_2" v-on:click="host">
          {{uiLabels.goBack}}
        </button>
      </section>

      <!--Denna section är starten på hemsidan -->
      <section class="wrapper" v-on:mousemove="LoadFix" v-else>
        <div class="wrap_Left">

          <button class="join_1" v-on:click="join">
            {{uiLabels.participatePoll}}
          </button>

        </div>
        <div class="wrap_Right">
          <button v-on:click="switchLanguage" class="changeLanguage_1">
            <img v-bind:src="getFlagUrl()"
            class="flag">{{uiLabels.changeLanguage}}</button>
            <router-link
            v-bind:to="'/create/'+lang"
            v-slot="{href, navigate}"
            >
            <button :href="href" @click="navigate" class="create">
              {{uiLabels.createPoll}}
            </button>
          </router-link>
          <button class="host_1" v-on:click="host">
            {{uiLabels.HostPoll}}
          </button>
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
          id: "",
          languages: ['en', 'sv'],
          lang: 'en',
          clickedjoin: false,
          clickedhost: false

        }
      },
      created: function () {
        socket.on("init", (labels) => {
          this.uiLabels = labels
        })
      },
      methods: {
        getFlagUrl: function(){

          return require('../../data/flag-'+this.languages[1]+'.png')
        },
        switchLanguage: function() {
          var b = this.languages.shift();
          this.languages.push(b);
          this.lang=this.languages[0];
          socket.emit("switchLanguage", this.languages[0])
        },
        LoadFix : function(){
          //återanvänder koden för language för att kunna gå fram och tillbaka
          //mellan sidor utan att förlora labels
          socket.emit("switchLanguage", this.languages[0])
        },
        join: function(){
          this.clickedjoin=!this.clickedjoin;
        },
        host: function(){
          this.clickedhost=!this.clickedhost;

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
      width: 99vw;
      height: 97vh;
    }

    .wrap_Left{
      padding:0;
      margin:0;
      background-color: #455879;
      position: relative;

    }

    .wrap_Right{
      padding:0;
      margin:0;
      background-color: #0097a7;
      position: relative;

    }

    .join_1{
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
    .join_2{
      font-size: 3vh;
      background-color: #0097a7;
      color:white;
      border-radius: 10px;
      position:absolute;
      left:60%;
      top:70%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-60%,-70%);
    }

    .host_1{
      font-size: 3vh;
      background-color: #455879;
      color:white;
      position:absolute;
      left:50%;
      top:65%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-50%,-65%);
      border-radius: 10px;
    }
    .host_2{
      font-size: 3vh;
      background-color: #455879;
      color:white;
      position:absolute;
      left:60%;
      top:70%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-60%,-70%);
      border-radius: 10px;
    }
    .goBack_1{
      font-size: 3vh;
      background-color: #0097a7;
      color:white;
      position:absolute;
      left:40%;
      top:70%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-40%,-70%);
      border-radius: 10px;
    }
    .goBack_2{
      font-size: 3vh;
      background-color: #455879;
      color:white;
      position:absolute;
      left:40%;
      top:70%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-40%,-70%);
      border-radius: 10px;
    }
    .create{
      font-size: 3vh;
      background-color: #455879;
      color:white;
      position:absolute;
      left:50%;
      top:35%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-50%,-35%);
      border-radius: 10px;
    }
    .input_1{
      font-size: 3vh;
      background-color: #455879;
      color:white;
      border-radius: 10px;
      position:absolute;
      left:50%;
      top:50%;
      aspect-ratio:9/6;
      height: 15%;
      transform: translate(-50%,-50%);
    }
    .input_2{
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
    .changeLanguage_1{
      left:75%;
      position:absolute;
      width: 25%;
      height: 5%;
      font-size: 1vw;
    }
    .changeLanguage_2{
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
    .second_wrapper{
      padding:0;
      margin:0;
      background-color: #455879;
      width: 100vw;
      height: 100vh;
    }
    .third_wrapper{
      padding:0;
      margin:0;
      background-color: #0097a7;
      width: 100vw;
      height: 100vh;
    }


    </style>
