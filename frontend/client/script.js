API_POST = 'http://localhost:3000/orders';
API_GET = 'http://localhost:3000/orders';
API_GET_QUANTITY = 'http://localhost:3000/quantity';

const buttonOrder = document.getElementById('buttonOrder');
const buttonCopyText = document.getElementById('buttonCopy');
const messageClientOrder = document.getElementById('messageClientOrder');
const buttonMessage = document.getElementById('buttonMessage');

async function getQuantityProduct() {
    const totalQuantity = document.getElementById('totalQuantity');
    try{
        const response = await fetch(API_GET_QUANTITY);

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const responseData = await response.json();

        responseData.forEach(quant => {
            totalQuantity.innerHTML=`<h3>Total de Alfajores restantes:</h3>
            <p id="total">${quant.quantityproduct}</p>`;
        });
    } catch(err){
        console.error('Erro ao exibir a quantidade dos alfajores: ', err.message);
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
        const totalQuantity = document.getElementById('total').textContent.trim();
        const totalPrice = document.getElementById('totalPriceDisplay')

        if(clientName.length == 0 || clientQuant.length == 0 || clientDelivery.length == 0 || clientContact.length == 0){
            alert('Preencha TODOS os campos abixo!');
        } else if(Number(clientQuant) > Number(totalQuantity)){
            alert(`Temos apenas ${totalQuantity} alfajores ou acabaram! Obrigado!`);
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

            totalPrice.innerHTML=`R$ ${Number(clientQuant) * 3}`

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

buttonOrder.addEventListener('click', postOrders)
document.addEventListener('DOMContentLoaded', getQuantityProduct);