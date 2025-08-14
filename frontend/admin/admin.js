API_URL = 'http://localhost:3000/orders';
API_GET_QUANTITY = 'http://localhost:3000/quantity';
API_DEFINE_QUANTITY = 'http://localhost:3000/quantity/set';
API_ADD_QUANTITY = 'http://localhost:3000/quantity/update';
API_REMOVE_QUANTITY = 'http://localhost:3000/quantity/delete';

const btnDefineQuant = document.getElementById('buttonDefine');
const btnSumQuant = document.getElementById('buttonAdd');
const btnRemoveQuant = document.getElementById('buttonDel');

async function getAllOrders() {
    const divOrders = document.getElementById('pendingOrders');
    divOrders.innerHTML='Carregando os pedidos...';
    const divOrdersDelivered = document.getElementById('ordersDelivered');
    divOrdersDelivered.innerHTML='Não há pedidos entregues...';
    
    try{
        const response = await fetch(API_URL);
        
        if(!response.ok){
            throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();
        
        divOrders.innerHTML=''
        divOrdersDelivered.innerHTML=''
        
        if(responseData.length === 0){
            divOrders.innerHTML=`<p>Não há pedidos ainda</p>`;
        }
        
        responseData.forEach(order => {
            const orderDIV = document.createElement('div');
            orderDIV.classList.add('order');
            
            const id = document.createElement('p');
            id.textContent = `Id: ${order.id}`;
            
            const name = document.createElement('h3');
            name.textContent = order.name;
            
            const quant = document.createElement('p');
            quant.textContent = `Quantidade: ${order.quantity}`;
            
            const local = document.createElement('p');
            local.textContent = `Local de Entrega: ${order.location}`;

            const contact = document.createElement('p');
            contact.textContent = `Contato: ${order.contact}`;
            
            const status = document.createElement('p');
            status.classList.add('statusOrder')
            status.textContent = `STATUS: ${order.status}`;
            
            const buttonStatus = document.createElement('button');
            buttonStatus.textContent = `Marcar como entregue`;
            buttonStatus.classList.add('buttonStatus');
            buttonStatus.setAttribute('data-order-id', order.id);
            buttonStatus.addEventListener('click', updateOrders);
            
            const buttonDelete = document.createElement('button');
            buttonDelete.textContent = 'Deletar';
            buttonDelete.classList.add('buttonDelete');
            buttonDelete.setAttribute('data-order-id', order.id);
            buttonDelete.addEventListener('click', deleteOrders);

            orderDIV.appendChild(name);
            orderDIV.appendChild(id);
            orderDIV.appendChild(quant);
            orderDIV.appendChild(local);
            orderDIV.appendChild(contact);
            orderDIV.appendChild(status);
            
            if(order.status === 'pendente'){
                orderDIV.appendChild(buttonStatus);
                divOrders.appendChild(orderDIV);
            } else {
                orderDIV.appendChild(buttonDelete)
                divOrdersDelivered.appendChild(orderDIV);
            }
        });
    } catch(err){
        console.error('Erro ao carregar os pedidos: ', err.message);
        divOrders.innerHTML = '<p style="color: red;">Não foi possível carregar os alfajores no momento. Tente novamente mais tarde.</p>';
    }
}

async function updateOrders(event){
    try{
        const orderId = event.target.dataset.orderId;
        const url = `${API_URL}/${orderId}`;

        const response = await fetch(url, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ "status": "entregue" })
        });
        
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        getAllOrders();
    } catch(err){
        console.error('Erro ao atualizar o status dos pedidos: ', err.message);
    }
}

async function deleteOrders(event) {
    try{
        const orderId = event.target.dataset.orderId;
        const url = `${API_URL}/${orderId}`;

        const response = await fetch(url, {
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        });
        
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        getAllOrders();
    } catch(err){
        console.error('Erro ao deletar os pedidos entregues: ', err.message);
    }
}

async function getQuantityProduct() {
    const displayQuantityNumber = document.getElementById('displayQuantityNumber');
    try{
        const response = await fetch(API_GET_QUANTITY);

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const responseData = await response.json();

        responseData.forEach(quant => {
            displayQuantityNumber.textContent=`${quant.quantityproduct}`;
        })
    } catch(err){
        console.error('Erro ao exibir a quantidade dos alfajores: ', err.message);
    }
}

async function updateQuantiy(){
    try{
        const inputQuant = Number(document.getElementById('quantityInput').value);
        if(parseInt(inputQuant) <= 0) {
            window.alert('Valor inválido, tente novamente!');
        } else {
            const response = await fetch(API_DEFINE_QUANTITY, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ "quantityproduct": parseInt(inputQuant)})
            });
            
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
            }
            window.alert(`A quantidade de alfajor foi definida para ${parseInt(inputQuant)}!`);
            getQuantityProduct();
        }
        
    } catch(err){
        console.error('Erro ao definir a quantidade dos alfajores: ', err.message);
    }
}

async function sumQuantiy(){
    try{
        const inputQuant = Number(document.getElementById('quantityInput').value);  
        if(parseInt(inputQuant) <= 0) {
            window.alert('Valor inválido, tente novamente!');
        } else {
            const response = await fetch(API_ADD_QUANTITY, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ "quantityproduct": parseInt(inputQuant)})
            });
            
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
            }
            window.alert(`Você adicionou mais ${parseInt(inputQuant)} alfajor(es) para venda!`);
            getQuantityProduct();
        }

    } catch(err){
        console.error('Erro ao somar a quantidade dos alfajores desejada: ', err.message);
    }
}

async function removeQuantiy(){
    try{
        const inputQuant = Number(document.getElementById('quantityInput').value);
        const numberQaunt = Number(document.getElementById('displayQuantityNumber').textContent)
        if(parseInt(inputQuant) <= 0 || parseInt(inputQuant) > parseInt(numberQaunt)) {
            window.alert('Valor inválido, tente novamente!');
        } else {
            const response = await fetch(API_REMOVE_QUANTITY, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ "quantityproduct": parseInt(inputQuant)})
            });
            
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Erro na rede: ${response.status} - ${errorData.message || response.statusText}`);
            }
            window.alert(`Você removeu ${parseInt(inputQuant)} alfajores de venda!`);
            getQuantityProduct();
        }
    } catch(err){
        console.error('Erro ao remover a quantidade dos alfajores desejada: ', err.message);
    }
}

document.addEventListener('DOMContentLoaded', getAllOrders);
document.addEventListener('DOMContentLoaded', getQuantityProduct);
btnDefineQuant.addEventListener('click', updateQuantiy);
btnSumQuant.addEventListener('click', sumQuantiy);
btnRemoveQuant.addEventListener('click', removeQuantiy);