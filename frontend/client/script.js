import { postOrders } from './services/api.js';
import { displayQuantityProducts } from './ui/interface.js';

const buttonOrder = document.getElementById('buttonOrder');
const buttonCopyText = document.getElementById('buttonCopy');
const buttonMessage = document.getElementById('buttonMessage');

async function copyText(text){
    await navigator.clipboard.writeText(text)
}

buttonCopyText.addEventListener('click', () => {
    const textPixKey = document.getElementById('pix').textContent
    copyText(textPixKey)
    
    buttonCopyText.innerHTML='Copiado!'
})

buttonMessage.addEventListener('click', () => {
    messageClientOrder.close();
    buttonCopyText.innerHTML='Copiar';
    window.location.reload();
})

document.addEventListener('DOMContentLoaded', displayQuantityProducts);
buttonOrder.addEventListener('click', postOrders)