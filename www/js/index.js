fetch('js/backend.json')
  .then(response => response.json())
  .then(data => {
    // Salvar os dados do backend localmente
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');

    // Esvaziar a área de produtos
    $("#produtos").empty();

    data.forEach(produto => {
      var produtoHTML = `
        <div class="item-card">
          <div class="item">
            <div class="img-container">
              <img src="${produto.imagem}" />
            </div>
            <div class="nome-rating">
              <span class="color-gray">${produto.nome}</span>
              <span class="bold" style="margin-right: 4px;">
                <i class="mdi mdi-star"></i> ${produto.rating}
              </span>
            </div>
            <div class="price bold">
              ${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <a data-id="${produto.id}" href="#" class="button button-fill color-blue ver-detalhes">Ver Detalhes</a>
          </div>
        </div>
      `;

      $("#produtos").append(produtoHTML);
    });

    // Evento de clique nos botões "Ver Detalhes"
    $(document).on('click', '.ver-detalhes', function (e) {
      e.preventDefault();
      var id = $(this).data('id');
      localStorage.setItem("detalhe", id);
      app.views.main.router.navigate('/details/');
    });

  })
  .catch(error => console.error('Erro ao fazer fetch dos dados: ' + error));
