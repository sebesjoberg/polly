'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
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
    //använd sedan onquestion för att handla diverse mellanfönster och så
    poll.onQuestion=false;
    poll.answers = []; //en array med correctAnswers som man jämför med/skickar ut en bit av
    poll.correctAnswers=[]
    poll.currentQuestion = 0;
    poll.leaderBoard={nicknames: [], scores:[]};
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
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
module.exports = Data;
