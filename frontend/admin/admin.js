import { getQuantityProduct } from "./services/apiAdmin";
import { updateQuantiy } from "./services/apiAdmin";
import { sumQuantiy } from "./services/apiAdmin";
import { removeQuantiy } from "./services/apiAdmin";
import { displayOrders } from "./ui/interfaceAdmin";

API_URL = 'http://localhost:3000/orders';

const btnDefineQuant = document.getElementById('buttonDefine');
const btnSumQuant = document.getElementById('buttonAdd');
const btnRemoveQuant = document.getElementById('buttonDel');

document.addEventListener('DOMContentLoaded', displayOrders);
document.addEventListener('DOMContentLoaded', getQuantityProduct);
btnDefineQuant.addEventListener('click', updateQuantiy);
btnSumQuant.addEventListener('click', sumQuantiy);
btnRemoveQuant.addEventListener('click', removeQuantiy);