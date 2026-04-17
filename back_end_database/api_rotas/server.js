import express from 'express';
import { db_connect as db } from './db.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pgDadosColetados = (`
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sucesso | Chat-Crud</title>
    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* Fundo vibrante combinando com a sua imagem */
        background: url(../img/fundo.jpg)
            no-repeat center center fixed;
        background-size: cover;
        }

        .glass-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 50px 40px;
        width: 400px;
        text-align: center;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        color: white;
        animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }

        .success-icon {
        font-size: 60px;
        margin-bottom: 20px;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        width: 100px;
        height: 100px;
        line-height: 100px;
        border-radius: 50%;
        border: 2px solid white;
        }

        h2 {
        font-size: 24px;
        margin-bottom: 15px;
        font-weight: 600;
        }

        p {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 30px;
        line-height: 1.5;
        }

        .btn-finish {
        display: inline-block;
        width: 100%;
        padding: 15px;
        border: none;
        border-radius: 30px;
        background-color: white;
        color: #333;
        font-weight: bold;
        font-size: 16px;
        text-decoration: none;
        transition: 0.3s ease;
        }

        .btn-finish:hover {
        background-color: #f0f0f0;
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>

    <div class="glass-card">
        <div class="success-icon">✓</div>
        <h2>Tudo pronto!</h2>
        <p>Sua operação foi realizada com sucesso. Seus dados já foram atualizados em nosso sistema.</p>
        <a href="login.html" class="btn-finish">Ir para o Início</a>
    </div>

</body>
</html>
    `);

// Criar um novo elemento
app.post('/createAccountUser', async(req, res) => {

    const nome_user = req.body.nome_user;
    const email = req.body.email;
    const senha = req.body.senha;

    if (!nome_user || !email || !senha) {
        return res.status(400).send({
            mensagem: "Dados inválidos fornecidos."
        });
    }
    try{
        // comando para inserir os dados
        const [result] = await db.query(
            'INSERT INTO account_client(nome_user, email, senha) VALUES(?, ?, ?)',
            [nome_user, email, senha]
        );

        // return res.status(201).json({ 
        //     mensagem: "Conta criada com sucesso!"
        // });
        return res.redirect("/sucesso");
    } catch(error) {
        console.log("Erro: " + error);
        res.status(500).json({
            error: "Erro ao criar o recurso."
        });
    }
});
// Atualizar um elemento
app.put('/updateuser/:id', async(req, res) => {
    const id  = req.params.id;
    if(!id){
        return res.status(404).send({
            mensagem: "Usuário não encontrado."
        });
    } 
    try{
        const nome_user = req.body.nome_user;
        const email = req.body.email;
        const senha = req.body.senha; 
        const [updataData] = await db.query(
            "UPDATE account_client SET nome_user = ?, email = ?, senha = ? WHERE id = ?",
            [nome_user, email, senha, Number(id)]
        );

        return res.status(200).send({
            mensagem: "Alteração feita com sucesso."
        });

    } catch(error) {
        console.log("Erro: " + error)
        res.status(500).send({
            error: "Erro ao fazer a alteração do recurso."
        });
    }
});

// Deleta um elemento
app.delete('/deleteuser/:id', async(req, res) => {
    const id  = req.params.id;
    if(!id){
        res.status(404).send({
            mensagem: "Usuário não encontrado."
        });
    }
    try{
        const [updataData] = await db.query(
            "DELETE FROM account_client where id = ?",
            [Number(id)]
        );

        // Bloco de condição do usuario
        if(updataData.affectedRows > 0){
            return res.status(200).send({
                mensagem: "Usuário excluido com sucesso."
            });
        } else {
            return res.status(404).send({
                mensagem: "Usuário não encontrado."
            });
        }

    } catch (error) {
        console.log("Erro: " + error);
        res.status(500).send({
            error: "Erro ao deletar o recurso do banco de dados."
        });
    };
});

// Pegar os recursos do servidor
app.get("/accountuser", async (req, res) => {
    try{
        const [datas] = await db.query(
        'SELECT * FROM account_client'
        );
        return res.status(200).json({datas}); // Transforma em uma api formato json().
    } catch(error) {
        console.log("Erro no banco de dados: " + error)
        res.status(500).json({
            error: "Erro ao buscar dados do banco."
        });
    };
});

// Direcionamento para a página de dados salvos.
app.get('/sucesso', (req, res) => {
    res.send(pgDadosColetados);
});

app.use((req, res) => {
    console.log(`Mensagens: ${new Date().toISOString}, ${req.url}, ${req.method}`);
    res.status(404).send({
        status: 404,
        error: "Rota não encontrada", 
        url: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta: http://localhost:${PORT}`);
});