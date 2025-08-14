require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const client = require('./db');

let nextId = 1;

app.use(cors());
app.use(express.json());

app.get('/saude', (req, res) => {
    res.status(200).send('OK');
});

app.get('/orders', async (req, res) => {
    try{
        const result = await client.query('SELECT * FROM orders ORDER BY id;');
        res.status(200).json(result.rows);
    } catch(err) {
        console.error("Erro ao exibir os pedidos: ", err.message);
        res.status(500).json();
    }
});

app.get('/quantity', async (req,res) => {
    try{
        const result = await client.query('SELECT quantityproduct FROM product;');
        res.status(200).json(result.rows);
    } catch(err) {
        console.error("Erro ao carregar as qauntidades de alfajor: ", err.message);
        res.status(500).json();
    }
});

app.post('/orders', async (req, res) => {
    try{
        if(Number(req.body.quantity) <= quantityAlfajor){
            const result = await client.query('INSERT INTO orders (id,name,quantity,location,contact,status) values ($1,$2,$3,$4,$5,$6) RETURNING *', [nextId++, req.body.name,req.body.quantity,req.body.location,req.body.contact,"pendente"]);
            quantityAlfajor = quantityAlfajor - Number(req.body.quantity);
            res.status(201).json(result.rows[0]);
        }
    } catch(err){
        console.error("Erro ao tentar realizar o pedido: ", err.message);
        res.status(500).json();
    }
})

app.put('/orders/:id', async (req,res) => {
    try{
        let id = req.params.id;
        const newStatus = req.body.status;
        const result = await client.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [newStatus, id]);
        res.status(202).json(result.rows);
    } catch(err){
        console.error("Erro ao tentar atualizar pedido: ", err.message);
        res.status(500).json();
    }
});

app.put('/quantity/set', async (req,res) => {
    try{
        const id = 1;
        const newQuantity = req.body.quantityproduct;
        const result = await client.query('UPDATE product SET quantityproduct = $1 WHERE id = $2 RETURNING *', [newQuantity, id]);
        res.status(202).json(result.rows);
    } catch(err){
        console.error("Erro ao tentar definir a quantidade de alfajor: ", err.message);
        res.status(500).json();
    }
});

app.put('/quantity/update', async (req,res) => {
    try{
        const id = 1;
        const sumQuantity = req.body.quantityproduct;
        const result = await client.query('UPDATE product SET quantityproduct = quantityproduct + $1 WHERE id = $2 RETURNING *', [sumQuantity, id]);
        res.status(202).json(result.rows);
    } catch(err){
        console.error("Erro ao tentar atualizar a quantidade: ", err.message);
        res.status(500).json();
    }
});

app.put('/quantity/delete', async (req,res) => {
    try{
        const id = 1;
        const newQuantity = req.body.quantityproduct;
        const result = await client.query('UPDATE product SET quantityproduct = CASE WHEN quantityproduct >= $1 THEN quantityproduct - $2 ELSE quantityproduct END WHERE id = $3 RETURNING *', [newQuantity, newQuantity, id]);
        res.status(202).json(result.rows);
    } catch(err){
        console.error("Erro ao tentar atualizar a quantidade: ", err.message);
        res.status(500).json();
    }
});

app.delete('/orders/:id', async (req,res) => {
    try{
        let id = req.params.id;
        const result = await client.query('DELETE FROM orders WHERE id = $1  RETURNING *', [id]);
        res.status(204).send();
    } catch(err){
        console.error("Erro ao tentar excluir pedido: ", err.message);
        res.status(500).json();
    }
});

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando com sucesso!');
});