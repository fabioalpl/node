$(document).ready(function() {

  // Captura o elemento do link "Cadastro"
  var registerLink = document.getElementById('registerLink');
  
  // Captura o formulário "register-form"
  var btnLogin = document.getElementById('btnLogin');
  var registerForm = document.getElementById('register-form');
  var loginForm = document.getElementById('login-form');

  btnLogin.addEventListener('click', function(evt) {
    evt.preventDefault();
    var login = $('#username').val();
    var senha = $('#password').val();

    fetch('http://localhost:3000/seg/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: login,
        senha: senha
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Login ou senha incorretos");
      }
      return res.json();
    })
    .then(data => {
      sessionStorage.setItem('token', data.token);
      window.location.href = "menu.html";
    })
    .catch(error => {
      console.error(error);
      // Exibir mensagem de erro ao usuário
      alert("Erro no login: " + error.message);
    });
  });
  
  // Adiciona um ouvinte de evento de clique ao link
  registerLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }); 

  $("#register-form").submit(function(evt) {
    evt.preventDefault();

    const url = 'http://localhost:3000/seg/register'; 

    const nome = $('#name').val();
    const login = $('#usernameReg').val();
    const senha = $('#passwordReg').val();
    const email = $('#email').val();

    const requestBody = {
      nome: nome,
      login: login,
      senha: senha,
      email: email
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error(error);
      });
  });  

});
