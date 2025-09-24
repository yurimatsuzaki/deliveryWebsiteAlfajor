const URL_API = 'https://sturdy-waddle-jjjwppqpr4qxfjpg6-3000.app.github.dev/orders';
const API_GET_QUANTITY = 'https://sturdy-waddle-jjjwppqpr4qxfjpg6-3000.app.github.dev/quantity';
const API_REMOVE_QUANTITY = 'https://sturdy-waddle-jjjwppqpr4qxfjpg6-3000.app.github.dev/quantity/delete';

export async function postOrders() {
    try{
        const clientName = document.getElementById('nameClient').value.trim();
        const clientQuant = document.getElementById('quantClient').value.trim();
        const clientDelivery = document.getElementById('localClient').value.trim();
        const clientContact = document.getElementById('contactClient').value.trim();

        const totalQuantityProduct = document.getElementById('totalProduct').textContent;
        const totalPriceOrder = document.getElementById('totalPriceDisplay');
        const messageClientOrder = document.getElementById('messageClientOrder');

        const quantNumber = parseInt(clientQuant);

        if(clientName.length == 0 || clientQuant.length == 0 || clientDelivery.length == 0 || clientContact.length == 0){
            alert('Preencha TODOS os campos abixo!');
        } else if(quantNumber > Number(totalQuantityProduct)){
            alert(`Temos apenas ${totalQuantityProduct} alfajores ou acabaram! Pedidos sua compreensão!`);
        } else if(quantNumber <= 0 || isNaN(quantNumber)){
            alert(`Esse valor para 'quantidade' é inválido!`);
        } else {
            const response = await fetch(URL_API, {
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    "name": clientName,
                    "quantity": quantNumber,
                    "location": clientDelivery,
                    "contact": clientContact,
                })
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
            }

            removeQuantiyProduct();

            totalPriceOrder.innerHTML=`R$ ${quantNumber * 3}`
            messageClientOrder.showModal();
        }
    } catch(err){
        console.error('Erro ao tentar fazer pedido: ', err.message);
    }
}

export async function getQuantityProduct() {
    try{
        const response = await fetch(API_GET_QUANTITY);

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const responseData = await response.json();
        return responseData
    } catch(err){
        console.error('Erro ao exibir a quantidade dos alfajores: ', err.message);
    }
}

async function removeQuantiyProduct(){
    try{
        const inputQuant = Number(document.getElementById('quantClient').value);
        const response = await fetch(API_REMOVE_QUANTITY, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ "quantityproduct": parseInt(inputQuant)})
        });
        
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }
    } catch(err){
        console.error('Erro ao remover a quantidade dos alfajores de venda: ', err.message);
    }
}