// scripts/password.js

document.getElementById("btn-login").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  // Futuramente: trocar por fetch() para sua API
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Credenciais inválidas");
      return res.json();
    })
    .then((data) => {
      // Salva o token/usuário na sessão
      sessionStorage.setItem("loggedUser", username);
      sessionStorage.setItem("token", data.token); // se sua API retornar JWT
      window.location.href = "chat.html";
    })
    .catch(() => {
      errorMsg.style.display = "block";
    });
});