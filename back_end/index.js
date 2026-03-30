import express from 'express';
import mysql2 from 'mysql2';

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(`Mensagens: ${new Date().toISOString}, ${req.url}, ${req.method}`);

    res.status(404).send({
        status: 404,
        error: "Rota não encontrada", 
        url: req.originalUrl
    });

    next();
});

// Criar um novo elemento
app.post('api/create_account', async(req, res) => {
    // Conectando com o banco de dados.
    const db_connect = mysql2.createPool({
        host: localhost,
        user: "root",
        password: "",
        database: "chat_dinamico"
    });
    try{
        const nome_user = req.body.nome_user;
        const email = req.body.email;
        const senha = req.body.senha;

        // comando para inserir os dados
        const post_data = await db_connect.query(
            'INSERT INTO account_client(nome_user, email, senha) VALUES(?, ?, ?)'
        )
    } catch(error) {
        res.status(500).json({
            error: "Erro no banco de dados."
        });
    }
});

// Atualizar um elemento
app.put('api/update_data', (req, res) => {

});

// Pegar os recursos do servidor
app.get("/api/account_data", (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta: http://localhost:${PORT}`);
});