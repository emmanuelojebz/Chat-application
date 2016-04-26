var socket = io();
function onSubmit(){
    console.log('submitted');
    event.preventDefault()
    var from = $('#user').val();
    var message = $('#m').val();
    
    if(message !== ''){
        socket.emit('chatMessage',from, message);
        console.log("Message Emited")
    }

    $('#m').val('').focus();
    return false;
}

function notifyTyping(){
    console.log("notifying user oo")
    var user = $('#user').val();
    socket.emit('notifyUser',user);
}

socket.on('chatMessage',function(from,msg){
    console.log('chat message emited')
    var me = $('#user').val();
    var color = (from == me)? 'green':'#009afd';
    var from = (from == me)? 'Me':from;
    $('#messages').append('<li><b style ="color:'+color+'">'+ from + '</b>:' + msg + '</li>');
})
           
socket.on('notifyUser',function(user){
    var me = $('#user').val();
    console.log(me + "me from getname");
    if(user != me){
        $('#notifyUser').text(user + ' is typing.... ');
    }
    
    setTimeout(function(){
        $('#notifyUser').text('');},2000);
})

$(document).ready(function(){
    var name  = makeId();
    console.log(name + "This is the user ")
    $('#user').val(name);
    socket.emit('chatMessage','System','<b>'+name +'</b> has joined  the discussion');
})

function makeId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for(var i = 0; i<5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
