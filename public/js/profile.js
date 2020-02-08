const addFriend = async e=>{
    let username = document.getElementById('data_username').innerText;
    let friendUsername = document.getElementById('data_friend_username').innerText;
    console.log(username,friendUsername,"LOLOLOL");
    let resp = await fetch('/user/addFriend',{
        method: 'POST',
        body: JSON.stringify({username,friendUsername}),
        headers: {
            "Content-Type": "application/json"
          }
    });

    alert('friend added successfully'+JSON.stringify(resp));
}