const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function connectToDb() {
    try{
        await client.connect();
        console.log("Conexão com o banco bem sucedida!!");
    } catch (err){
        console.error("Erro ao conectar com o banco: ", err.message)
    }
}

connectToDb();

module.exports = client;