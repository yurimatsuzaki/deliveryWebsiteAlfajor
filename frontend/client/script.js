API_POST = 'http://localhost:3000/orders';
const buttonOrder = document.getElementById('buttonOrder');

async function postOrders() {
    try{
        const clientName = document.getElementById('nameClient').value;
        const clientQuant = document.getElementById('quantClient').value;
        const clientDelivery = document.getElementById('localClient').value;
        const clientContact = document.getElementById('contactClient').value;

        const response = await fetch(API_POST, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "name": clientName,
                "quantity": clientQuant,
                "location": clientDelivery,
                "contact": clientContact,
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

buttonOrder.addEventListener('click', postOrders)