API_POST = 'http://localhost:3000/orders';
const buttonOrder = document.getElementById('buttonOrder');

let id = 0

async function postOrders() {
    try{
        const idIncrement = id+=1;
        const clientName = document.getElementById('nameClient').value;
        const clientQuant = document.getElementById('quantClient').value;
        const clientDelivery = document.getElementById('localClient').value;
        const clientContact = document.getElementById('contactClient').value;

        console.log(idIncrement, clientName,clientQuant,clientDelivery,clientContact)

        const response = await fetch(API_POST, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "id": idIncrement,
                "name": clientName,
                "quantity": clientQuant,
                "location": clientDelivery,
                "Contato": clientContact,
                "status": "pendente"
            })
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        document.alert('Seu pedido foi feito com sucesso!');
    } catch(err){
        console.error('Erro ao tentar fazer pedido: ', err.message);
        console.log("Deu erro");
    }
}

buttonOrder.addEventListener('click', postOrders);