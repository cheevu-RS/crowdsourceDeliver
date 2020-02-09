// Function that calls endpoint /getOrderStatus every 2 seconds
// Returns that number * 25
// Change width of status bar with number
let getStatus = async() => {
    let order = {
        orderId :  
    }
    let progress = await fetch('localhost:3000/order/getStatus', order) *  25
    let p_bar = document.getElementsByClassName('progressBar')
    
    if(progress == 0){
        
    }else if(progress == 1){

    }else if(progress == 2){

    }else if(progress == 3){

    }else{

    }
}