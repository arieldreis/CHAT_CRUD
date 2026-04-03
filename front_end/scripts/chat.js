const form = document.querySelector('.chat-input-area');
const input = document.querySelector('.chat-input-area input');
const chatWindow = document.querySelector('.chat-window');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value.trim() === "") {
        alert("Ei! Digite uma mensagem antes de enviar.");
        return;
    }
    input.value = ""; 
    input.focus();
});