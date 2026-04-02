import express from 'express';
import { db_connect as db } from './db.js';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Criar um novo elemento
app.post('/api/createAccountUser', async(req, res) => {
    try{
        const nome_user = req.body.nome_user;
        const email = req.body.email;
        const senha = req.body.senha;

        // comando para inserir os dados
        const [result] = await db.query(
            'INSERT INTO account_client(nome_user, email, senha) VALUES(?, ?, ?)',
            [nome_user, email, senha]
        );

        return res.status(201).json({ 
            status: "Sucesso!" 
        });
    } catch(error) {
        console.log("Erro: " + error);
        res.status(500).json({
            error: error.message
        });
    }
});

// Atualizar um elemento
app.put('api/updateuser', (req, res) => {
    res.send("Olá, Mundo!");
});

app.delete('api/deleteuser', (req, res) => {
    res.send("Olá, Mundo!");
})

// Pegar os recursos do servidor
app.get("/api/accountuser", async (req, res) => {
    try{
        const [datas] = await db.query(
        'SELECT * FROM account_client'
        );
        return res.status(200).json({datas});
    } catch(error) {
        console.log("Erro no banco de dados: " + error)
        res.status(500).json({
            error: "Erro ao buscar dados do banco."
        });
    }
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