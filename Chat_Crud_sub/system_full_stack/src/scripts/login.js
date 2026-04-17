// nomeando as variavéis dos inputs
const emailInput = document.getElementById('nome_userId');
const senhaInput = document.getElementById('senhaId');


const accountuserAPI = (url) => {
    fetch(url).
    then(data => data.json()).
    then(data => {
        console.log(data);
        const listaUsers = Array.isArray(data) ? data : Object.values(data);
        listaUsers.forEach(user => {
            console.log(`Nome: ${user.nome_user}, Email: ${user.email}, senha: ${user.senha}`)
        });
    }).catch(err => {
        console.log("Erro ao buscar os dados do servidor: " + err);
    })
}


const url = "http://localhost:3000/accountuser";
accountuserAPI(url);