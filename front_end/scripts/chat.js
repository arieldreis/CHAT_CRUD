//
const form = document.querySelector('.chat-input-area');
const input = document.querySelector('.chat-input-area input');
const chat_window = document.querySelector('.chat-window');

// Cores para cada usuário que entrar no chat.
const r = Math.floor(Math.random() * 256);
const g = Math.floor(Math.random() * 256);
const b = Math.floor(Math.random() * 256);


const ws = new WebSocket("ws://localhost:3030");
ws.onopen = () => {
    console.log("Servidor conectado na web.")
}

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Criando as tags dinamicamente com js.
    const div = document.createElement('div');
    const paragrafo = document.createElement('p');
    const span = document.createElement('span');
    
    // Formatando o horário
    const hour = String(data.hour).padStart(2, "0");
    const minute = String(data.minute).padStart(2, "0");

    paragrafo.innerHTML = data.text;
    span.innerHTML = `${hour}:${minute}`;
    div.style.backgroundColor = `rgb(${data.color.r}, ${data.color.g}, ${data.color.b})`;

    // Adicionando uma classe as tags usando js.
    div.classList.add('message');
    span.classList.add('time');

    // Adicionan a tag p e span dentro da div.
    chat_window.appendChild(div);
    div.appendChild(paragrafo);
    div.appendChild(span);
};

ws.onerror = (error) => {
    console.error("Erro no WebSockets: ", error);
};
ws.onclose = () => {
    console.log("Servidor desconecatado.")
};

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (input.value.trim() === "") {
        alert("Ei! Digite uma mensagem antes de enviar.");
        return;
    }
    // Pegando o horário atual e formatando ele.
    const time = new Date();
    const msg = {
        text: input.value,
        hour: time.getHours(),
        minute: time.getMinutes(),
        color: {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        }
    };

    ws.send(JSON.stringify(msg));

    input.value = ""; 
    input.focus();
});