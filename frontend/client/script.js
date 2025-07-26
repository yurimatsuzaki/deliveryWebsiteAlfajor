API_POST = 'http://localhost:3000/orders';
const buttonOrder = document.getElementById('buttonOrder');

async function postOrders() {
    try{
        const messageClientOrder = document.getElementById('messageClientOrder');
        const buttonMessage = document.getElementById('buttonMessage');
        const clientName = document.getElementById('nameClient').value.trim();
        const clientQuant = document.getElementById('quantClient').value.trim();
        const clientDelivery = document.getElementById('localClient').value.trim();
        const clientContact = document.getElementById('contactClient').value.trim();

        if(clientName.length == 0 || clientQuant.length == 0 || clientDelivery.length == 0 || clientContact.length == 0){
            alert('Preencha TODOS os campos abixo!')
        } else {
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
            
            messageClientOrder.showModal();
            buttonMessage.addEventListener('click', () => {
                messageClientOrder.close();
                window.location.reload();
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
            }
        }
    } catch(err){
        console.error('Erro ao tentar fazer pedido: ', err.message);
        console.log("Deu erro");
    }
}

buttonOrder.addEventListener('click', postOrders)