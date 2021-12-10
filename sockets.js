function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang="en") {
    socket.emit('init', data.getUILabels(lang));
  });


  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) { // La till questionNumber (qnr)
    data.addQuestion(d.pollId, {qnr: d.qnr, q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    io.to(pollId).emit('nickNames',data.getLeaderBoard(pollId));
    });
  socket.on('hostPoll', function(pollId){
   socket.join(pollId)
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });
//kolla på denna vid nystart av quiz? reseta typ answers och så
  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;
