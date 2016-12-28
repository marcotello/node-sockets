var name = getQueryVariable('name');
var room = getQueryVariable('room');

var socket = io();

socket.on('connect', function () {
  console.log('Connected to socket io');
  jQuery('.welcome').append('<h3>' + name + ' joined to the room ' + room + '</h3>');
});

socket.on('message', function (message) {
  var momentTimestamp = moment.utc(message.timestamp);

  //document.getElementsByClassName("message-board")[0].innerHTML = message.text;
  jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('D-MMM-YYYY, h:mm:ss A') + '</strong> - ' + message.text + '</p>');
});

// Handles submiting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
  var $messageInput = $form.find('input[name=message]');

  event.preventDefault();

  socket.emit('message', {
    text: $messageInput.val()
  });

  $messageInput.val('');

});
