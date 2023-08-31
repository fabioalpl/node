$(document).ready(function() {
  var token = sessionStorage.getItem('token');
  var tableBody = $("#product-table tbody");

  // Configurar o cabeçalho da requisição com o token
  var headers = {
    Authorization: "Bearer " + token
  };

  // Carregar a tabela de produtos através do middleware
  /*$.get("http://localhost:3000/api/v2/produtos", function(data) {
    $.each(data, function(index, item) {
      item.forEach(montaTabela);
    });
  });*/

  $.ajax({
    url: "http://localhost:3000/api/v2/produtos",
    headers: headers,
    success: function(data) {
      //$.each(data, function(index, item) {
        data.forEach(montaTabela);
        data.forEach(montaEventos);
      //});
    },
    error: function(xhr, status, error) {
      console.log("Erro ao carregar produtos:", error);
    }
  });

  function montaTabela(item, index){    
    var row = $("<tr>");
    $("<td>").text(item.id).appendTo(row);
    $("<td>").text(item.descricao).appendTo(row);
    $("<td>").text(item.valor).appendTo(row);
    $("<td>").text(item.marca).appendTo(row);
    $("<td>").html(criaBotoes(item.id)).appendTo(row);
    row.appendTo(tableBody);
  }

  function criaBotoes(id) {
    return `<input type='button' value='Remover' onclick='removeProduct(${id})' /> 
            <button type='button' value='Editar' id='btn_${id}' data-toggle='modal'>
            Editar </button>`;
  }

  function montaEventos(item, index){

    var button = document.getElementById('btn_'+item.id);
    button.addEventListener('click', function(){
      $('#idProduto').val(item.id);
      $('#exampleModal').modal('show');     
    });
  }

  var btnAlterar = document.getElementById('btnAlterar');
  var btnVoltar = document.getElementById('btnVoltar');

  btnVoltar.addEventListener('click',function(event) {    
    window.location.href = "menu.html";
  })

  btnAlterar.addEventListener('click',function(event) {
    event.preventDefault();
    var token = sessionStorage.getItem('token');

    if (token === "undefined"){
        alert("Sessão perdida, faça um novo login!");
        window.location.href = "http://localhost:3000/api/";
    }

    const url = 'http://localhost:3000/api/v2/inserirProdutos'; 

    const produtoId = $('#idProduto').val();
    const descricao = $('#descricao').val();
    const valor = $('#valor').val();
    const marca = $('#marca').val();

    const produtoAtualizado = {
      descricao: descricao,
      valor: valor,
      marca: marca
    };

    fetch(`http://localhost:3000/api/v2/produtos/${produtoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(produtoAtualizado)
    })
    .then(response => {
      if (response.ok) {
        console.log('Produto atualizado com sucesso.');
        window.location.href = "resultado.html";
      } else {
        console.error('Erro ao atualizar o produto:', response.statusText);
      }
    })
    .catch(error => {
      console.error(error);
      alert("Erro no login: " + error.message);
    });
});
});

function removeProduct(id){
  var token = sessionStorage.getItem('token');

  fetch(`http://localhost:3000/api/v2/produtos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      alert("Produto excluído com sucesso.");
      location.reload();
    } else if (response.status === 404) {
      alert("Produto não encontrado.");
    } else {
      alert("Erro ao excluir o produto.");
    }
  })
  .catch(error => {
    console.log("Erro na chamada de API:", error);
  });
}
