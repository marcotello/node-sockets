var PORT = process.env.PORT || 3000;

var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

// Sends current users to provided socket
function sendCurrentUsers(socket) {
  var info = clientInfo[socket.id];
  users = [];

  if (typeof info === 'undefined'){
    return;
  }

  Object.keys(clientInfo).forEach(function (socketId) {
    var userInfo = clientInfo[socketId];

    if(info.room === userInfo.room){
      users.push(userInfo.name);
    }
  });

  socket.emit('message', {
    name: 'System',
    text: 'Current users: ' + users.join(', '),
    timestamp: moment().valueOf()
  })
}

io.on('connection', function (socket){
  console.log('User connected via socket.io');

  socket.on('disconnect', function () {
    var userData = clientInfo[socket.id];
    if(typeof userData !== 'undefined'){
      socket.leave(userData.room);
      socket.to(userData.room).emit('message', {
        name: 'System',
        text: userData.name + ' has left!',
        timestamp: moment().valueOf()
      });
      delete clientInfo[socket.id];
    }
  });

  socket.on('joinRoom', function (req) {
    clientInfo[socket.id] = req;
    var room = req.room;
    socket.join(room);
    socket.broadcast.to(room).emit('message', {
      name: 'System',
      text: req.name + ' has joined!',
      timestamp: moment().valueOf()
    });
  });

  socket.on('message', function (message) {
    console.log('The incoming message is: ' + message.text);

    if (message.text === '@currentUsers'){
      sendCurrentUsers(socket);
    } else {
      message.timestamp = moment().valueOf();
      io.to(clientInfo[socket.id].room).emit('message', message);
    }
  });

  socket.emit('message', {
    name: 'System',
    text: 'Chat application initialized!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function () {
  console.log('Server started at ' + PORT);
});
