const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (userName) => {
  drawNewChat(`${userName} connected!`);
});

socket.on('new_chat', (data) => {
  const { chat, userName } = data;
  drawNewChat(`${userName}: ${chat}`);
});

socket.on('disconnect_user', (userName) => {
  drawNewChat(`${userName} is disconnected...`);
});
//* /global socket handler

//* 채팅 입력 이벤트
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에 채팅 그리기
    drawNewChat(`me: ${inputValue}`);
    formElement.querySelector('input').value = null;
  }
};
//* /채팅 입력 이벤트

//* 새로운 유저 접속 이벤트
function helloUser() {
  const userName = prompt('What is your name?');
  socket.emit('new_user', userName, (data) => {
    drawHelloStranger(data);
  });
}
//* /새로운 유저 접속 이벤트

//* draw functions
const drawHelloStranger = (userName) => {
  helloStrangerElement.innerText = `Hello ${userName}!`;
};

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>
      ${message}
    </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};
//* /draw functions

function init() {
  helloUser();
  // 이벤트 연결
  formElement.addEventListener('submit', handleSubmit);
}

init();
