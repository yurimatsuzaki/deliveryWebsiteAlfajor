import { getQuantityProduct } from "../services/apiClient.js";

export async function displayQuantityProducts(){
    const totalQuantity = document.getElementById('totalQuantity');
    const responseData = await getQuantityProduct();

    responseData.forEach(quant => {
            totalQuantity.innerHTML=`<h3>Total de Alfajores restantes:</h3>
                                    <p id="totalProduct">${quant.quantityproduct}</p>`; });
}