import { displayOrders } from "../ui/interfaceAdmin";
API_URL = 'http://localhost:3000/orders';
API_GET_QUANTITY = 'http://localhost:3000/quantity';
API_DEFINE_QUANTITY = 'http://localhost:3000/quantity/set';
API_ADD_QUANTITY = 'http://localhost:3000/quantity/update';
API_REMOVE_QUANTITY = 'http://localhost:3000/quantity/delete';

export async function getAllOrders() {
    try{
        const response = await fetch(API_URL);
        
        if(!response.ok){
            throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch(err){
        console.error('Erro ao carregar os pedidos: ', err.message);
        divOrders.innerHTML = '<p style="color: red;">Não foi possível carregar os alfajores no momento. Tente novamente mais tarde.</p>';
    }
}

export async function updateOrders(event){
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

        displayOrders();
    } catch(err){
        console.error('Erro ao atualizar o status dos pedidos: ', err.message);
    }
}

export async function deleteOrders(event) {
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

        displayOrders();
    } catch(err){
        console.error('Erro ao deletar os pedidos entregues: ', err.message);
    }
}

export async function getQuantityProduct() {
    try{
        const displayQuantityNumber = document.getElementById('displayQuantityNumber');
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

export async function updateQuantiy(){
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

export async function sumQuantiy(){
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

export async function removeQuantiy(){
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