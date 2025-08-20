// Recuperar o ID de detalhes do localStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if (item) {
    console.log('Produto encontrado: ', item);

    // Alimentar os campos
    $("#imagem-details").attr('src', item.imagem);
    $("#nome-details").html(item.nome);
    $("#rating-details").html(item.rating); // Corrigido de "ratting"
    $("#like-details").html(item.likes);
    $("#reviews-details").html(item.reviews + ' reviews');
    $("#descricao-details").html(item.descricao);
    $("#preco-detalhe").html(
        item.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    );

    // Preencher tabela de características
    var tabelaDetalhes = $("#tabdetalhes");

    item.detalhes.forEach(detalhe => {
        var linha = `
        <tr>
            <td>${detalhe.caracteristica}</td>
            <td>${detalhe.detalhes}</td>
        </tr>`;
        tabelaDetalhes.append(linha); // Corrigido nome da variável
    });

} else {
    console.log('Produto não encontrado');
}

// Recuperar carrinho ou iniciar vazio
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade) {
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if (itemNoCarrinho) {
        // Já tem o item no carrinho
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco;
    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco
        });
    }

    // Atualizar o localStorage do carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Corrigido

// Clique no botão "Adicionar ao Carrinho"
$(".btn-adicionar-carrinho").on("click", function () {
    adicionarAoCarrinho(item, 1); // adiciona 1 unidade do item
    alert("Produto adicionado ao carrinho!");
});


}
