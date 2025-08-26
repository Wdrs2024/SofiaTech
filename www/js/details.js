// Recuperar o ID de detalhes do localStorage 
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Buscar o produto pelo ID
var item = produtos.find(produto => produto.id === id);

if (item) {
  console.log('✅ Produto encontrado: ', item);

  // Alimentar os campos de detalhes
  $("#imagem-details").attr('src', item.imagem || "img/default.png");
  $("#nome-details").text(item.nome || "Produto sem nome");
  $("#rating-details").text(item.rating || "0");
  $("#like-details").text(item.likes || "0");
  $("#reviews-details").text((item.reviews || 0) + ' reviews');
  $("#descricao-details").text(item.descricao || "Sem descrição disponível.");
  $("#preco-detalhe").text(
    (item.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );
  $("#precopromo-detalhe").text(
    (item.preco_promocional || item.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );

  // Preencher tabela de características
  var tabelaDetalhes = $("#tabdetalhes");
  tabelaDetalhes.empty();

  if (item.detalhes && item.detalhes.length > 0) {
    item.detalhes.forEach(detalhe => {
      var linha = `
        <tr>
          <td>${detalhe.caracteristica || '-'}</td>
          <td>${detalhe.detalhes || '-'}</td>
        </tr>`;
      tabelaDetalhes.append(linha);
    });
  } else {
    tabelaDetalhes.append("<tr><td colspan='2'>Nenhum detalhe disponível.</td></tr>");
  }

} else {
  console.warn('⚠ Produto não encontrado no localStorage');
}

// Recuperar carrinho ou iniciar vazio
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade) {
  if (!item) return;

  var itemCarrinho = carrinho.find(c => c.id === item.id);

  if (itemCarrinho) {
    // Já existe → soma a quantidade
    itemCarrinho.quantidade += quantidade;
  } else {
    // Novo item
    carrinho.push({
      id: item.id,
      nome: item.nome,
      preco: item.preco_promocional || item.preco,
      img: item.imagem,
      quantidade: quantidade
    });
  }

  // Atualizar o localStorage do carrinho
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Disparar evento global para atualizar badge do carrinho
  document.dispatchEvent(new Event("cart:updated"));
}

// Evento do botão "Adicionar ao Carrinho"
$(document).on("click", ".btn-adicionar-carrinho", function () {
  if (item) {
    adicionarAoCarrinho(item, 1);

    var toastCenter = app.toast.create({
      text: item.nome + " ✅ Produto adicionado ao carrinho!",
      position: 'center',
      closeTimeout: 2000,
    });

    toastCenter.open();
  }
});
