const express = require('express');
const cors = require('cors');
const app = express();
let orders = [
    {
        "id": 0,
        "name": "Yuri",
        "quantity": 20,
        "location": "cantina",
        "contact":'2232323232',
        "status": "pendente"
    },
    {
        "id": 1,
        "name": "Yuri",
        "quantity": 20,
        "location": "cantina",
        "contact":'212344423',
        "status": "entregue"
    }
];

app.use(cors());
app.use(express.json());

function searchId(id){
    return orders.findIndex(order => order.id === parseInt(id));
}

app.get('/orders', (req, res) => {
    res.status(200).json(orders);
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