$(document).ready(function() {
var btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click',function(event) {
    event.preventDefault();
    var token = sessionStorage.getItem('token');

    if (token === "undefined"){
        alert("Sessão perdida, faça um novo login!");
        window.location.href = "http://localhost:3000/api/";
    }

    const url = 'http://localhost:3000/api/v2/inserirProdutos'; 

    const descricao = $('#descricao').val();
    const valor = $('#valor').val();
    const marca = $('#marca').val();

    const requestBody = {
      descricao: descricao,
      valor: valor,
      marca: marca
    };

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao inserir produto");
      }
      return res.json();
    })
    .then(data => {
      window.location.href = "menu.html";
    })
    .catch(error => {
      console.error(error);
      // Exibir mensagem de erro ao usuário
      alert("Erro no login: " + error.message);
    });
  }); 

});
