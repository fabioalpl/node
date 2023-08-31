// Importa o módulo do Express Framework
const express = require ('express');

// Inicializa um objeto de aplicação Express
const app = express ();

//processar o corpo da entidade e armazenar no req.body
app.use(express.json())

app.use("/*", (req, res, next) => {
    console.log(req.method, req.url, req.path, req.query)
    next()
});

app.use('/site', express.static('site'));

// Cria um manipulador da rota padrão
const mid = function (req, res) {   
    if(req.accepts('application/json')){
        res.json({ message: "Hello World --> <a href='/users'>Users</a> "});
    } else {
        res.send ('Hello World'); 
    }
}
app.get ('/', mid);

app.post('/', (req, res) => {
    res.send (req.body.message);
});

app.get ('/users', function (req, res) {
    res.json ('{nome: "João", Idade: 33}');
} );

app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')
});

//API REST
const produtos = [
    {id: 1, nome: 'Biscoito', marca:"Aimore",  preco: 3.5},
    {id: 2, nome: 'Cerveja', marca:"Heineken",  preco: 10.99},
    {id: 3, nome: 'Filé Mignon', marca:"Marfrig",  preco: 78.99},
    {id: 4, nome: 'Refrigerante 2L', marca:"Coca-Cola",  preco: 15.50},
]

app.get('/produtos', function (req, res) {
    res.status(200).json(produtos);
});

app.post('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

app.get('/produtos/:id', function (req, res) {
    let id = req.params.id
    let idx = produtos.findIndex (p => p.id == id)
    res.status(200).json(produtos[idx]);
});

app.post('/produtos', (req, res) => {
    let [nome, marca, preco] = req.body
    const max = Math.max(...produto);
    produtos.push({id: max+1, nome, marca, preco})
    res.status(201).json(`{ message: "Produto ${nome} criado com sucesso",
                            id: ${max+1}}`)
})

app.put('/produtos/:id', (req, res) => {
    res.send (req.body.message);
});

app.delete('/produtos/:id', (req, res) => {
    res.send (req.body.message);
});