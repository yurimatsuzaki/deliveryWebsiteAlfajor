import { updateOrders, deleteOrders, getAllOrders } from "../services/apiAdm.js";

export async function displayAllOrders() {
    const divOrders = document.getElementById('pendingOrders');
    divOrders.innerHTML='Carregando os pedidos...';
    const divOrdersDelivered = document.getElementById('ordersDelivered');
    
    const responseData = await getAllOrders();

    divOrders.innerHTML='';
    divOrdersDelivered.innerHTML='';

    if(responseData.length === 0){
        divOrders.innerHTML=`<p>Não há pedidos ainda</p>`;
        divOrdersDelivered.innerHTML='Não há pedidos entregues...';
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
}