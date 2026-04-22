import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { db_connect as db } from './db.js';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'src')));
app.use(cors());

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

        return res.redirect("/DadosColetados");

    } catch(error) {
        console.log("Erro: " + error);
        res.status(500).json({
            error: "Erro ao criar o recurso."
        });
    }
});
// verificação de conta existente
app.post('/validation', async(req, res) => {

    const email = req.body.email
    const senha = req.body.senha;

    try{
        // Buscando os dados do banco de dados usando o select com a clausula where.
        const [EmailverificacaoSQL] = await db.query("SELECT email FROM account_client WHERE email = ?",
            [email]
        );
        const [senhaVerificacaoSQL] = await db.query("SELECT senha FROM account_client WHERE email = ?",
            [email]
        );

        // Validando os comando SQL
        const usuarioEmail = EmailverificacaoSQL[0];
        const usuarioSenha = senhaVerificacaoSQL[0];

        // Condição para saber se o usuário existe.
        if(email === usuarioEmail.email && senha == usuarioSenha.senha){
            return res.redirect('/chat');
        }else if(email != usuarioEmail.email || senha != usuarioSenha.senha){
            res.status(401).send({
                mensagem: "Email ou senhas estão incorretos."
            });
        } else {
            res.status(401).send({
                mensagem: "Usuário não autorizado."
            });
        }

        console.log(`Email:  ${email}, Banco: ${usuarioEmail.email}`);
        console.log(`Senha: ${senha}, Banco: ${usuarioSenha.senha}`);

    }catch(err){
        console.log("Erro: " + err);
        res.status(500).send({
            mensagem: "Erro ao fazer a verificação de login."
        });
    }
});


// Atualizar um elemento
app.put(`/updateuser/:id`, async(req, res) => {
    const id  = req.params.id;
    const user = req.body.user;
    const email = req.body.email;
    const senha = req.body.senha;

    console.log("Body: ", req.body);

    if(!id){
        return res.status(404).send({
            mensagem: "Usuário não encontrado."
        });
    } 
    try{ 
        const [updataData] = await db.query(
            "UPDATE account_client SET nome_user = ?, email = ?, senha = ? WHERE id = ?",
            [user, email, senha, Number(id)]
        );

        return res.redirect('/DadosColetados');

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
    const senha = req.body.senha;
    if(!id){
        res.status(404).send({
            mensagem: "Usuário não encontrado."
        });
    }
    try{
        const [updataData] = await db.query(
            "DELETE FROM account_client WHERE id = ? AND senha = ?",
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
// Rota para ás paginas htmls
app.get('/DadosColetados', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'dados_salvos.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'login.html'));
});
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'cadastro.html'));
});
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'chat.html'));
});
app.get('/alterarDados', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'alterar_cadastro.html'));
});
app.get('/excluirDados', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'excluir_conta.html'));
});
app.get('/NotFound404', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'htmls', 'notFound.html'));
});

// Caso rota solicitada não seja encontrada.
app.use((req, res) => {
    console.log(`Mensagens: ${new Date().toISOString}, ${req.url}, ${req.method}`);
    return res.status(404).redirect("/NotFound404");
});

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta: http://localhost:${PORT}`);
});