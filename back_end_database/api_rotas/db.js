import mysql2 from 'mysql2/promise';

// Conectando com o banco de dados.
export const db_connect = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_dinamico"
});