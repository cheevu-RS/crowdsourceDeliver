function handleChooseOrder() {
    let availableOrders = document.querySelector('#chooseOrder');
    availableOrders = availableOrders.getAttribute('data-orders');
    console.log(availableOrders);
}


window.onload = () => {
    handleChooseOrder();
}
