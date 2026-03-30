# 💬 Real-Time Chat App

Um sistema de chat interativo e responsivo desenvolvido com **Node.js** e **WebSockets**, focado em comunicação em tempo real e persistência de dados.

---

## 🚀 Sobre o Projeto

O objetivo deste projeto é criar uma plataforma de mensagens instantâneas onde a comunicação acontece de forma bidirecional. O sistema inclui um fluxo completo de autenticação, permitindo que usuários se cadastrem e acessem a sala de chat com segurança.

### 🛠 Tecnologias Utilizadas

* **Back-end:** [Node.js](https://nodejs.org/)
* **Comunicação:** WebSockets (Socket.io)
* **Front-end:** HTML5, CSS3 e JavaScript Vanilla
* **Banco de Dados:** MySQL (para gestão de usuários e histórico)

---

## 📌 Funcionalidades Principais

* **Sistema de Cadastro:** Tela dedicada para criação de novas contas.
* **Sistema de Login:** Validação de usuário e senha para acesso ao chat.
* **Chat em Tempo Real:** Envio e recebimento de mensagens instantâneas sem recarregar a página.
* **Persistência:** Armazenamento de dados estruturado via MySQL.

---

## 📁 Estrutura do Repositório

* `server.js`: Arquivo principal que gerencia o servidor e os eventos do WebSocket.
* `public/`: Contém os arquivos de interface (HTML/CSS) e a lógica do lado do cliente (JS).
* `database/`: Scripts SQL para configuração das tabelas de login e mensagens.

---

## ⚙️ Como Instalar e Rodar

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Instale as dependências necessárias:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    * Certifique-se de que o **MySQL** está rodando.
    * Crie o banco de dados e as tabelas conforme os scripts fornecidos.

4.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

5.  **Acesse a aplicação:**
    Abra o navegador em `http://localhost:3000`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
*Desenvolvido por [Ariel Marinho e Pedro Conceição]*
