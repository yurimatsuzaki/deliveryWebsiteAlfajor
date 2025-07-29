const express = require('express');
const cors = require('cors');
const app = express();

let quantityAlfajor = 30;
let nextId = 1;
let orders = [];

app.use(cors());
app.use(express.json());

app.get('/saude', (req, res) => {
    res.status(200).send('OK');
});

function searchId(id){
    return orders.findIndex(order => order.id === parseInt(id));
}

app.get('/orders', (req, res) => {
    res.status(200).json(orders);
});

app.post('/orders', (req, res) => {
    const newOrder = {
        "id": nextId++,
        "name": req.body.name,
        "quantity": req.body.quantity,
        "location": req.body.location,
        "contact":req.body.contact,
        "status": "pendente"
    }
    orders.push(newOrder);
    quantityAlfajor--;
    res.status(201).json({
        message: "Pedido realizado com sucesso!"
    });
})

app.put('/orders/:id', (req,res) => {
    let id = searchId(req.params.id);
    orders[id].status = req.body.status;
    res.json(orders);
});

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando com sucesso!');
});