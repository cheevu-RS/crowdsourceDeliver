function buyItem(id, place) {
    console.log(id, place);
    let id_query_selector = '#'+id;
    // to get from userdata
    let user_location = "11";
    let userId = $('#userId').attr('data-id');
    console.log(userId);
    let itemDescription = $(id_query_selector).val();
    let shop = place;
    console.log(itemDescription);
    let data = "ordererId="+userId+"&itemDescription="+itemDescription;
        // , pickupLocation: place, dropLocation: user_location}
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    let url = "http://localhost:3000/order/createOrder?" + data
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => window.location.href="/bids")
        .catch(error => console.log('error', error));    
}
  
window.onload = () => {
    
}