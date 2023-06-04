// Importa o módulo do Express Framework
const express = require ('express');

// Inicializa um objeto de aplicação Express
const app = express ();

//processar o corpo da entidade e armazenar no req.body
app.use(express.json())

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

// Cria um manipulador da rota padrão
const mid = function (req, res) {   
    if(req.accepts('application/json')){
        res.json({ message: "Hello World --> <a href='/users'>Users</a> "});
    } else {
        res.send ('Hello World'); 
    }
}
app.get ('/', mid);

// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')
});

app.get('/produtos', function (req, res) {
    res.status(200).json(lista_produtos.produtos);
});

app.post('/produtos', (req, res) => {
    res.status(200).json(lista_produtos.produtos);
});

app.get('/produtos/:id', function (req, res) {
    let id = req.params.id
    let idx = lista_produtos.produtos.findIndex (p => p.id == id)
    res.status(200).json(lista_produtos.produtos[idx]);
});

app.post('/produtos', (req, res) => {
    let descricao = req.body.descricao, valor = req.body.valor, marca = req.body.marca;
    const max = Math.max(...produto);
    lista_produtos.produtos.push({id: max+1, descricao, valor, marca})
    res.status(201).json(`{ message: "Produto ${descricao} criado com sucesso",
                            id: ${max+1}}`)
})

app.put('/produtos/:id', (req, res) => {
    res.send (req.body.message);
});

app.delete('/produtos/:id', (req, res) => {
    res.send (req.body.message);
});