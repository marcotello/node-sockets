var socket = io();

socket.on('connect', function () {
  console.log('Connected to socket io');
});

socket.on('message', function (message) {
  document.getElementsByClassName("pagetitle")[0].innerHTML = message.text;
});
