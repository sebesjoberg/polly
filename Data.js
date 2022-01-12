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

    poll.answers = [];
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

Data.prototype.deleteQuestion = function(pollId, index) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions.splice(index, 1)
  }
  console.log("deleting",poll.questions)
}

Data.prototype.nextQuestion = function(pollId) {
  const poll = this.hostedpolls[pollId];
  if (typeof poll !== 'undefined') {
    poll.currentQuestion +=1;
    return poll.questions[poll.currentQuestion];

  }
  return []
}

Data.prototype.submitAnswer = function(pollId, index, nickname) {
  const poll = this.hostedpolls[pollId];

  console.log(typeof poll.questions[poll.currentQuestion].a)
  const answer = poll.questions[poll.currentQuestion].a[index];
  const indexn = poll.leaderBoard.nicknames.indexOf(nickname);
  if(poll.questions[poll.currentQuestion].i.includes(index)){
  poll.leaderBoard.scores[indexn] +=1000
}
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
   console.log("answer submitted for ", answers, typeof answers)
   console.log("leaderboard looks like",poll.leaderBoard)
 }}


Data.prototype.getAnswers = function(pollId) {
  const poll = this.hostedpolls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}

Data.prototype.getLeaderBoard = function(pollId){
  const poll = this.hostedpolls[pollId];
  if(typeof poll !== 'undefined'){
  return this.polls[pollId].leaderBoard;}
  else{
    return {}
  }
}

Data.prototype.getnickNames = function(pollId){
  const poll = this.hostedpolls[pollId];

  if(typeof poll !== 'undefined'){
  return poll.leaderBoard.nicknames;}
  else{
    return null
  }
}

Data.prototype.setNickname = function(d){
  const poll = this.hostedpolls[d.pollId];
  if(typeof poll !== 'undefined'){
    poll.leaderBoard.nicknames.push(d.nickname);
    poll.leaderBoard.scores.push(0);

  }
}

Data.prototype.joinable = function(pollId){
  const poll = this.hostedpolls[pollId];
  if(typeof poll!=='undefined'){
  return poll.joinable;
}else{
  return false;
}
}



Data.prototype.host = function(pollId){
  const poll = this.polls[pollId];
  this.hostedpolls.push(poll)
  let num = this.hostedpolls.length-1
  return num.toString();
}

Data.prototype.removeNick = function(d){
  const poll = this.hostedpolls[d.pollId];
  if(typeof poll!=='undefined'){

  const index = poll.leaderBoard.nicknames.indexOf(d.nickname)

  if (index > -1) {
  poll.leaderBoard.nicknames.splice(index, 1);
  poll.leaderBoard.scores.splice(index,1)
}}}



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
