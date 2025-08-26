// Carregar produtos do backend.json
fetch('js/backend.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Salvar dados no localStorage
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Produtos salvos no localStorage');

    // Limpar área de produtos
    $("#produtos").empty();

    // Renderizar cada produto
    data.forEach(function(produto) {
      var produtoHTML = `
        <div class="item-card">
          <div class="item">
            <div class="img-container">
              <img src="${produto.imagem}" alt="${produto.nome}" />
            </div>
            <div class="nome-rating">
              <span class="color-gray">${produto.nome}</span>
              <span class="bold" style="margin-right: 4px;">
                <i class="mdi mdi-star"></i> ${produto.rating}
              </span>
            </div>
            <div class="price bold">
              ${(produto.preco_promocional || produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

            </div>
            <a data-id="${produto.id}" href="#" class="button button-fill color-blue ver-detalhes">Ver Detalhes</a>
          </div>
        </div>
      `;
      $("#produtos").append(produtoHTML);
    });

    // Clique no botão "Ver Detalhes"
    $(document).on('click', '.ver-detalhes', function (e) {
      e.preventDefault();
      var id = $(this).data('id');
      localStorage.setItem("detalhe", id);
      app.views.main.router.navigate('/details/');
    });

    // Atualizar contador do carrinho
    atualizarCarrinho();
  })
  .catch(function(error) {
    console.error('Erro ao carregar backend.json: ' + error);
  });

// Atualizar contador de itens no carrinho
function atualizarCarrinho() {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  $('.btn-cart').attr('data-count', totalItens);
}
