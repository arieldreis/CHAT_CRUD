import {WebSocketServer as ws} from 'ws'
import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);
const wss = new ws({server});
const PORT = 3030;

wss.on('connection', (ws) => {
    console.log("Servidor conectado");
    ws.on('message', (mensagem) => {
        console.log("Mensagem recebida: ", mensagem.toString());
        wss.clients.forEach((clients) => {
            if(clients.readyState === 1){
                clients.send(mensagem.toString());
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Servidor WebSockets HTTP rodando na porta http://localhost:${PORT}`)
});