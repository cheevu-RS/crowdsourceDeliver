let GuserId, GorderId;
async function startup() {
    let userId = $('#userId').attr('data-id');
    GuserId = userId;
    let data = "ordererId="+userId;
    // console.log(data);
    // fetch request to get orderId using last order 
    let url = "http://localhost:3000/order/getLastOrder?" + data
    // console.log(url);
    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
    let response = await fetch(url, requestOptions)
    let resp = await response.text()
    let data1 = JSON.parse('{"data":'+resp+'}');
    let orderId = data1.data[0]['_id'];
    GorderId = orderId;
    // console.log(orderId);
    
    // fetch request to get sorted bids using ordererId
    data = "orderId="+orderId;
    url = "http://localhost:3000/bid/getBids?" + data
    // console.log(url);
    response = await fetch(url, requestOptions)
    resp = await response.text()
    data1 = JSON.parse('{"data":'+resp+'}');
    console.log(data1);
    console.log(typeof(data1));
    // .length);
    
    // fetch request to get all users - to map ids to names
    url = "http://localhost:3000/user/getUsers" 
    // console.log(url);
    response = await fetch(url)
    resp = await response.text()
    data2 = JSON.parse('{"data":'+resp+'}');
    console.log(data2);
    let name;
    let generated_html ='';
    for (let key in data1.data) {
        let obj = data1.data[key];
        let userId = obj.userId;
        let cost = data1.data[key].bidPrice.$numberDecimal;
        for( let key in data2.data){
            if( userId === data2.data[key]._id){
                name = data2.data[key].name;
                break;
            }
        }
        generated_html += generate(name, cost, key)
    }
    $('#generatedHtml').html(generated_html);
}
    
function generate(name, cost, i){
    let s = ''
    let time = Math.floor(Math.random()*20) + 1;
    s+='<div class="card col-12">'
    s+='  <div class="card-header" id="heading'+i+'">'
    s+='    <h5 class="mb-0">'
    s+='      <div class="row" style="justify-content:center">'
    s+='        <button class="btn btn-link" style="width:100%" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'">'
    s+='          <collapsible> '
    s+='            <div class="row">'
    s+='              <div class="col-4">'+name+'</div>'
    s+='              <div class="col-4">Rs. '+cost+'</div>'
    s+='              <div class="col-4">'+time+' min</div>'
    s+='            </div>'
    s+='          </collapsible>'
    s+='        </button>'
    s+='      </div>'
    s+='      <div class="collapse" id="collapse'+i+'" aria-labelledby="heading'+i+'" data-parent="#accordion" style="">'
    s+='        <div class="card-body" style="display:flex;justify-content:center">'
    s+='          <button class="btn btn-link" id="orderButton'+i+'" onclick="claimBid()">Avail</button>'
    s+='        </div>'
    s+='      </div>'
    s+='    </h5>'
    s+='  </div>'
    s+='</div>'
    console.log(s);
    return s;
}
    
async function claimBid(){
// mark if the bid is claimed. do whatever in db and goto status

// check status to zero for bid
    let data = "status=0&userId="+GuserId+"&orderId="+GorderId;
    // console.log(data);
    // fetch request to get orderId using last order 
    let url = "http://localhost:3000/order/updateStatus?" + data
    // console.log(url);
    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    let response = await fetch(url, requestOptions)
    console.log(response);
    if(response.status === 200){
        let resp = await response.text()
        console.log(resp);
        window.location.href="/ordertrack"
    }

}

window.onload = () => {
    // collapsible list element 
    startup();
}