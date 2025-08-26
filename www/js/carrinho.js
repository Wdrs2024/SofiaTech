// Recupera carrinho do localStorage
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Inicializa a página
$(document).ready(function () {
  if (carrinho.length > 0) {
    renderizarCarrinho();
  } else {
    carrinhoVazio();
  }
});

// Renderiza produtos no carrinho
function renderizarCarrinho() {
  $("#listacarrinho").empty();

  carrinho.forEach((item, index) => {
    let itemHtml = `
      <div class="item-carrinho" data-index="${index}">
        <div class="area-img">
          <img src="${item.img}" alt="Imagem do Produto">
        </div>
        <div class="area-details">
          <div class="sup">
            <span class="name-prod">${item.nome}</span>
            <a class="delete-item" href="#" data-index="${index}">
              <i class="mdi mdi-close"></i>
            </a>
          </div>
          <div class="middle">
            <span>${item.principal_caracteristica || ''}</span>
          </div>
          <div class="preco-quantidade">
            <span>${(item.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <div class="count">
              <a class="minus" href="#" data-index="${index}">-</a>
              <input class="qtd-item" type="text" value="${item.quantidade}" readonly>
              <a class="plus" href="#" data-index="${index}">+</a>
            </div>
          </div>
        </div>
      </div>
    `;
    $("#listacarrinho").append(itemHtml);
  });

  $("#totais, #pay").removeClass('display-none');
  atualizarTotais();
}

// Mostra carrinho vazio
function carrinhoVazio() {
  $("#listacarrinho").html(`
    <div class="text-align-center">
      <img width="300" src="img/empty.gif">
      <br><span>Nada por enquanto...</span>
    </div>
  `);
  $("#totais, #pay").addClass('display-none');
}

// Atualiza totais
function atualizarTotais() {
  let subtotal = 0;
  carrinho.forEach(item => subtotal += (item.preco || 0) * (item.quantidade || 1));

  let frete = carrinho.length > 0 ? 10 : 0; // Frete fixo
  let total = subtotal + frete;

  $("#subtotal-carrinho").text(subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  $("#frete-carrinho").text(frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  $("#total-carrinho").text(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}

// Salva carrinho
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Esvaziar carrinho
$("#esvaziar").on('click', function () {
  app.dialog.confirm('Tem certeza que deseja esvaziar o carrinho?', 'Esvaziar Carrinho', function () {
    carrinho = [];
    salvarCarrinho();
    carrinhoVazio();
  });
});

// Remover item
$(document).on('click', '.delete-item', function () {
  let index = $(this).data('index');
  app.dialog.confirm('Remover este item?', 'Excluir Item', function () {
    carrinho.splice(index, 1);
    salvarCarrinho();
    carrinho.length > 0 ? renderizarCarrinho() : carrinhoVazio();
  });
});

// Diminuir quantidade
$(document).on('click', '.minus', function () {
  let index = $(this).data('index');
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    carrinho.splice(index, 1);
  }
  salvarCarrinho();
  carrinho.length > 0 ? renderizarCarrinho() : carrinhoVazio();
});

// Aumentar quantidade
$(document).on('click', '.plus', function () {
  let index = $(this).data('index');
  carrinho[index].quantidade++;
  salvarCarrinho();
  renderizarCarrinho();
});

// Finalizar compra
$("#btn-finalizar").on('click', function () {
  if (carrinho.length === 0) {
    app.dialog.alert('Seu carrinho está vazio!', 'Erro');
    return;
  }

  app.dialog.confirm('Deseja finalizar a compra?', 'Finalizar Compra', function () {
    app.dialog.alert('✅ Compra finalizada com sucesso!', 'Obrigado');
    carrinho = [];
    salvarCarrinho();
    carrinhoVazio();
  });
});
