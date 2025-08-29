import { getQuantityProduct, updateQuantiy, sumQuantiy, removeQuantiy } from "./services/apiAdmin";
import { displayOrders } from "./ui/interfaceAdmin.js";

const btnDefineQuant = document.getElementById('buttonDefine');
const btnSumQuant = document.getElementById('buttonAdd');
const btnRemoveQuant = document.getElementById('buttonDel');

document.addEventListener('DOMContentLoaded', displayOrders);
document.addEventListener('DOMContentLoaded', getQuantityProduct);
btnDefineQuant.addEventListener('click', updateQuantiy);
btnSumQuant.addEventListener('click', sumQuantiy);
btnRemoveQuant.addEventListener('click', removeQuantiy);