let listaDeProdutos = document.querySelector(".listaProdutos")

function listandoOsProdutos (arrayProdutos, listaHTML) {
    listaHTML.innerHTML = ""
    arrayProdutos.forEach(criarCardProduto)
}
listandoOsProdutos(produtos, listaDeProdutos)

function criarCardProduto (produto) {
    let cardProduto = document.createElement("li")
    let imagemProduto = document.createElement("img")
    let nomeProduto = document.createElement("h3")
    let categoriaProduto = document.createElement("span")
    let precoProduto = document.createElement("p")
    let botaoComprar = document.createElement("button")
    let listaComponentes = document.createElement("ol")
    let arrayDeComponentes = produto.componentes
    let divPreco = document.createElement("div")

    arrayDeComponentes.forEach(comp => {
        let componenteProduto = document.createElement("li")
        componenteProduto.innerText = comp
        listaComponentes.appendChild(componenteProduto)
    })

    imagemProduto.src = produto.img
    nomeProduto.innerText = produto.nome
    categoriaProduto.innerText = produto.categoria
    precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`
    botaoComprar.innerText = 'Comprar'
    botaoComprar.id = produto.id

    divPreco.append(precoProduto, botaoComprar)
    cardProduto.append(imagemProduto, nomeProduto, categoriaProduto, listaComponentes, divPreco)
    listaDeProdutos.appendChild(cardProduto)
}

let inputBusca = document.querySelector(".campoBuscaPorNome")
let botaoBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")

botaoBusca.addEventListener("click", function(){
    let pesquisa = inputBusca.value
    let resultadoPesquisa = buscarProduto(pesquisa)
    if (resultadoPesquisa.length == 0){
        semResultadoDePesquisa(pesquisa)
    } else {
        listandoOsProdutos(resultadoPesquisa, listaDeProdutos)
    }
    inputBusca.value = ""
})

function buscarProduto (produtoBuscado) {
    let result = []
    for (let i in produtos){
        if(produtoBuscado.toUpperCase() == produtos[i].nome.toUpperCase() || produtoBuscado.toUpperCase() == produtos[i].secao.toUpperCase() || produtoBuscado.toUpperCase() == produtos[i].categoria.toUpperCase()){
            result.push(produtos[i])
        }
    }
    return result
}
const arraySecaoHortifruti = produtos.filter(produto => {
    return produto.secao == "Hortifruti"
})
const arraySecaoPanificadora = produtos.filter(produto => {
    return produto.secao == "Panificadora"
})
const arraySecaoLaticínio = produtos.filter(produto => {
    return produto.secao == "Laticínio"
})
let botoesCategoria = document.querySelector("#botoesContainer")
botoesCategoria.addEventListener("click", function (event){
    botaoClicado = event.target
    if(botaoClicado.id == 0){
        listandoOsProdutos(produtos, listaDeProdutos)
    } else if (botaoClicado.id == 1){
        listandoOsProdutos(arraySecaoHortifruti, listaDeProdutos)
    } else if (botaoClicado.id == 2){
        listandoOsProdutos(arraySecaoPanificadora, listaDeProdutos)
    } else if (botaoClicado.id == 3){
        listandoOsProdutos(arraySecaoLaticínio, listaDeProdutos)
    }
})

function somarValores (array) {
    let arrayDePrecos = []
    array.forEach(produto => {
        arrayDePrecos.push(produto.preco)
    })
    let somaDosPrecos = arrayDePrecos.reduce((valorAnterior, valorAtual) =>{
        return valorAnterior+valorAtual
    }, valorInicial = 0)
    return somaDosPrecos
}

function colocarSomaNoHtml (arrayProd) {
    let somaTotal = document.querySelector(".precoTotal")
    somaTotal.innerText = `R$ ${somarValores(arrayProd).toFixed(2)}`
}

let arrayCarrinho = []
listaDeProdutos.addEventListener("click", function(event){
    let ondeFoiClicado = event.target
    if (ondeFoiClicado.tagName == "BUTTON"){
        produtos.forEach(prod => {
            if (prod.id == ondeFoiClicado.id){
                arrayCarrinho.push(prod)
            }
        })
    }
    meuCarrinho.innerHTML = ""
    arrayCarrinho.forEach(criarCardDoCarrinho)
})

let meuCarrinho = document.querySelector(".carrinhoDeCompras")
function criarCardDoCarrinho (produto) {
    let produtoNoCarrinho = document.createElement("li")
    let imagemProdutoCarrinho = document.createElement("img")
    let primeiraDivCarrinho = document.createElement("div")
    let divDentroDaPrimeiraDiv = document.createElement("div")
    let nomeProdutoCarrinho = document.createElement("h3")
    let botaoRemoverCarrinho = document.createElement("button")
    let secaoProdutoCarrinho = document.createElement("span")
    let precoQuantidadeCarrinho = document.createElement("div")
    let precoProdutoCarrinho = document.createElement("p")
    let quantidadeProdutoCarrinho = document.createElement("span")

    imagemProdutoCarrinho.src = produto.img
    nomeProdutoCarrinho.innerText = produto.nome
    botaoRemoverCarrinho.innerText = "X"
    secaoProdutoCarrinho.innerText = produto.secao
    precoProdutoCarrinho.innerText = `R$ ${produto.preco.toFixed(2)}`
    quantidadeProdutoCarrinho.innerText = "x1"

    produtoNoCarrinho.className = "produtoNoCarrinho"
    divDentroDaPrimeiraDiv.className = "dentroDaDiv"
    precoQuantidadeCarrinho.className = "precoQuantidade"
    botaoRemoverCarrinho.className = "botaoRemoverCarrinho"

    divDentroDaPrimeiraDiv.append(nomeProdutoCarrinho, botaoRemoverCarrinho)
    precoQuantidadeCarrinho.append(precoProdutoCarrinho, quantidadeProdutoCarrinho)
    primeiraDivCarrinho.append(divDentroDaPrimeiraDiv, secaoProdutoCarrinho, precoQuantidadeCarrinho)
    produtoNoCarrinho.append(imagemProdutoCarrinho, primeiraDivCarrinho)

    meuCarrinho.appendChild(produtoNoCarrinho)
    colocarSomaNoHtml(arrayCarrinho)
    removerProdutoCarrinho()
}

function removerProdutoCarrinho () {
    let botoesRemoverCarrinho = document.querySelectorAll(".botaoRemoverCarrinho")
    meuCarrinho.addEventListener("click", function(event){
        let clicouAqui = event.target
        for (let i = 0; i<botoesRemoverCarrinho.length; i++){
            if (clicouAqui == botoesRemoverCarrinho[i]){
                arrayCarrinho.splice(i, 1)
                let paiBotao = botoesRemoverCarrinho[i].parentNode
                let paiDaDiv = paiBotao.parentNode
                let liBotao = paiDaDiv.parentNode
                meuCarrinho.removeChild(liBotao)
                colocarSomaNoHtml(arrayCarrinho)
            }
            verificarCarrinhoVazio(arrayCarrinho)
        }
    })
}
function verificarCarrinhoVazio (array) {
    if (array.length == 0 ){
        let carrinhoVazio = document.createElement("li")
        carrinhoVazio.className = "carrinhoVazio"
        carrinhoVazio.innerText = "Carrinho vázio"
        meuCarrinho.appendChild(carrinhoVazio)
    }
}
verificarCarrinhoVazio(arrayCarrinho)

function semResultadoDePesquisa (valorPesquisado) {
    listaDeProdutos.innerHTML = ""
    let semResultado = document.createElement("h2")
    semResultado.className = "semResultado"
    semResultado.innerText = `Não achei nenhum resultado para "${valorPesquisado}", talvez o produto não esteja presente no site, confira se escreveu direitinho nosso mecanismo de busca ainda está aprendendo :D`
    listaDeProdutos.appendChild(semResultado)
}