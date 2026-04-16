import express from 'express';
import { db_connect as db } from './db.js';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

        return res.status(201).json({ 
            mensagem: "Sucesso!" 
        });
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