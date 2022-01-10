<!-- <html> -->
<!-- grid view till svaren med något maxtak
och att denna då alltid håller samma storlek så sidan blir nsygg -->
<template>

  <section class="wrapper">

    <div class="Question">
      <label for="Question">{{uiLabels.question}}</label><br>
      <input v-model="this.question" type="text" class="question" >
    </div>

    <label for="answer" class="label">
      {{uiLabels.answersInCreate}}</label>
      <div  class="answers">
    <div  v-for="i in answers.length"  v-bind:key="i" >
      <input class="answer" v-model="this.answers[i-1]">

        <img v-on:click="trueFalse(i-1)" v-bind:src="getUrl(i-1)"
        class="img">
    </div></div>

        <button v-on:click="removeAnswer" class="removeAnswer" v-if="this.answers.length>1">
          {{uiLabels.removeAnswer}}
        </button>
        <button v-on:click="addAnswer" class="addAnswer" v-if="this.answers.length<4">
          {{uiLabels.AddAnswerAlternative}}
        </button>

      <button class="delete" v-on:click="deleteQuestion" v-if="this.editing">
        {{uiLabels.delete}}</button>

        <button class="return" v-on:click="addQuestion">
          {{uiLabels.saveAndReturn}}
        </button>
       <button class="goBack" v-on:click="goBackToCreate">
         {{uiLabels.goBack}}</button>
         <button v-on:click="switchLanguage" class="changeLanguage">
           <img v-bind:src="getFlagUrl()"
                class="flag">{{uiLabels.changeLanguage}}</button>
  </section>
</template>

<script>


  export default {
    name: 'Create',
    props:{
      uiLabels: Object,
      lang: String,
      questionNumber: Number,
      data: Object
    },
    data: function() {
      return {
        pollId: "",
        question: "",
        answers: ["", ""],
        correctIndexes:[],
        languages: ["en", "sv"],
        editing: false

      }
    },
    created: function(){
      if(typeof this.data.questions[this.questionNumber]!=='undefined'){
      this.question=this.data.questions[this.questionNumber].q
      this.answers=this.data.questions[this.questionNumber].a
      this.correctIndexes=this.data.questions[this.questionNumber].i
      this.editing=true;
      }
    },

    methods: {
      deleteQuestion: function(){
        this.$emit("deleteQuestion", this.questionNumber)
      },
      getFlagUrl: function(){
        return this.$parent.getFlagUrl();
      },
      switchLanguage: function() {
           this.$parent.switchLanguage();
      },
      trueFalse: function(index){
       if(this.correctIndexes.includes(index)){
      const i = this.correctIndexes.indexOf(index)
      this.correctIndexes.splice(i, 1);
       }else{
         this.correctIndexes.push(index);
       }
      },
      getUrl: function(index){
        let path= "redcross.png"
         if(this.correctIndexes.includes(index)){
          path = "greentick.png"
         }

        return require('../../data/'+path)
      },
      //createPoll sker i create
      addQuestion: function() {//skickas kanske inte exakt det som behövs för tillfället

      if(this.question.length>0){
        let bool = true;
        for(let i in this.answers){
          if(this.answers[i].length<=0){
            bool = false;
          }
        }
        if(bool){
          if(this.correctIndexes.length>0){
          this.$emit("madeQuestion", {
            q: this.question,
            a: this.answers,
            qnr: this.questionNumber,
            i: this.correctIndexes
          })
        }else{
          alert(this.uiLabels.noCorrect)
        }
      }else{
          alert(this.uiLabels.aSmall)
        }

      }else{
        alert(this.uiLabels.qSmall)
      }


      },
      goBackToCreate: function(){
        this.$parent.goBackToCreate();
      },
      addAnswer: function() {
        this.answers.push("");
      },
      removeAnswer: function() {
        this.answers.pop();

      }
      // runQuestion har legat här men borde inte behövas på create sidan
      // lägg till en funktion för att komma tillbaka till Create.vue med sparade frågor
      // trippelchecka kommunikationen mellan de sidorna.
    }
  }
</script>

<style lang="css" scoped>
button:hover{
cursor:pointer;
}
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color:#0097a7;
    padding:0;
    margin:0;

}

.answers{
  display:grid;
  width:100%;
  height:50%;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  position: absolute;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2,1fr);

}
.answer{
  text-align: center;
  position: relative;
  width:auto;
  height: 50%;
  font-size: 2vw;
  color:white;
  overflow:hidden;
  margin: 5%;
  background-color:#455879;


}
  .changeLanguage {
    left: 87.5%;
    position: absolute;
    width: 12.5%;
    height: 5%;
    font-size: 1vw;
  }
.img{
  width:2vw;
  height:auto;
}
.checker{
  background-color:#0097a7;
}


  .Question {
    font-size: 3vw;
    background-color: #0097a7;
    color:white;
    position: absolute;
    border-radius: 10px;
    width:50%;
    height: 15%;
    left:50%;
    top:2.5%;
    transform: translate(-50%,-2.5%);
  }
.question{
  font-size: 2vw;
  background-color: #0097a7;
  color:white;
  text-align: center;
  border-radius: 10px;
  width:100%;
  height: 50%;

}
.label{
  font-size: 3vw;
  background-color: #0097a7;
  color:white;
  position: absolute;
  border-radius: 10px;
  width:50%;
  height: 15%;
  left:50%;
  top:25%;
  transform: translate(-50%,-25%);
}
.delete{
  font-size: 1vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:2.5%;
  top:2.5%;
  width:5.625%;
  height: 7.5%;
  transform: translate(-2.5%,-2.5%);
}

.removeAnswer{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:62.5%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-62.5%,-90%);
}

.addAnswer{
  font-size: 2vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:87.5%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-87.5%,-90%);
}

.goBack {
  font-size: 2vw;
  background-color: #455879;
  color:white;
  border-radius: 10px;
  position:absolute;
  left:12.5%;
  top:90%;
  width:11.25%;
  height: 15%;
  transform: translate(-12.5%,-90%);
}

  .return {
    font-size: 2vw;
    background-color: #455879;
    color:white;
    border-radius: 10px;
    position:absolute;
    left:37.5%;
    top:90%;
    width:11.25%;
    height: 15%;
    transform: translate(-37.5%,-90%);
  }
  .changeLanguage{
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
</style>
