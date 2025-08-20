// Inicializa o Framework7 (crie aqui para usar app.dialog)
var app = new Framework7();

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function carregarCarrinho() {
  const listaCarrinho = $('#listacarrinho'); // Use id correto do seu HTML
  const totalCarrinho = $('#total-carrinho'); // Certifique que exista no HTML
  listaCarrinho.html('');

  let total = 0;

  if (carrinho.length === 0) {
    listaCarrinho.html('<p>Seu carrinho está vazio.</p>');
    totalCarrinho.text('R$ 0,00');
    return;
  }

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    listaCarrinho.append(`
      <div class="block">
        <div class="row">
          <div class="col-40"><img src="${item.img}" style="width: 80px;" /></div>
          <div class="col-60">
            <div>${item.nome}</div>
            <div>Quantidade: ${item.quantidade}</div>
            <div>Preço unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
            <button class="button button-small color-red botao-remover" data-index="${index}">Remover</button>
          </div>
        </div>
      </div>
    `);
  });

  totalCarrinho.text(`R$ ${total.toFixed(2).replace('.', ',')}`);
}

// Delegação para remover item (fora de carregarCarrinho para não ficar repetindo)
$(document).on('click', '.botao-remover', function () {
  const idx = $(this).data('index');
  carrinho.splice(idx, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
});

// Botão finalizar compra (verifique o seletor correto no HTML, no seu caso é .add-cart)
$(document).on('click', '.add-cart', function () {
  if (carrinho.length === 0) {
    app.dialog.alert('Seu carrinho está vazio!');
    return;
  }
  app.dialog.alert('Compra finalizada com sucesso!');
  carrinho = [];
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
});

// Função para adicionar ao carrinho, atualizando variável global
function adicionarAoCarrinho(nome, preco, img) {
  let encontrado = carrinho.find(item => item.nome === nome);

  if (encontrado) {
    encontrado.quantidade++;
  } else {
    carrinho.push({ nome: nome, preco: preco, img: img, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  app.dialog.alert('Produto adicionado ao carrinho!');
  carregarCarrinho(); // Atualiza a tela imediatamente
}

// Carrega o carrinho assim que o documento estiver pronto
$(document).ready(function () {
  carregarCarrinho();
});
