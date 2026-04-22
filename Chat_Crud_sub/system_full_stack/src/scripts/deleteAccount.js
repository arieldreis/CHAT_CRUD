const btn = document.getElementById('btnDelete');
btn.addEventListener("click", async() => {
    const id = document.getElementById('idInput');
    const senha = document.getElementById('senhaId');

    if(!id || !senha){
        window.alert("Preencha os campos obrigatórios!");
    }

    const response = await fetch(`/deleteuser/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, senha })
    });

    const data = await response.json();
    console.log(data);
});