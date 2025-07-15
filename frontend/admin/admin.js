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
        
        const orders = await response.json();
        
        divOrders.innerHTML=''
        divOrdersDelivered.innerHTML=''
        
        if(orders.length === 0){
            divOrders.innerHTML=`<p>Não há pedidos ainda</p>`;
        }
        
        orders.forEach(alfajor => {
            const order = document.createElement('div');
            order.classList.add('order');
            
            const id = document.createElement('p');
            id.textContent = `Id: ${alfajor.id}`;
            
            const name = document.createElement('h3');
            name.textContent = alfajor.name;
            
            const quant = document.createElement('p');
            quant.textContent = `Quantidade: ${alfajor.quantity}`;
            
            const local = document.createElement('p');
            local.textContent = `Local de Entrega: ${alfajor.location}`;
            
            const status = document.createElement('p');
            status.classList.add('statusOrder')
            status.textContent = `STATUS: ${alfajor.status}`;
            
            const buttonStatus = document.createElement('button');
            buttonStatus.textContent = `Marcar como entregue`;
            buttonStatus.classList.add('buttonStatus');
            buttonStatus.setAttribute('data-order-id', order.id);
            buttonStatus.addEventListener('click', updateOrders);
            
            order.appendChild(name);
            order.appendChild(id);
            order.appendChild(quant);
            order.appendChild(local);
            order.appendChild(status);
            
            if(alfajor.status === 'pendente'){
                order.appendChild(buttonStatus);
                divOrders.appendChild(order);
            } else {
                divOrdersDelivered.appendChild(order);
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

        console.log(orderId);

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