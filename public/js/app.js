var socket = io();

socket.on('connect', function () {
  console.log('Connected to socket io');
});

socket.on('message', function (message) {
  document.getElementsByClassName("message-board")[0].innerHTML = message.text;
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
