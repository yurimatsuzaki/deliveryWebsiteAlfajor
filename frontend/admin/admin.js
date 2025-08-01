API_GET = 'http://localhost:3000/orders';
API_PUT = 'http://localhost:3000/orders';

async function getAllOrders() {
    const divOrders = document.getElementById('pendingOrders');
    divOrders.innerHTML='Carregando os pedidos...';
    const divOrdersDelivered = document.getElementById('ordersDelivered');
    divOrdersDelivered.innerHTML='Não há pedidos entregues...';
    
    try{
        const response = await fetch(API_GET);
        
        if(!response.ok){
            throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        const orders = data.orders;
        
        divOrders.innerHTML=''
        divOrdersDelivered.innerHTML=''
        
        if(orders.length === 0){
            divOrders.innerHTML=`<p>Não há pedidos ainda</p>`;
        }
        
        orders.forEach(order => {
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
                divOrdersDelivered.appendChild(orderDIV);
            }
        });
    } catch(err){
        console.error('Erro ao carregar os pedidos: ', err.message)
        divOrders.innerHTML = '<p style="color: red;">Não foi possível carregar os alfajores no momento. Tente novamente mais tarde.</p>';
    }
}

async function updateOrders(event){
    try{
        const orderId = event.target.dataset.orderId;
        const url = `${API_PUT}/${orderId}`;

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
        console.error('Erro ao carregar os pedidos entregues: ', err.message)
        divOrders.innerHTML = '<p style="color: red;">Não foi possível carregar os alfajores no momento. Tente novamente mais tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', getAllOrders);