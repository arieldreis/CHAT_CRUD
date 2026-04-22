const btn = document.getElementById('btnSubmit');
btn.addEventListener('click', async () => {
    const id = document.getElementById('idInput').value;
    const user = document.getElementById('idUser').value;
    const email = document.getElementById('emailId').value;
    const senha = document.getElementById('senhaId').value;

    if(!id || !user || !email || !senha){
        window.alert("Preencha os campos obrigatórios!");
    }

    const response = await fetch(`/updateuser/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, email, senha })
    });

    const data = await response.json();
    console.log(response.ok ? "Acesso Ok" : "Acesso negado");
    // if(response.ok){
    //     window.alert("Dados atualizados com sucesso!");
    //     window.location.href = '/DadosColetados';
    // } else {
    //     window.alert("Erro na atualização");
    // }
});