const express = require('express');
const app = express();
let orders = [
    {
        "id": 0,
        "name": "Yuri",
        "quantity": 20,
        "location": "cantina",
        "status": "pendente"
    }
];

app.use(express.json());

function searchId(id){
    return orders.findIndex(order => order.id == id);
}

app.get('/orders', (req, res) => {
    res.json(orders);
    res.status(200);
});

app.post('/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
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