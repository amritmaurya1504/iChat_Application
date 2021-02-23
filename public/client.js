
const socket = io();

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

// User Name Input
do {
    name = prompt('Please enter your name: ')
} while (!name)

//Getting message of TextAres
textarea.addEventListener("keyup", (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value);
    }
})

// Send message to server
const sendMessage = (message) => {
    let msg = {
        user: name,
        message: message.trim()
    }

    //Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    //Send to Server
    socket.emit('chatmessage', msg);
}

// Append In HTML
const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}


//Reciev Messages

socket.on('chatmessage', (msg) => {
    appendMessage(msg , 'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}