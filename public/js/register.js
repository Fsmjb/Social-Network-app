const password = document.getElementById('password');
const conformPassword = document.getElementById('conform_password');
const button = document.getElementById("button");
const form = document.getElementById('form');

form.addEventListener('submit', (event) =>{
    if(password.value !== conformPassword.value){
        event.preventDefault();
    }
})