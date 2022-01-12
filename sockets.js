function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang="en") {
    socket.emit('init', data.getUILabels(lang));
  });


  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.join(d.pollId)
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) { // La till questionNumber (qnr)
    data.addQuestion(d.pollId, {qnr: d.qnr, q: d.q, a: d.a, i: d.i});
    io.to(d.pollId).emit('dataUpdate', data.getQuestions(d.pollId));
  });

  socket.on('deleteQuestion', function(d){
    data.deleteQuestion(d.pollId,d.qnr);
    io.to(d.pollId).emit('dataUpdate', data.getQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {


      socket.join(pollId);
    io.to(pollId).emit('nickNames',data.getnickNames(pollId));

});


  socket.on('hostPoll', function(pollId){

     let Id=data.host(pollId)
   socket.join(Id)
   io.to(Id).emit('hosted',Id);
   io.to(Id).emit('nickNames',data.getnickNames(Id));

  });

  socket.on('closePoll',function(pollId){

    const nicknames=data.getnickNames(pollId);


    for(let i in nicknames){
     let nick=nicknames[i];
    io.to(pollId).emit("kick",nick);
  }
  })

  socket.on('nextQuestion', function(pollId) {
    io.to(pollId).emit('newQuestion', data.nextQuestion(pollId));
    io.to(pollId).emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.index, d.nickname);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('setNickname',function(d){
  data.setNickname(d);

  io.to(d.pollId).emit('nickNames',data.getnickNames(d.pollId));
  });

  socket.on("kick", function(d){
    data.removeNick(d)
    io.to(d.pollId).emit("kick",d.nickname);
    io.to(d.pollId).emit('nickNames',data.getnickNames(d.pollId));
  });

  socket.on("endQuestion", function(pollId){
    console.log(data.getLeaderBoard(pollId))
    io.to(pollId).emit("leaderboard",data.getLeaderBoard(pollId));
  })
//kolla på denna vid nystart av quiz? reseta typ answers och så
  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;
