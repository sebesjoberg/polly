'use strict';



// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.hostedpolls = [];
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    poll.questions = [];
    poll.joinable=false; //använd joinable till att se om man kan joina kanske ej är det
    //då den körs?
    poll.hostable=true;
    poll.answers = [];
    poll.correctAnswers=[]; //en array med correctAnswers som man jämför med/skickar ut en bit av
    poll.currentQuestion = -1;
    poll.leaderBoard={nicknames: [], scores:[]};
    this.polls[pollId] = poll;
    console.log("poll created", pollId);
  }else{
    console.log("poll loaded", pollId);
  }
  return this.polls[pollId];

}

Data.prototype.addQuestion = function(pollId, d) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, d);
  if (typeof poll !== 'undefined') {
    poll.questions.splice(d.qnr,1,{q: d.q, a:d.a, i: d.i})
  }
  console.log(poll.questions)
}

Data.prototype.nextQuestion = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.currentQuestion +=1;
    return poll.questions[poll.currentQuestion];

  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}

Data.prototype.getLeaderBoard = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
  return this.polls[pollId].leaderBoard;}
  else{
    return {}
  }
}

Data.prototype.getnickNames = function(pollId){
  const poll = this.polls[pollId];

  if(typeof poll !== 'undefined'){
  return poll.leaderBoard.nicknames;}
  else{
    return null
  }
}

Data.prototype.setNickname = function(d){
  const poll = this.polls[d.pollId];
  if(typeof poll !== 'undefined'){
    poll.leaderBoard.nicknames.push(d.nickname);

  }
}

Data.prototype.joinable = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll!=='undefined'){
  return poll.joinable;
}else{
  return false;
}
}

Data.prototype.hostable = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll!=='undefined'){
  return poll.hostable;
}else{
  return false;
}
}

Data.prototype.hosted = function(pollId){
  const poll = this.polls[pollId];
  poll.hostable=false;
  poll.joinable=true;
}

Data.prototype.removeNick = function(d){
  const poll = this.polls[d.pollId];
  if(typeof poll!=='undefined'){

  const index = poll.leaderBoard.nicknames.indexOf(d.nickname)

  if (index > -1) {
  poll.leaderBoard.nicknames.splice(index, 1);
}}}

Data.prototype.resetPoll = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll!=='undefined'){
  poll.leaderBoard={nicknames: [], scores:[]};
  poll.joinable=false;
  poll.hostable=true;
  poll.answers = [];
  poll.currentQuestion=0;
}

}

Data.prototype.getQuestions = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const qs = poll.questions;
    if (typeof qs !== 'undefined') {
      return {questions: qs, correctAnswers: poll.correctAnswers}
    }
  }
  return {}
}


module.exports = Data;
