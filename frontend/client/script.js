API_POST = 'http://localhost:3000/orders';
API_GET = 'http://localhost:3000/orders';

const buttonOrder = document.getElementById('buttonOrder');
const buttonCopyText = document.getElementById('buttonCopy');
const messageClientOrder = document.getElementById('messageClientOrder');
const buttonMessage = document.getElementById('buttonMessage');

async function totalQuantity() {
    const totalQuantity = document.getElementById('totalQuantity');

    try{
        const response = await fetch(API_GET);
        
        if(!response.ok){
            throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
        }
        
        const quantity = await response.json();

        totalQuantity.innerHTML=`Total de Alfajores restantes: ${quantity.quantAlfajor}`;
    } catch(err){
        console.error('Erro ao carregar as quantidades: ', err.message)
        divOrders.innerHTML = '<p style="color: red;">Não foi possível carregar as quantidades de alfajor no momento. Tente novamente mais tarde.</p>';
    }
}

async function copyText(text){
    await navigator.clipboard.writeText(text)
}

async function postOrders() {
    try{
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
            
            buttonCopyText.addEventListener('click', () => {
                const text = document.getElementById('pix').textContent
                copyText(text)

                buttonCopyText.innerHTML='Copiado!'
            })

            messageClientOrder.showModal();
            buttonMessage.addEventListener('click', () => {
                messageClientOrder.close();
                buttonCopyText.innerHTML='Copiar';
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

document.addEventListener('DOMContentLoaded', totalQuantity);
buttonOrder.addEventListener('click', postOrders)