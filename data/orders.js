// We need to save our orders after placing our orders

export const orders = loadFromStorage() || [];

function loadFromStorage(){
    JSON.parse(localStorage.getItem('orders'))
}
loadFromStorage()

export function addOrder(order){
    orders.unshift(order);
    saveToStorage()
}
// unshift shows the recent order and not push that queues from the back
function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}