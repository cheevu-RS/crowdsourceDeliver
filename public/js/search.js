const searchUser = async (val) =>{
    let resp = await fetch(`/user/getUser/${val}`,{
                    method: 'GET'       
                });
    resp = await resp.json();
    console.log(resp);

    let search_items_container = document.getElementById('user-search-results');
    let appendable_string = '';
    resp.forEach(e=>{
        let name = e.name;
        let username = e.username;
        let domstring = `
            <a href='/profile/${username}'>
                <div class='user-search-item-container card'>
                    <div class='card-body'>
                        <div class='card-title'>
                            ${name}
                        </div>
                        <div class='card-text'>
                            ${username}
                        </div> 
                    </div>
                </div>
            </a>
        `;
        appendable_string+=domstring;
    })

    // console.log(appendable_string,search_items_container);
    search_items_container.innerHTML = appendable_string;

}