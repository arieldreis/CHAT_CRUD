import express from 'express';
import { db_connect as db } from './db.js';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Criar um novo elemento
app.post('/api/create_account', async(req, res) => {
    try{
        const nome_user = req.body.nome_user;
        const email = req.body.email;
        const senha = req.body.senha;

        // comando para inserir os dados
        const [post_data] = await db.query(
            'INSERT INTO account_client(nome_user, email, senha) VALUES(?, ?, ?)',
            [nome_user, email, senha]
        );

        res.status(210).send({
            id: result.insertId
        })
    } catch(error) {
        console.log("Erro no banco de dados: " + error)
        res.status(500).json({
            error: "Erro interno no servidor."
        });
    }
});

// Atualizar um elemento
app.put('api/update_data', (req, res) => {

});

// Pegar os recursos do servidor
app.get("/api/account_data", async (req, res) => {
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