import { getQuantityProduct, updateQuantiy, sumQuantiy, removeQuantiy } from "./services/apiAdm.js";
import { displayAllOrders } from "./ui/interfaceAdm.js";

const btnDefineQuant = document.getElementById('buttonDefine');
const btnSumQuant = document.getElementById('buttonAdd');
const btnRemoveQuant = document.getElementById('buttonDel');

document.addEventListener('DOMContentLoaded', displayAllOrders);
document.addEventListener('DOMContentLoaded', getQuantityProduct);
btnDefineQuant.addEventListener('click', updateQuantiy);
btnSumQuant.addEventListener('click', sumQuantiy);
btnRemoveQuant.addEventListener('click', removeQuantiy);